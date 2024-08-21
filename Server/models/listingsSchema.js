import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
  co_name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  date_applied: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const Listings =
  mongoose.model.Listings || mongoose.model("icp_list", listingSchema);

export default Listings;
