import express from "express";
import multer from "multer";
import path from "path";
import Products from "../Controller/controller.js";
import User from "../Controller/userController.js";
import Product from "../Model/ProductModel.js";
import fetchUser from "../Middleware/Auth.js";
import CheckOut from "../Controller/checkoutcontroller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images"); // Ensure this path matches express.static path
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// product route
router.post("/upload", upload.single("product"), Products.imageUpload);
router.post("/addProducts", Products.addProduct);
router.delete("/removeProduct/:id", Products.removeProduct);
router.get("/getAllProduct", Products.getAllProduct);
router.get("/getNewCollection", Products.getLimitedProduct);
router.get("/popularinwomen", Products.popularismWomen);
router.post("/addtocart", fetchUser, Products.addToCart);
router.post("/removefromcart", fetchUser, Products.removetocart);
router.get("/getcart", fetchUser, Products.getcart);
router.post("/payment", Products.Stripe);

// user route

router.post("/register", User.Register);
router.post("/login", User.login);

// checkout route

router.post("/checkout", fetchUser, CheckOut.addcheckout);
router.put("/ordercancel", fetchUser, CheckOut.cancelOrder);
router.get("/allcart", fetchUser, CheckOut.allcheckout);

export default router;
