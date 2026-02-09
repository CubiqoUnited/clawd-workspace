/**
 * Analytics Data Storage and Aggregation
 * Handles storing and querying analytics data
 */

import { promises as fs } from 'fs';
import path from 'path';
import type { AnalyticsEvent, Session } from './tracker';

export interface AnalyticsMetrics {
  siteId: string;
  period: {
    start: string;
    end: string;
  };
  sessions: {
    total: number;
    unique: number;
    avgDuration: number;
    bounceRate: number;
  };
  pageviews: {
    total: number;
    unique: number;
    avgTimeOnPage: number;
  };
  users: {
    total: number;
    new: number;
    returning: number;
  };
  devices: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  browsers: Record<string, number>;
  os: Record<string, number>;
  topPages: Array<{
    url: string;
    views: number;
    avgTime: number;
  }>;
  topReferrers: Array<{
    referrer: string;
    count: number;
  }>;
  realtime: {
    activeUsers: number;
    activeSessions: number;
  };
}

export class AnalyticsStorage {
  private dataDir: string;

  constructor(dataDir?: string) {
    this.dataDir = dataDir || path.join(process.cwd(), 'data', 'analytics');
  }

  async ensureDirectory() {
    await fs.mkdir(this.dataDir, { recursive: true });
  }

  async storeEvents(events: AnalyticsEvent[]): Promise<void> {
    await this.ensureDirectory();

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD

    for (const event of events) {
      const siteDir = path.join(this.dataDir, event.siteId, dateKey);
      await fs.mkdir(siteDir, { recursive: true });

      // Store event in JSON lines format
      const eventFile = path.join(siteDir, 'events.jsonl');
      await fs.appendFile(eventFile, JSON.stringify(event) + '\n');
    }
  }

  async getEvents(
    siteId: string,
    options: {
      startDate?: string;
      endDate?: string;
      type?: string;
      limit?: number;
    } = {}
  ): Promise<AnalyticsEvent[]> {
    const startDate = options.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = options.endDate || new Date().toISOString().split('T')[0];

    const events: AnalyticsEvent[] = [];
    const dates = this.getDateRange(startDate, endDate);

    for (const date of dates) {
      const eventFile = path.join(this.dataDir, siteId, date, 'events.jsonl');
      
      try {
        const content = await fs.readFile(eventFile, 'utf-8');
        const lines = content.trim().split('\n');
        
        for (const line of lines) {
          if (line) {
            const event = JSON.parse(line) as AnalyticsEvent;
            
            if (!options.type || event.type === options.type) {
              events.push(event);
            }
          }
        }
      } catch (error) {
        // File doesn't exist or can't be read - skip
        continue;
      }
    }

    // Sort by timestamp descending
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply limit
    if (options.limit) {
      return events.slice(0, options.limit);
    }

    return events;
  }

