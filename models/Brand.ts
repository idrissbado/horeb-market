import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  description: String,
  website: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  isFeatured: { type: Boolean, default: false },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  category: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.models.Brand || mongoose.model('Brand', brandSchema); 