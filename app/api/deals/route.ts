import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Deal from '@/models/Deal';

export async function POST(req: Request) {
  try {
    const dealData = await req.json();
    await dbConnect();

    const deal = await Deal.create(dealData);
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const sellerId = searchParams.get('sellerId');
    const category = searchParams.get('category');

    let query = {};

    if (id) {
      query = { _id: id };
    } else if (sellerId) {
      query = { seller: sellerId };
    } else if (category) {
      query = { category, status: 'active' };
    } else {
      query = { status: 'active' };
    }

    const deals = await Deal.find(query)
      .populate('seller')
      .sort({ createdAt: -1 });

    return NextResponse.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Deal ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    const deal = await Deal.findByIdAndDelete(id);

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return NextResponse.json(
      { error: 'Failed to delete deal' },
      { status: 500 }
    );
  }
} 