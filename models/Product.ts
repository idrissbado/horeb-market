import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['flash', 'weekly', 'clearance'] },
  endsIn: { type: String },
  featured: { type: Boolean, default: false },
  description: { type: String, required: true },
  stock: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 