import ProductModel from "../models/product.js";

export const addProduct = async (req, res) => {
  const { productImage, storename, productName, description, price } = req.body;
  try {
    const result = await ProductModel.create({
      productImage,
      storename,
      productName,
      description,
      price,
    });

    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productImage, storename, productName, description, price } = req.body;

  try {
    const updateResult = {
      productImage,
      storename,
      productName,
      description,
      price,
    };

    const newResult = await ProductModel.findByIdAndUpdate(id, updateResult, {
      new: true,
    });

    res.status(201).json({ result: newResult });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await ProductModel.find({}).sort({ createdAt: -1 });
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProducts = async (req, res) => {
  const { storename } = req.params;
  try {
    const result = await ProductModel.find({ storename });
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};

export const productDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ProductModel.findById(id);
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};
