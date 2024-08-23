import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/libs/server';
import Listings from '@/models/listingsSchema';
import { ObjectId } from 'mongodb';


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();


  try {
    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

   const objectId = new ObjectId(params.id);
const deletedListing = await Listings.findByIdAndDelete(objectId);

    if (!deletedListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    console.log('Listing deleted successfully:', deletedListing);
    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}