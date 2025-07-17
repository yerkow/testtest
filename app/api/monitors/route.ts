import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: monitors, error } = await supabase
    .from('monitors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(monitors);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data: monitor, error } = await supabase
      .from('monitors')
      .insert({
        name: body.name,
        url: body.url,
        type: body.type,
        interval: body.interval,
        keyword: body.keyword,
        port: body.port,
        expected_status_code: body.expected_status_code,
        user_id: body.user_id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(monitor);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create monitor' },
      { status: 500 }
    );
  }
}