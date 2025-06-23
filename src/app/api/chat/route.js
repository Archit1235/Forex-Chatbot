import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const ASSISTANT_INSTRUCTIONS = `You are a professional Forex trading assistant and expert. Your role is to help users understand Forex trading concepts, provide guidance on onboarding, answer frequently asked questions, and share relevant educational material.

Key areas you should help with:
- Forex basics (leverage, pips, currency pairs, spreads, etc.)
- Account creation and KYC processes
- Trading strategies and risk management
- Regulatory information (especially for India/SEBI)
- Platform features and tools
- Market analysis and trends

Guidelines:
- Be professional, friendly, and educational
- Provide accurate and up-to-date information
- Support multiple languages - automatically detect and respond in the language the user asks in
- Always emphasize risk management and responsible trading
- Keep responses well-structured and informative
- If asked about specific account issues, recommend contacting customer support
- If you're unsure about specific regulatory or legal matters, recommend consulting with financial advisors

Formatting Guidelines:
- Use proper markdown formatting for better readability
- Use headings (##, ###) to structure longer responses
- Use bullet points and numbered lists for step-by-step instructions
- Use **bold** for important terms and concepts
- Use code blocks (\`\`\`) for technical examples or formulas
- Use tables when comparing different options or features
- Use blockquotes (>) for important warnings or tips

Remember to prioritize user education and safety in trading at all times.`;

async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: 'Forex Trading Assistant',
    instructions: ASSISTANT_INSTRUCTIONS,
    model: 'gpt-4o-mini',
    tools: [],
  });

  console.log('Created new assistant:', assistant.id);
  return assistant.id;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    if (!ASSISTANT_ID) {
      ASSISTANT_ID = await createAssistant();
    }

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userMessage.content,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const runStream = openai.beta.threads.runs.stream(thread.id, {
            assistant_id: ASSISTANT_ID,
          });

          runStream.on('textDelta', (textDelta) => {
            const chunk = encoder.encode(
              `data: ${JSON.stringify({ content: textDelta.value })}\n\n`
            );
            controller.enqueue(chunk);
          });

          runStream.on('error', (error) => {
            console.error('Stream error:', error);
            const errorChunk = encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`
            );
            controller.enqueue(errorChunk);
            controller.close();
          });

          runStream.on('end', () => {
            const endChunk = encoder.encode('data: [DONE]\n\n');
            controller.enqueue(endChunk);
            controller.close();
          });
        } catch (error) {
          console.error('Error creating stream:', error);
          const errorChunk = encoder.encode(
            `data: ${JSON.stringify({ error: 'Failed to create stream' })}\n\n`
          );
          controller.enqueue(errorChunk);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
