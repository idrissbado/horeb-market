const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define schemas
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
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  description: String,
  website: String,
  isFeatured: { type: Boolean, default: false },
  category: { type: String, required: true }
}, { timestamps: true });

const testimonialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isVerifiedPurchase: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  isActive: { type: Boolean, default: true },
  preferences: {
    newsletters: { type: Boolean, default: true },
    promotions: { type: Boolean, default: true },
    newProducts: { type: Boolean, default: true }
  }
}, { timestamps: true });

// Create models
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

// Sample data
const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 120,
    type: "flash",
    endsIn: "2d 5h 30m",
    featured: true,
    description: "Premium wireless headphones with noise cancellation and long battery life",
    stock: 100
  },
  {
    name: "Smart Watch with Heart Rate Monitor",
    price: 149.99,
    originalPrice: 249.99,
    discount: 40,
    image: "/placeholder.svg?height=400&width=400&text=Watch",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 85,
    type: "flash",
    endsIn: "1d 12h 45m",
    featured: true,
    description: "Smart watch with heart rate monitoring and fitness tracking",
    stock: 75
  },
  {
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 39.99,
    discount: 38,
    image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
    category: "Clothing",
    rating: 4.5,
    reviewCount: 65,
    type: "clearance",
    featured: false,
    description: "Comfortable cotton t-shirt with premium quality",
    stock: 200
  },
  {
    name: "Non-Stick Cooking Set",
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: "/placeholder.svg?height=400&width=400&text=Cookware",
    category: "Home & Kitchen",
    rating: 4.7,
    reviewCount: 92,
    type: "clearance",
    featured: false,
    description: "Complete non-stick cooking set for your kitchen",
    stock: 50
  },
  {
    name: "Bluetooth Portable Speaker",
    price: 59.99,
    originalPrice: 99.99,
    discount: 40,
    image: "/placeholder.svg?height=400&width=400&text=Speaker",
    category: "Electronics",
    rating: 4.4,
    reviewCount: 78,
    type: "weekly",
    featured: false,
    description: "Portable Bluetooth speaker with great sound quality",
    stock: 120
  },
  {
    name: "Gaming Laptop",
    price: 1299.99,
    originalPrice: 1699.99,
    discount: 24,
    image: "/placeholder.svg?height=400&width=400&text=Laptop",
    category: "Electronics",
    rating: 4.9,
    reviewCount: 45,
    type: "flash",
    endsIn: "3d 6h 15m",
    featured: true,
    description: "High-performance gaming laptop with RTX graphics",
    stock: 30
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: "/placeholder.svg?height=400&width=400&text=Mouse",
    category: "Electronics",
    rating: 4.3,
    reviewCount: 210,
    type: "weekly",
    featured: false,
    description: "Ergonomic wireless mouse with precision tracking",
    stock: 150
  },
  {
    name: "Yoga Mat",
    price: 19.99,
    originalPrice: 34.99,
    discount: 43,
    image: "/placeholder.svg?height=400&width=400&text=Yoga",
    category: "Sports",
    rating: 4.6,
    reviewCount: 89,
    type: "clearance",
    featured: false,
    description: "Non-slip yoga mat with carrying strap",
    stock: 80
  }
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$exampleHash", // This should be hashed in production
    role: "admin",
    isVerified: true
  },
  {
    name: "Test User",
    email: "user@example.com",
    password: "$2a$10$exampleHash",
    role: "user",
    isVerified: true
  }
];

const sampleBrands = [
  {
    name: "TechPro",
    logo: "/brands/techpro.png",
    description: "Leading technology brand",
    website: "https://techpro.com",
    isFeatured: true,
    category: "Electronics"
  },
  {
    name: "FashionHub",
    logo: "/brands/fashionhub.png",
    description: "Premium fashion brand",
    website: "https://fashionhub.com",
    isFeatured: true,
    category: "Clothing"
  }
];

const sampleTestimonials = [
  {
    rating: 5,
    title: "Excellent Product",
    content: "This product exceeded my expectations. Highly recommended!",
    isVerifiedPurchase: true,
    isFeatured: true,
    status: "approved"
  },
  {
    rating: 4,
    title: "Great Value",
    content: "Good quality for the price. Would buy again.",
    isVerifiedPurchase: true,
    isFeatured: false,
    status: "approved"
  }
];

const sampleSubscribers = [
  {
    email: "subscriber1@example.com",
    name: "John Doe",
    isActive: true,
    preferences: {
      newsletters: true,
      promotions: true,
      newProducts: true
    }
  },
  {
    email: "subscriber2@example.com",
    name: "Jane Smith",
    isActive: true,
    preferences: {
      newsletters: true,
      promotions: false,
      newProducts: true
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Brand.deleteMany({}),
      Testimonial.deleteMany({}),
      Subscriber.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert new data
    const [products, users, brands] = await Promise.all([
      Product.insertMany(sampleProducts),
      User.insertMany(sampleUsers),
      Brand.insertMany(sampleBrands)
    ]);

    // Add product references to brands
    await Promise.all(brands.map(async (brand) => {
      brand.products = products.map(p => p._id);
      await brand.save();
    }));

    // Insert testimonials with references
    const testimonials = await Promise.all(sampleTestimonials.map(async (testimonial) => {
      return Testimonial.create({
        ...testimonial,
        user: users[0]._id,
        product: products[0]._id
      });
    }));

    // Insert subscribers
    const subscribers = await Subscriber.insertMany(sampleSubscribers);

    console.log('Successfully seeded database:');
    console.log(`- ${products.length} products`);
    console.log(`- ${users.length} users`);
    console.log(`- ${brands.length} brands`);
    console.log(`- ${testimonials.length} testimonials`);
    console.log(`- ${subscribers.length} subscribers`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 