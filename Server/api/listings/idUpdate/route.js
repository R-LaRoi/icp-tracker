import connectDB from "../../../libs/server";
import Listings from "../../../models/listingsSchema";
import { NEXTResponse } from "next/dist/server/web/spec-compliant/fetch-event";

export async function PUT(request, { params }) {
  const { id } = params;
  const { co_name, position, date_applied, contact, url, notes } =
    await request.json();
  await connectDB();
  await Listings.findByIdAndUpdate(id, {
    co_name,
    position,
    date_applied,
    contact,
    url,
    notes,
  });
  return NEXTResponse.json({ success: true });
}

async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const listing = await Listings.findOne({ _id: id });
  return NEXTResponse.json({ listing }, { status: 200 });
}
