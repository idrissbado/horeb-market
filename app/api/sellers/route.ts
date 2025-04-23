import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Seller from '@/models/Seller';

export async function POST(req: Request) {
  try {
    const sellerData = await req.json();
    await dbConnect();

    const seller = await Seller.create(sellerData);
    return NextResponse.json(seller);
  } catch (error) {
    console.error('Error creating seller:', error);
    return NextResponse.json(
      { error: 'Failed to create seller' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const seller = await Seller.findById(id).populate('deals');
      if (!seller) {
        return NextResponse.json(
          { error: 'Seller not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(seller);
    }

    const sellers = await Seller.find().populate('deals');
    return NextResponse.json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sellers' },
      { status: 500 }
    );
  }
} 