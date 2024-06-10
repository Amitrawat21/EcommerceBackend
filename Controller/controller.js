import Product from "../Model/ProductModel.js";
import userSchema from "../Model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

import a from "stripe";
const stripe = a(process.env.STRIPE);
class Products {
  constructor() {}

  static imageUpload = async (req, res) => {
    res.json({
      success: true,
      image: req.file.filename,
    });
  };

  static addProduct = async (req, res) => {
    const { name, image, category, new_price, old_price } = req.body;
    if ((!name || !image, !category, !new_price, !old_price)) {
      res.status(422).json({ message: "please enter all details" });
    }

    try {
      const products = await Product.find({});
      let id;
      if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
      } else {
        id = 1;
      }

      const product = new Product({
        id: id,
        name: name,
        image: image,
        category: category,
        new_price: new_price,
        old_price: old_price,
      });

      await product.save();
      res.status(202).json({ success: true, data: req.body.name });
    } catch (error) {
      res.status(422).json(error);
    }
  };

  static removeProduct = async (req, res) => {
    try {
      const id = req.params.id;
      let deleteProduct = await Product.findOneAndDelete({ id: id });

      if (deleteProduct) {
        res.status(201).json({ success: true, name: req.body.name });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  static getAllProduct = async (req, res) => {
    try {
      let allProduct = await Product.find();

      if (allProduct) {
        res.status(202).json({ sucess: true, data: allProduct });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  static getLimitedProduct = async (req, res) => {
    try {
      let allProduct = await Product.find();
      let newCollection = allProduct.slice(1).slice(-8);
      res.json({ alldata: newCollection });
    } catch (error) {
      res.status(404).json(error);
    }
  };

  static popularismWomen = async (req, res) => {
    try {
      const resData = await Product.find({ category: "women" });
      if (resData) {
        const popular_in_women = resData.slice(0, 4);
        return res.json({ womenData: popular_in_women });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  };

  // static addToCart = async(req, res)=>{

  //   const userData  = await userSchema.findOne({_id : req.user})
  //    if(userData.cartData[req.body.itemId]>0)

  //   userData.cartData[req.body.itemId]+=1
  //   let data = await userSchema.findOneAndUpdate({_id : req.user} , {cartData : userData.cartData})
  //   console.log(data , 'this is data')

  // }

  static async addToCart(req, res) {
    try {
      // 1. Find the user data
      const userData = await userSchema.findOne({ _id: req.user });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] += 1;
      else {
        userData.cartData[req.body.itemId] = 1;
      }
      const updatedUser = await userSchema.findOneAndUpdate(
        { _id: req.user },
        userData
      );
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to add item to cart" });
      }

      // 5. Send a successful response (optional)
      res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static removetocart = async (req, res) => {
    try {
      // 1. Find the user data
      const userData = await userSchema.findOne({ _id: req.user });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;

      const updatedUser = await userSchema.findOneAndUpdate(
        { _id: req.user },
        userData
      );
      if (!updatedUser) {
        return res
          .status(500)
          .json({ message: "Failed to remove item from cart" });
      }

      // 5. Send a successful response (optional)
      res.json({
        success: true,
        message: "Item remove from cart successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static getcart = async (req, res) => {
    try {
      let userData = await userSchema.findOne({ _id: req.user });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.json({ success: true, userdata: userData });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static Stripe = async (req, res) => {
    try {
      stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.send({ success: true });
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  };
}

export default Products;
