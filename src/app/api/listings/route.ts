
import { NextResponse } from 'next/server';
import connectDB from '@/libs/server';
import Listings from '@/models/listingsSchema';


export async function GET() {
  try {

    await connectDB();
  console.log("Connected to Mongo");

    const listings = await Listings.find({}).lean();
 console.log("Get listings:", listings);

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Listings error:', error);
    return NextResponse.json({ error: 'Listings unavailable' }, { status: 500 });
  }
}

// Named export for the POST method (if you have it)
export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Parse the incoming JSON request body
    const data = await request.json();

    // Create a new listing
    const newListing = await Listings.create(data);

    // Return the created listing as JSON
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}