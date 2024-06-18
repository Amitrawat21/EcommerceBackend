import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    required: true,
  },

  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 4);
      return currentDate;
    },
  },

  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
