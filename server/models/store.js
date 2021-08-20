import mongoose from "mongoose";
const Schema = mongoose.Schema;

const storeSchema = mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  storename: { type: String },
  storeImage: { type: String },
  description: { type: String },
  category: { type: String },
  subcategory: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: Number },
  mobileno: { type: Number },
  isCreated: { type: Boolean, default: false },
});

export default mongoose.model("Store", storeSchema);
