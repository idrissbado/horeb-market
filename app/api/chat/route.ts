import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Chat } from '@/models/Chat';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, message } = await req.json();

    // Get or create chat session
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = await Chat.create({
        userId,
        messages: [],
      });
    }

    // Add user message to chat
    chat.messages.push({
      role: 'user',
      content: message,
    });

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chat.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content,
      })),
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add assistant message to chat
    chat.messages.push({
      role: 'assistant',
      content: assistantMessage || 'Sorry, I could not process your request.',
    });

    // Save updated chat
    await chat.save();

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }

    const chat = await Chat.findOne({ userId });
    return NextResponse.json(chat || { messages: [] });
  } catch (error) {
    console.error('Get chat error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
} 