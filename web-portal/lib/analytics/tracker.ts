/**
 * Comprehensive Analytics Tracking System
 * Google Analytics-level tracking with custom events, sessions, heatmaps
 */

export interface AnalyticsEvent {
  id: string;
  siteId: string;
  sessionId: string;
  userId?: string;
  type: 'pageview' | 'click' | 'scroll' | 'form' | 'custom';
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: string;
  page: {
    url: string;
    title: string;
    referrer?: string;
  };
  user: {
    ip?: string;
    userAgent: string;
    country?: string;
    city?: string;
    device: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    os: string;
  };
  performance?: {
    loadTime?: number;
    domReady?: number;
    firstPaint?: number;
  };
}

export interface Session {
  id: string;
  siteId: string;
  userId?: string;
  startedAt: string;
  lastActivityAt: string;
  endedAt?: string;
  duration?: number;
  pageviews: number;
  events: number;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPage: string;
  exitPage?: string;
  bounced: boolean;
  converted: boolean;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  page: string;
  type: 'click' | 'move' | 'scroll';
  timestamp: string;
}

export class AnalyticsTracker {
  private siteId: string;
  private sessionId: string;
  private userId?: string;
  private apiEndpoint: string;
  private buffer: AnalyticsEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private sessionTimeout = 30 * 60 * 1000; // 30 minutes
  private lastActivity: number = Date.now();

  constructor(siteId: string, options: {
    apiEndpoint?: string;
    userId?: string;
    autoFlush?: boolean;
    flushIntervalMs?: number;
  } = {}) {
    this.siteId = siteId;
    this.sessionId = this.getOrCreateSession();
    this.userId = options.userId;
    this.apiEndpoint = options.apiEndpoint || '/api/analytics/track';

    if (options.autoFlush !== false) {
      this.startAutoFlush(options.flushIntervalMs || 5000);
    }

    this.initTracking();
  }

