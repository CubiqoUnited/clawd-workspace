// Product Management
// This handles product data and operations for Alex's e-commerce template

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  rating: number
  stock: number
  tags: string[]
  features: string[]
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Premium T-Shirt',
    price: 29.99,
    description: 'High-quality cotton t-shirt with premium finish',
    category: 'Clothing',
    image: 'https://via.placeholder.com/300x300/3b82f6/FFFFFF?text=T-Shirt',
    rating: 4.5,
    stock: 100,
    tags: ['clothing', 'basics', 'cotton'],
    features: ['100% Cotton', 'Machine Washable', 'Premium Fit']
  },
  {
    id: 2,
    name: 'Classic Hoodie',
    price: 59.99,
    description: 'Comfortable and warm hoodie for everyday wear',
    category: 'Clothing',
    image: 'https://via.placeholder.com/300x300/1d4ed8/FFFFFF?text=Hoodie',
    rating: 4.8,
    stock: 75,
    tags: ['clothing', 'hoodie', 'warm'],
    features: ['Fleece Lining', 'Kangaroo Pocket', 'Adjustable Hood']
  },
  {
    id: 3,
    name: 'Canvas Bag',
    price: 24.99,
    description: 'Durable canvas tote bag for everyday use',
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300/60a5fa/FFFFFF?text=Bag',
    rating: 4.3,
    stock: 150,
    tags: ['accessories', 'bag', 'canvas'],
    features: ['Durable Canvas', 'Reinforced Handles', 'Water Resistant']
  },
  {
    id: 4,
    name: 'Baseball Cap',
    price: 19.99,
    description: 'Adjustable baseball cap with embroidered logo',
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300/2563eb/FFFFFF?text=Cap',
    rating: 4.6,
    stock: 200,
    tags: ['accessories', 'hat', 'cap'],
    features: ['Adjustable Strap', 'Embroidered Logo', 'Breathable Fabric']
  },
  {
    id: 5,
    name: 'Sticker Pack',
    price: 9.99,
    description: 'Set of 10 premium vinyl stickers',
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300/93c5fd/000000?text=Stickers',
    rating: 4.7,
    stock: 500,
    tags: ['accessories', 'stickers', 'vinyl'],
    features: ['Premium Vinyl', 'Weather Resistant', 'Easy Application']
  },
  {
    id: 6,
    name: 'Phone Case',
    price: 14.99,
    description: 'Protective phone case with shock absorption',
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300/bfdbfe/000000?text=Case',
    rating: 4.4,
    stock: 300,
    tags: ['electronics', 'phone', 'case'],
    features: ['Shock Absorbent', 'Scratch Resistant', 'Wireless Charging Compatible']
  },
  {
    id: 7,
    name: 'Wireless Earbuds',
    price: 79.99,
    description: 'Premium wireless earbuds with noise cancellation',
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300/8b5cf6/FFFFFF?text=Earbuds',
    rating: 4.9,
    stock: 50,
    tags: ['electronics', 'audio', 'wireless'],
    features: ['Noise Cancellation', '24hr Battery', 'Bluetooth 5.0']
  },
  {
    id: 8,
    name: 'Water Bottle',
    price: 24.99,
    description: 'Insulated stainless steel water bottle',
    category: 'Home',
    image: 'https://via.placeholder.com/300x300/10b981/FFFFFF?text=Bottle',
    rating: 4.6,
    stock: 120,
    tags: ['home', 'bottle', 'hydration'],
    features: ['24hr Insulation', 'Leak Proof', 'BPA Free']
  }
]

// Product management class
export class ProductManager {
  private products: Product[] = sampleProducts

  // Get all products
  getAllProducts(): Product[] {
    return [...this.products]
  }

  // Get product by ID
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id)
  }

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Search products
  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase()
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  // Get featured products (top rated)
  getFeaturedProducts(limit: number = 6): Product[] {
    return [...this.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  // Get products on sale (placeholder for sale logic)
  getSaleProducts(): Product[] {
    // In production, this would check for sale prices
    return this.products.slice(0, 3) // First 3 as "sale" for demo
  }

  // Get categories
  getCategories(): string[] {
    const categories = this.products.map(product => product.category)
    return [...new Set(categories)]
  }

  // Get products with pagination
  getProductsPaginated(page: number = 1, limit: number = 12): {
    products: Product[]
    total: number
    pages: number
    currentPage: number
  } {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    
    return {
      products: this.products.slice(startIndex, endIndex),
      total: this.products.length,
      pages: Math.ceil(this.products.length / limit),
      currentPage: page
    }
  }

  // Check stock availability
  checkStock(productId: number, quantity: number): boolean {
    const product = this.getProductById(productId)
    return product ? product.stock >= quantity : false
  }

  // Update stock (for order processing)
  updateStock(productId: number, quantity: number): boolean {
    const product = this.getProductById(productId)
    if (product && product.stock >= quantity) {
      product.stock -= quantity
      return true
    }
    return false
  }
}

// Create singleton instance
let productManagerInstance: ProductManager | null = null

export function getProductManager(): ProductManager {
  if (!productManagerInstance) {
    productManagerInstance = new ProductManager()
  }
  return productManagerInstance
}

// Helper functions
export const products = {
  getAll: () => getProductManager().getAllProducts(),
  getById: (id: number) => getProductManager().getProductById(id),
  getByCategory: (category: string) => getProductManager().getProductsByCategory(category),
  search: (query: string) => getProductManager().searchProducts(query),
  getFeatured: (limit?: number) => getProductManager().getFeaturedProducts(limit),
  getSale: () => getProductManager().getSaleProducts(),
  getCategories: () => getProductManager().getCategories(),
  getPaginated: (page?: number, limit?: number) => getProductManager().getProductsPaginated(page, limit),
  checkStock: (productId: number, quantity: number) => getProductManager().checkStock(productId, quantity),
  updateStock: (productId: number, quantity: number) => getProductManager().updateStock(productId, quantity),
}

export default products