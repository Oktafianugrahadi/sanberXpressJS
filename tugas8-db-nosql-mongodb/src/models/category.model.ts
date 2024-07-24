import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
