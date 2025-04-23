const dbConnect = require('../lib/mongodb').default;
const Product = require('../models/Product').default;

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

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 