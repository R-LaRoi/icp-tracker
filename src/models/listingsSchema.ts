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

  },
});

const Listings =
  mongoose.models.icp_list || mongoose.model("icp_list", listingSchema);

export default Listings;
