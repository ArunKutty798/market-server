import UserSchema from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import StoreModel from "../models/store.js";

const secret = "test";
export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const oldUser = await UserSchema.findOne({ email });

    if (oldUser)
      return res.status(404).json({ message: "User Aldready exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserSchema.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Error occured" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserSchema.findOne({ email });

    if (!oldUser) return res.status(400).json({ message: "User not exists " });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    const userStore = await StoreModel.findOne({ creator: oldUser._id });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, storeResult: userStore, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createStore = async (req, res) => {
  const {
    creator,
    storename,
    storeImage,
    description,
    category,
    address,
    city,
    state,
    country,
    pincode,
    mobileno,
    subcategory,
  } = req.body;

  try {
    const oldUser = await StoreModel.findOne({ storename });

    if (oldUser)
      return res.status(401).json({ message: "Store  already exists" });

    const result = await StoreModel.create({
      creator,
      storename,
      storeImage,
      description,
      category,
      subcategory,
      address,
      city,
      state,
      country,
      pincode,
      mobileno,
      isCreated: true,
    });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
