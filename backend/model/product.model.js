import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
},
 {
  timestamps: true //createdAt, updatedAt is injected to each document
});

const Product = mongoose.model("Product", productSchema); //It tells the mongoose that there is a Product collection and the schema is as follows
//mongoose will make the Product into products it will lower the the first letter and make it plural

export default Product;