import mongoose from "mongoose";

const Users = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = mongoose.model("user", Users);

export default userSchema;
