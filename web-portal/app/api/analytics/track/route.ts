import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsStorage } from '@/lib/analytics/storage';
import type { AnalyticsEvent } from '@/lib/analytics/tracker';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { siteId, events } = body;

    if (!siteId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected { siteId, events }' },
        { status: 400 }
      );
    }

    // Validate events
    const validEvents: AnalyticsEvent[] = events.filter(event => {
      return (
        event.id &&
        event.siteId === siteId &&
        event.type &&
        event.category &&
        event.action &&
        event.timestamp
      );
    });

    if (validEvents.length === 0) {
      return NextResponse.json(
        { error: 'No valid events to track' },
        { status: 400 }
      );
    }

    // Store events
    const storage = getAnalyticsStorage();
    await storage.storeEvents(validEvents);

    return NextResponse.json({
      success: true,
      tracked: validEvents.length,
      skipped: events.length - validEvents.length
    });
  } catch (error: any) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track events', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const siteId = searchParams.get('siteId');
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '100');

  if (!siteId) {
    return NextResponse.json(
      { error: 'siteId parameter required' },
      { status: 400 }
    );
  }

  try {
    const storage = getAnalyticsStorage();
    const events = await storage.getEvents(siteId, {
      type: type || undefined,
      limit
    });

    return NextResponse.json({
      siteId,
      events,
      count: events.length
    });
  } catch (error: any) {
    console.error('Analytics retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve events', details: error.message },
      { status: 500 }
    );
  }
}
