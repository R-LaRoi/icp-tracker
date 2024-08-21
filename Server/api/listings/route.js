import connectDB from "../../libs/server";
import Listings from "../../models/listingsSchema";

export async function POST(request) {
  const { co_name, position, date_applied, contact, url, notes } =
    await request.json();

  await connectDB();
  await Listings.create({
    co_name,
    position,
    date_applied,
    contact,
    url,
    notes,
  });
  return NEXTResponse.json({ success: true });
}

export async function GET() {
  await connectDB();
  const listings = await Listings.find();
  return NEXTResponse.json({ listings });
}

export async function DELETE(request) {
  const { id } = await request.nextUrl.searchParams("id");
  await connectDB();
  await Listings.findByIdAndDelete(id);
  return NEXTResponse.json({ message: "listing deleted" });
}
