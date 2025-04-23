import { NextResponse } from 'next/server';

const CYCLOS_API_URL = process.env.CYCLOS_API_URL;
const CYCLOS_API_KEY = process.env.CYCLOS_API_KEY;

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency, description } = await req.json();

    if (!CYCLOS_API_URL || !CYCLOS_API_KEY) {
      return NextResponse.json(
        { error: 'Cyclos configuration missing' },
        { status: 500 }
      );
    }

    // First, authenticate with Cyclos to get a session token
    const authResponse = await fetch(`${CYCLOS_API_URL}/auth/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CYCLOS_API_KEY}`,
      },
      body: JSON.stringify({
        username: process.env.CYCLOS_USERNAME,
        password: process.env.CYCLOS_PASSWORD,
      }),
    });

    if (!authResponse.ok) {
      throw new Error('Failed to authenticate with Cyclos');
    }

    const { sessionToken } = await authResponse.json();

    // Initialize payment with Cyclos using the session token
    const response = await fetch(`${CYCLOS_API_URL}/payments/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({
        type: 'payment', // Payment type
        subject: description,
        amount: {
          value: amount,
          currency: currency,
        },
        from: {
          type: 'user', // Payment from user
          id: process.env.CYCLOS_USER_ID, // Your Cyclos user ID
        },
        to: {
          type: 'system', // Payment to system account
          id: process.env.CYCLOS_SYSTEM_ACCOUNT_ID, // Your system account ID
        },
        customValues: {
          orderId: orderId,
        },
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize Cyclos payment');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Cyclos payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
} 