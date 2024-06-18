import Checkout from "../Model/CheckoutModel.js";
import userSchema from "../Model/UserModel.js";


class CheckOut {
  constructor() {}

  static addcheckout = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "enter the email" });
    }

    try {
      const isUser = await userSchema.findOne({ email: email });
      if (isUser) {
        // Find the existing checkout document or create a new one if it doesn't exist
        const updatedCheckout = await Checkout.findOneAndUpdate(
          { email: email },
          { checkout: true },
          { new: true, upsert: true }
        );

        return res.json({
          success: true,
          resData: updatedCheckout,
          message: "checkout successfully",
        });
      } else {
        return res.json({ success: false, message: "user not found" });
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

  static cancelOrder = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "enter the email mmm" });
    }

    try {
      const isUser = await Checkout.findOne({ email: email });
      if (isUser) {
        isUser.checkout = false;
        const response = await Checkout.findOneAndUpdate(
          { email: email },
          isUser
        );
        if (response) {
          return res.json({
            success: true,
            message: "order cancel",
            resData: response,
          });
        } else {
          return res.json({ success: fail, message: "order cancel" });
        }
      } else {
        return res.json({ success: false, message: "user not found" });
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

  static allcheckout = async (req, res) => {
    try {
      const allCheckout = await Checkout.find();
      if (allCheckout) {
        return res.json({ success: true, allcheckoutData: allCheckout });
      } else {
        return res.json({ success: false, message: "zero cart " });
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

 
}

export default CheckOut;
