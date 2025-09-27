import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { model, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }
    if (!model) {
      return NextResponse.json({ error: 'No model provided' }, { status: 400 });
    }

    // Gọi OpenRouter AI
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: message }],
        stream: false,
      }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Failed to parse JSON:', text);
      return NextResponse.json({ reply: 'Invalid response from API', raw: text }, { status: 500 });
    }

    if (data.error) {
      return NextResponse.json({ reply: data.error.message }, { status: res.status });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: 'Failed to get response' }, { status: 500 });
  }
}
