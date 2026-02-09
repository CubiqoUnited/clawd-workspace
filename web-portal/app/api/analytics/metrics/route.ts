import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsStorage } from '@/lib/analytics/storage';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const siteId = searchParams.get('siteId');
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;

  if (!siteId) {
    return NextResponse.json(
      { error: 'siteId parameter required' },
      { status: 400 }
    );
  }

  try {
    const storage = getAnalyticsStorage();
    const metrics = await storage.getMetrics(siteId, startDate, endDate);

    return NextResponse.json(metrics);
  } catch (error: any) {
    console.error('Analytics metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve metrics', details: error.message },
      { status: 500 }
    );
  }
}
