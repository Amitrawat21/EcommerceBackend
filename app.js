import express from "express";
import cors from "cors";
import "./DataConnection/Connection.js";
import router from "./Route/route.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use("/images", express.static('upload/images')); // Ensure this matches the multer destination

// Route setup
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

