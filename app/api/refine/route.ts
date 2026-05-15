import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { html?: string; instruction?: string }
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Use client-side refiner', fallback: true },
        { status: 200 },
      )
    }

    // TODO: implement OpenAI call when OPENAI_API_KEY is available
    void body

    return NextResponse.json(
      { error: 'OpenAI integration pending', fallback: true },
      { status: 200 },
    )
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
