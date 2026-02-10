// Shopping Cart Management
// This handles cart operations for Alex's e-commerce template

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export class ShoppingCart {
  private cart: CartItem[] = []
  private storageKey = 'shopeasy_cart'

  constructor() {
    this.loadCart()
  }

  // Load cart from localStorage
  private loadCart(): void {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem(this.storageKey)
    if (saved) {
      try {
        this.cart = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading cart:', error)
        this.cart = []
      }
    }
  }

  // Save cart to localStorage
  private saveCart(): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart))
  }

  // Add item to cart
  addItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.cart.push({
        ...item,
        quantity
      })
    }

    this.saveCart()
    this.dispatchCartUpdate()
  }

  // Remove item from cart
  removeItem(itemId: number): void {
    this.cart = this.cart.filter(item => item.id !== itemId)
    this.saveCart()
    this.dispatchCartUpdate()
  }

  // Update item quantity
  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cart.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId)
      } else {
        item.quantity = quantity
        this.saveCart()
        this.dispatchCartUpdate()
      }
    }
  }

  // Clear entire cart
  clearCart(): void {
    this.cart = []
    this.saveCart()
    this.dispatchCartUpdate()
  }

  // Get cart items
  getItems(): CartItem[] {
    return [...this.cart]
  }

  // Get total items count
  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Get subtotal
  getSubtotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Get shipping cost
  getShippingCost(): number {
    const subtotal = this.getSubtotal()
    return subtotal > 50 ? 0 : 5.99 // Free shipping over $50
  }

  // Get tax (simplified)
  getTax(): number {
    return this.getSubtotal() * 0.08 // 8% tax
  }

  // Get total
  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTax()
  }

  // Check if cart is empty
  isEmpty(): boolean {
    return this.cart.length === 0
  }

  // Dispatch cart update event
  private dispatchCartUpdate(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'))
    }
  }

  // Subscribe to cart updates
  subscribe(callback: () => void): () => void {
    const handler = () => callback()
    window.addEventListener('cartUpdated', handler)
    return () => window.removeEventListener('cartUpdated', handler)
  }
}

// Create singleton instance
let cartInstance: ShoppingCart | null = null

export function getCart(): ShoppingCart {
  if (!cartInstance) {
    cartInstance = new ShoppingCart()
  }
  return cartInstance
}

// Helper function for cart operations
export const cart = {
  add: (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    getCart().addItem(item, quantity)
  },
  remove: (itemId: number) => {
    getCart().removeItem(itemId)
  },
  update: (itemId: number, quantity: number) => {
    getCart().updateQuantity(itemId, quantity)
  },
  clear: () => {
    getCart().clearCart()
  },
  getItems: () => {
    return getCart().getItems()
  },
  getTotalItems: () => {
    return getCart().getTotalItems()
  },
  getSubtotal: () => {
    return getCart().getSubtotal()
  },
  getTotal: () => {
    return getCart().getTotal()
  },
  isEmpty: () => {
    return getCart().isEmpty()
  },
  subscribe: (callback: () => void) => {
    return getCart().subscribe(callback)
  },
}

export default cart