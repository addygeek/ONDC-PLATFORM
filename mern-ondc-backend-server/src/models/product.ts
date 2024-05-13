import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Product Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Product Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter number of Stocks"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
    details: {
      type: String,
      required: [true, "Please enter Details about products"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