  private getOrCreateSession(): string {
    const storageKey = `analytics_session_${this.siteId}`;
    const stored = typeof window !== 'undefined' 
      ? localStorage.getItem(storageKey)
      : null;

    if (stored) {
      const session = JSON.parse(stored);
      const age = Date.now() - session.startedAt;
      
      if (age < this.sessionTimeout) {
        return session.id;
      }
    }

    const newSessionId = this.generateId();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify({
        id: newSessionId,
        startedAt: Date.now()
      }));
    }

    return newSessionId;
  }

  private initTracking() {
    if (typeof window === 'undefined') return;

    // Track pageviews
    this.trackPageview();

    // Track clicks
    document.addEventListener('click', this.handleClick.bind(this));

    // Track scroll
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackScroll();
      }, 500);
    });

    // Track form submissions
    document.addEventListener('submit', this.handleFormSubmit.bind(this));

    // Track performance
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.trackPerformance();
        }, 0);
      });
    }

    // Track session end
    window.addEventListener('beforeunload', () => {
      this.endSession();
      this.flush();
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flush();
      } else {
        this.updateActivity();
      }
    });
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Get click position
    const x = event.clientX;
    const y = event.clientY;
    
    // Get element info
    const tagName = target.tagName.toLowerCase();
    const id = target.id;
    const className = target.className;
    const text = target.textContent?.substring(0, 100);
    
    this.track({
      type: 'click',
      category: 'engagement',
      action: 'click',
      label: `${tagName}${id ? '#' + id : ''}${className ? '.' + className.split(' ')[0] : ''}`,
      metadata: {
        x,
        y,
        element: {
          tag: tagName,
          id,
          className,
          text
        },
        href: target instanceof HTMLAnchorElement ? target.href : undefined
      }
    });

    // Store for heatmap
    this.trackHeatmapPoint({ x, y, type: 'click' });
  }

  private handleFormSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    
    this.track({
      type: 'form',
      category: 'engagement',
      action: 'form_submit',
      label: form.id || form.name || 'unnamed_form',
      metadata: {
        action: form.action,
        method: form.method,
        fields: form.elements.length
      }
    });
  }

  private trackScroll() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    this.track({
      type: 'scroll',
      category: 'engagement',
      action: 'scroll',
      value: Math.round(scrollPercentage),
      metadata: {
        scrollY: window.scrollY,
        scrollPercentage
      }
    });
  }

  private trackPerformance() {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
    const firstPaint = timing.responseStart - timing.navigationStart;

    this.track({
      type: 'custom',
      category: 'performance',
      action: 'page_load',
      value: loadTime,
      metadata: {
        loadTime,
        domReady,
        firstPaint
      }
    });
  }

  trackPageview(url?: string, title?: string) {
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const pageTitle = title || (typeof window !== 'undefined' ? document.title : '');

    this.track({
      type: 'pageview',
      category: 'navigation',
      action: 'pageview',
      label: pageUrl,
      metadata: {
        title: pageTitle
      }
    });

    this.updateActivity();
  }

  track(event: Partial<AnalyticsEvent>) {
    const fullEvent: AnalyticsEvent = {
      id: this.generateId(),
      siteId: this.siteId,
      sessionId: this.sessionId,
      userId: this.userId,
      type: event.type || 'custom',
      category: event.category || 'general',
      action: event.action || 'unknown',
      label: event.label,
      value: event.value,
      metadata: event.metadata,
      timestamp: new Date().toISOString(),
      page: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        title: typeof window !== 'undefined' ? document.title : '',
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
        ...event.page
      },
      user: this.getUserInfo(),
      performance: event.performance
    };

    this.buffer.push(fullEvent);
    this.updateActivity();

    // Auto-flush if buffer is large
    if (this.buffer.length >= 20) {
      this.flush();
    }
  }

  private getUserInfo(): AnalyticsEvent['user'] {
    if (typeof window === 'undefined') {
      return {
        userAgent: '',
        device: 'desktop',
        browser: 'unknown',
        os: 'unknown'
      };
    }

    const ua = navigator.userAgent;
    
    return {
      userAgent: ua,
      device: this.detectDevice(ua),
      browser: this.detectBrowser(ua),
      os: this.detectOS(ua)
    };
  }

  private detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
    if (/mobile/i.test(ua) && !/ipad|tablet/i.test(ua)) return 'mobile';
    if (/ipad|tablet/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  private detectBrowser(ua: string): string {
    if (/firefox/i.test(ua)) return 'Firefox';
    if (/chrome/i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua)) return 'Safari';
    if (/edge/i.test(ua)) return 'Edge';
    if (/opera/i.test(ua)) return 'Opera';
    return 'Unknown';
  }

  private detectOS(ua: string): string {
    if (/windows/i.test(ua)) return 'Windows';
    if (/macintosh|mac os/i.test(ua)) return 'macOS';
    if (/linux/i.test(ua)) return 'Linux';
    if (/android/i.test(ua)) return 'Android';
    if (/ios|iphone|ipad/i.test(ua)) return 'iOS';
    return 'Unknown';
  }

  private trackHeatmapPoint(point: Omit<HeatmapPoint, 'page' | 'timestamp'>) {
    const heatmapPoint: HeatmapPoint = {
      ...point,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString()
    };

    // Store in separate heatmap storage
    const storageKey = `heatmap_${this.siteId}`;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      const points: HeatmapPoint[] = stored ? JSON.parse(stored) : [];
      points.push(heatmapPoint);
      
      // Keep only last 1000 points
      if (points.length > 1000) {
        points.shift();
      }
      
      localStorage.setItem(storageKey, JSON.stringify(points));
    }
  }

  private updateActivity() {
    this.lastActivity = Date.now();
  }

  private endSession() {
    // Mark session as ended
    const storageKey = `analytics_session_${this.siteId}`;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }

  async flush(): Promise<boolean> {
    if (this.buffer.length === 0) return true;

    const events = [...this.buffer];
    this.buffer = [];

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteId: this.siteId,
          events
        }),
        keepalive: true
      });

      return response.ok;
    } catch (error) {
      console.error('Analytics flush failed:', error);
      // Put events back in buffer
      this.buffer.unshift(...events);
      return false;
    }
  }

  private startAutoFlush(intervalMs: number) {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, intervalMs);
  }

  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  // Public API for custom tracking
  trackEvent(category: string, action: string, label?: string, value?: number, metadata?: any) {
    this.track({
      type: 'custom',
      category,
      action,
      label,
      value,
      metadata
    });
  }

  trackConversion(type: string, value?: number, metadata?: any) {
    this.track({
      type: 'custom',
      category: 'conversion',
      action: type,
      value,
      metadata
    });
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setUserProperty(key: string, value: any) {
    // Store user properties
    const storageKey = `analytics_user_${this.siteId}`;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      const properties = stored ? JSON.parse(stored) : {};
      properties[key] = value;
      localStorage.setItem(storageKey, JSON.stringify(properties));
    }
  }
}

// Singleton instance
let trackerInstance: AnalyticsTracker | null = null;

export function initAnalytics(siteId: string, options?: any): AnalyticsTracker {
  if (trackerInstance) {
    trackerInstance.destroy();
  }
  
  trackerInstance = new AnalyticsTracker(siteId, options);
  return trackerInstance;
}

export function getAnalytics(): AnalyticsTracker | null {
  return trackerInstance;
}
