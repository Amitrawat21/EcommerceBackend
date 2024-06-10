import mongoose from "mongoose";

const CheckoutSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  checkout: {
    type: Boolean,
    default: false,
  },
});

const Checkout = mongoose.model("checkout", CheckoutSchema);

export default Checkout;
