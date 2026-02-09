import { NextResponse } from 'next/server';
import { getAnalyticsStorage } from '@/lib/analytics/storage';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get analytics storage
    const analyticsStorage = getAnalyticsStorage();
    
    // Load sites
    const sitesDir = path.join(process.cwd(), 'config', 'sites');
    let sites: any[] = [];
    
    try {
      const files = await fs.readdir(sitesDir);
      sites = await Promise.all(
        files
          .filter(f => f.endsWith('.json'))
          .map(async f => {
            const content = await fs.readFile(path.join(sitesDir, f), 'utf-8');
            return JSON.parse(content);
          })
      );
    } catch (error) {
      console.log('Sites directory not found, using empty array');
    }

    // Count sites by status
    const activeSites = sites.filter(s => s.status === 'active').length;
    const deployingSites = sites.filter(s => s.status === 'deploying').length;

    // Get analytics metrics for all sites
    let totalSessions = 0;
    let totalPageviews = 0;
    let totalActiveUsers = 0;
    let totalBounceRate = 0;

    for (const site of sites.slice(0, 5)) { // Limit to first 5 sites for performance
      try {
        const metrics = await analyticsStorage.getMetrics(site.id);
        totalSessions += metrics.sessions.total;
        totalPageviews += metrics.pageviews.total;
        totalActiveUsers += metrics.realtime.activeUsers;
        totalBounceRate += metrics.sessions.bounceRate;
      } catch (error) {
        console.error(`Failed to get metrics for site ${site.id}:`, error);
      }
    }

    const avgBounceRate = sites.length > 0 ? totalBounceRate / sites.length : 0;

    // Mock product and order data (replace with actual data source)
    const stats = {
      sites: {
        total: sites.length,
        active: activeSites,
        deploying: deployingSites
      },
      analytics: {
        sessions: totalSessions,
        pageviews: totalPageviews,
        activeUsers: totalActiveUsers,
        bounceRate: Math.round(avgBounceRate * 100) / 100
      },
      products: {
        total: 0, // TODO: Get from Shopify/Printify
        inStock: 0
      },
      orders: {
        total: 0, // TODO: Get from Shopify
        pending: 0,
        fulfilled: 0,
        revenue: 0
      }
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard stats', details: error.message },
      { status: 500 }
    );
  }
}
