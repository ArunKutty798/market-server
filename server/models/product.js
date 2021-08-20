import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productImage: { type: String },
    productName: { type: String },
    storename: { type: String },
    productname: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
