// Product Management for E-commerce Sites
class ProductManager {
    constructor() {
        this.products = [];
        this.cart = [];
        this.init();
    }

    init() {
        // Load sample products
        this.loadProducts();
        
        // Render products
        this.renderProducts();
        
        // Setup cart functionality
        this.setupCart();
        
        // Load cart from localStorage
        this.loadCart();
    }

    loadProducts() {
        // Sample products - in production, this would come from an API/Shopify
        this.products = [
            {
                id: 1,
                name: 'Premium T-Shirt',
                price: 29.99,
                image: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Product+1',
                description: 'High-quality cotton t-shirt'
            },
            {
                id: 2,
                name: 'Classic Hoodie',
                price: 59.99,
                image: 'https://via.placeholder.com/300x300/333333/FFFFFF?text=Product+2',
                description: 'Comfortable and warm hoodie'
            },
            {
                id: 3,
                name: 'Canvas Bag',
                price: 24.99,
                image: 'https://via.placeholder.com/300x300/666666/FFFFFF?text=Product+3',
                description: 'Durable canvas tote bag'
            },
            {
                id: 4,
                name: 'Baseball Cap',
                price: 19.99,
                image: 'https://via.placeholder.com/300x300/999999/FFFFFF?text=Product+4',
                description: 'Adjustable baseball cap'
            },
            {
                id: 5,
                name: 'Sticker Pack',
                price: 9.99,
                image: 'https://via.placeholder.com/300x300/CCCCCC/000000?text=Product+5',
                description: 'Set of 10 vinyl stickers'
            },
            {
                id: 6,
                name: 'Phone Case',
                price: 14.99,
                image: 'https://via.placeholder.com/300x300/444444/FFFFFF?text=Product+6',
                description: 'Protective phone case'
            }
        ];
    }

    renderProducts() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;

        grid.innerHTML = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="productManager.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupCart() {
        const cartToggle = document.querySelector('.cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                const cart = document.querySelector('.cart');
                cart.classList.toggle('active');
            });
        }

        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.showCartNotification('Added to cart!');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.renderCart();
        }
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('.cart-total');

        if (!cartItems) return;

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartCount.textContent = totalItems;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <button onclick="productManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="productManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button onclick="productManager.removeFromCart(${item.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    saveCart() {
        localStorage.setItem('cubiqo_cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const saved = localStorage.getItem('cubiqo_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
            this.renderCart();
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // In production, this would integrate with Shopify/payment processor
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (confirm(`Proceed to checkout? Total: $${total.toFixed(2)}`)) {
            alert('Checkout functionality coming soon! This will integrate with Shopify.');
            // this.cart = [];
            // this.saveCart();
            // this.renderCart();
        }
    }

    showCartNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize product manager
let productManager;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productGrid')) {
        productManager = new ProductManager();
    }
});
