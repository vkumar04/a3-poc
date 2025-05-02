import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), { status: 400 });
    }

    const excelFilePath = path.join(process.cwd(), 'data', 'your-file.xlsx'); // adjust folder and filename as needed

    if (!fs.existsSync(excelFilePath)) {
      return new Response(JSON.stringify({ error: 'Excel file not found' }), { status: 404 });
    }

    const buffer = fs.readFileSync(excelFilePath);

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'file', data: buffer, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
          ],
        },
      ],
    });

    return new Response(result.textStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'AI streaming error', details: error.message }), { status: 500 });
  }
}