import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  isActive: { type: Boolean, default: true },
  preferences: {
    newsletters: { type: Boolean, default: true },
    promotions: { type: Boolean, default: true },
    newProducts: { type: Boolean, default: true }
  },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: Date,
  lastEmailSent: Date,
  source: String // How they subscribed (website, checkout, etc.)
}, {
  timestamps: true
});

export default mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema); 