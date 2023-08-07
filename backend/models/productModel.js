import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    image: { type: Array, required: true, unique: false },
    name: { type: String, required: false, unique: false },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, unique: false },
    articul: { type: String, required: true, unique: false },
    size: { type: String, required: false, unique: false },
    color: { type: Array, required: true, unique: false },
    length: { type: String, required: false, unique: false },
    price: { type: Number, required: true, unique: false },
    brand: { type: String, required: true, unique: false },
    country: { type: String, required: true, unique: false },
    rating: { type: Number, required: false, unique: false },
    numReviews: { type: Number, required: false, unique: false },
    description: { type: String, required: true, unique: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
