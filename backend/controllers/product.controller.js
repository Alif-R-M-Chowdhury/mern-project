import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts =  async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error during fetching" });
  }
}

export const createProduct = async (req, res, next) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error while creating the product:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error while updataing" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted",
        data: deletedProduct,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}