  async getMetrics(
    siteId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AnalyticsMetrics> {
    const events = await this.getEvents(siteId, { startDate, endDate });

    // Build sessions from events
    const sessions = this.buildSessions(events);
    const uniqueUsers = new Set(events.filter(e => e.userId).map(e => e.userId!));
    
    // Calculate metrics
    const pageviews = events.filter(e => e.type === 'pageview');
    const uniquePages = new Set(pageviews.map(e => e.page.url));

    // Device breakdown
    const devices = events.reduce((acc, e) => {
      acc[e.user.device] = (acc[e.user.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Browser breakdown
    const browsers = events.reduce((acc, e) => {
      acc[e.user.browser] = (acc[e.user.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // OS breakdown
    const os = events.reduce((acc, e) => {
      acc[e.user.os] = (acc[e.user.os] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top pages
    const pageStats = new Map<string, { views: number; totalTime: number }>();
    pageviews.forEach(pv => {
      const url = pv.page.url;
      const existing = pageStats.get(url) || { views: 0, totalTime: 0 };
      pageStats.set(url, {
        views: existing.views + 1,
        totalTime: existing.totalTime + (pv.performance?.loadTime || 0)
      });
    });

    const topPages = Array.from(pageStats.entries())
      .map(([url, stats]) => ({
        url,
        views: stats.views,
        avgTime: stats.views > 0 ? stats.totalTime / stats.views : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top referrers
    const referrerCounts = new Map<string, number>();
    events.forEach(e => {
      if (e.page.referrer) {
        referrerCounts.set(
          e.page.referrer,
          (referrerCounts.get(e.page.referrer) || 0) + 1
        );
      }
    });

    const topReferrers = Array.from(referrerCounts.entries())
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate session metrics
    const totalSessions = sessions.length;
    const avgDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / totalSessions;
    const bouncedSessions = sessions.filter(s => s.bounced).length;
    const bounceRate = totalSessions > 0 ? bouncedSessions / totalSessions : 0;

    // Real-time metrics (last 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const recentEvents = events.filter(e => new Date(e.timestamp).getTime() > fiveMinutesAgo);
    const recentSessions = new Set(recentEvents.map(e => e.sessionId));

    return {
      siteId,
      period: {
        start: startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: endDate || new Date().toISOString()
      },
      sessions: {
        total: totalSessions,
        unique: totalSessions, // Each session is unique by definition
        avgDuration: Math.round(avgDuration),
        bounceRate: Math.round(bounceRate * 100) / 100
      },
      pageviews: {
        total: pageviews.length,
        unique: uniquePages.size,
        avgTimeOnPage: Math.round(avgDuration / (pageviews.length || 1))
      },
      users: {
        total: uniqueUsers.size,
        new: uniqueUsers.size, // TODO: Track returning users
        returning: 0
      },
      devices: {
        mobile: devices.mobile || 0,
        tablet: devices.tablet || 0,
        desktop: devices.desktop || 0
      },
      browsers,
      os,
      topPages,
      topReferrers,
      realtime: {
        activeUsers: recentSessions.size,
        activeSessions: recentSessions.size
      }
    };
  }

  private buildSessions(events: AnalyticsEvent[]): Session[] {
    const sessionMap = new Map<string, Session>();

    for (const event of events) {
      let session = sessionMap.get(event.sessionId);

      if (!session) {
        session = {
          id: event.sessionId,
          siteId: event.siteId,
          userId: event.userId,
          startedAt: event.timestamp,
          lastActivityAt: event.timestamp,
          pageviews: 0,
          events: 0,
          landingPage: event.page.url,
          bounced: true,
          converted: false
        };
        sessionMap.set(event.sessionId, session);
      }

      // Update session
      session.lastActivityAt = event.timestamp;
      session.events++;
      
      if (event.type === 'pageview') {
        session.pageviews++;
        session.exitPage = event.page.url;
        
        // If more than 1 pageview, not bounced
        if (session.pageviews > 1) {
          session.bounced = false;
        }
      }

      // Check for conversions
      if (event.category === 'conversion') {
        session.converted = true;
      }

      // Update source/medium/campaign
      if (event.metadata?.utm_source) {
        session.source = event.metadata.utm_source;
      }
      if (event.metadata?.utm_medium) {
        session.medium = event.metadata.utm_medium;
      }
      if (event.metadata?.utm_campaign) {
        session.campaign = event.metadata.utm_campaign;
      }
    }

    // Calculate durations
    for (const session of sessionMap.values()) {
      const start = new Date(session.startedAt).getTime();
      const end = new Date(session.lastActivityAt).getTime();
      session.duration = end - start;
    }

    return Array.from(sessionMap.values());
  }

  private getDateRange(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    return dates;
  }

  async getRealtimeData(siteId: string): Promise<{
    activeUsers: number;
    activeSessions: number;
    recentEvents: AnalyticsEvent[];
    topPages: Array<{ url: string; users: number }>;
  }> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const events = await this.getEvents(siteId, {
      startDate: fiveMinutesAgo.split('T')[0],
      limit: 1000
    });

    const recentEvents = events.filter(e => e.timestamp >= fiveMinutesAgo);
    const activeSessions = new Set(recentEvents.map(e => e.sessionId));
    const activeUsers = new Set(recentEvents.filter(e => e.userId).map(e => e.userId!));

    // Count users per page
    const pageUsers = new Map<string, Set<string>>();
    recentEvents.forEach(e => {
      if (e.type === 'pageview') {
        if (!pageUsers.has(e.page.url)) {
          pageUsers.set(e.page.url, new Set());
        }
        pageUsers.get(e.page.url)!.add(e.sessionId);
      }
    });

    const topPages = Array.from(pageUsers.entries())
      .map(([url, users]) => ({ url, users: users.size }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 5);

    return {
      activeUsers: activeUsers.size,
      activeSessions: activeSessions.size,
      recentEvents: recentEvents.slice(0, 50),
      topPages
    };
  }

  async getHeatmapData(
    siteId: string,
    page: string,
    startDate?: string,
    endDate?: string
  ): Promise<Array<{ x: number; y: number; weight: number }>> {
    const events = await this.getEvents(siteId, { startDate, endDate, type: 'click' });
    const pageEvents = events.filter(e => e.page.url.includes(page));

    // Aggregate click positions
    const heatmap = new Map<string, number>();
    
    pageEvents.forEach(e => {
      if (e.metadata?.x !== undefined && e.metadata?.y !== undefined) {
        const key = `${Math.floor(e.metadata.x / 10)},${Math.floor(e.metadata.y / 10)}`;
        heatmap.set(key, (heatmap.get(key) || 0) + 1);
      }
    });

    return Array.from(heatmap.entries()).map(([key, weight]) => {
      const [x, y] = key.split(',').map(Number);
      return { x: x * 10, y: y * 10, weight };
    });
  }
}

// Singleton instance
let storageInstance: AnalyticsStorage | null = null;

export function getAnalyticsStorage(dataDir?: string): AnalyticsStorage {
  if (!storageInstance) {
    storageInstance = new AnalyticsStorage(dataDir);
  }
  return storageInstance;
}
