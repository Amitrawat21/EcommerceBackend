import Order from "../Model/orderModel.js";

class OrderClass {
  constructor() {}

  static addOrder = async (req, res) => {
    console.log(req.body, "data arrive");
    const { email, orderList } = req.body;

    try {
      // Create a new order
      const newOrder = new Order({
        email: email,
        orderList: orderList,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      // Send the response with the saved order
      res.send({ success: true, orderData: savedOrder });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static getAllOrder = async (req, res) => {
    const { email } = req.params;
    try {
      const response = await Order.find({ email: email });
      if (response) {
        res.send({ success: true, orderData: response });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  static deleteOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await Order.findByIdAndDelete({_id :id});
      if (response) {
        res.send({ success: true, message: "Deleted successfully" });
      } else {
        res.send({ success: false, message: "Not deleted" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
 
}

export default OrderClass;
