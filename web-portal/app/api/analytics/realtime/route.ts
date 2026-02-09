import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsStorage } from '@/lib/analytics/storage';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const siteId = searchParams.get('siteId');

  if (!siteId) {
    return NextResponse.json(
      { error: 'siteId parameter required' },
      { status: 400 }
    );
  }

  try {
    const storage = getAnalyticsStorage();
    const realtimeData = await storage.getRealtimeData(siteId);

    return NextResponse.json(realtimeData);
  } catch (error: any) {
    console.error('Realtime analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve realtime data', details: error.message },
      { status: 500 }
    );
  }
}
