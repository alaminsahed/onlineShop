import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/Users.js";
import products from "./data/data.js";
import User from "./Models/userModel.js";
import Product from "./Models/productModel.js";
import Order from "./Models/orderModel.js";
import connectDB from "./Config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }

};

const destroyData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();

      console.log("Data destroyed");
      process.exit();
    } catch (error) {
      console.log(`${error}`);
      process.exit(1);
    }
  };

  if(process.argv[2]=== '-d'){
      destroyData()
  }else{
      importData()
  }