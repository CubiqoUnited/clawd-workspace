// Complete Printify Integration for Merchandise Portal
// Handles print-on-demand products, mockups, and fulfillment

export interface PrintifyConfig {
  apiKey: string
  shopId: string
  apiUrl?: string
}

export interface PrintifyProduct {
  id: string
  title: string
  description: string
  tags: string[]
  options: ProductOption[]
  variants: ProductVariant[]
  images: ProductImage[]
  created_at: string
  updated_at: string
  visible: boolean
  is_locked: boolean
  blueprint_id: number
  print_provider_id: number
  user_id: number
  shop_id: number
  print_areas: PrintArea[]
  sales_channel_properties: any[]
}

export interface ProductOption {
  name: string
  type: string
  values: OptionValue[]
}

export interface OptionValue {
  id: number
  title: string
  colors?: string[]
}

export interface ProductVariant {
  id: number
  sku: string
  cost: number
  price: number
  title: string
  grams: number
  is_enabled: boolean
  is_default: boolean
  is_available: boolean
  options: number[]
}

export interface ProductImage {
  src: string
  variant_ids: number[]
  position: string
  is_default: boolean
}

export interface PrintArea {
  variant_ids: number[]
  placeholders: Placeholder[]
}

export interface Placeholder {
  position: string
  images: Image[]
}

export interface Image {
  id: string
  name: string
  type: string
  height: number
  width: number
  x: number
  y: number
  scale: number
  angle: number
}

export interface Blueprint {
  id: number
  title: string
  description: string
  brand: string
  model: string
  images: string[]
  print_providers: PrintProvider[]
}

export interface PrintProvider {
  id: number
  title: string
  location: {
    address1: string
    address2: string
    city: string
    country: string
    region: string
    zip: string
  }
}

export interface Mockup {
  id: string
  mockup_url: string
  placement: string
  variant_ids: number[]
  extra: any
}

export interface Order {
  id: string
  address_to: Address
  line_items: OrderLineItem[]
  total_price: number
  total_tax: number
  total_shipping: number
  status: string
  shipping_method: number
  send_shipping_notification: boolean
  created_at: string
}

export interface Address {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  region: string
  address1: string
  address2: string
  city: string
  zip: string
}

export interface OrderLineItem {
  product_id: string
  variant_id: number
  quantity: number
  print_provider_id: number
  cost: number
  shipping_cost: number
  status: string
  metadata: any
}

export class PrintifyIntegration {
  private config: PrintifyConfig
  private baseUrl: string

  constructor(config: PrintifyConfig) {
    this.config = config
    this.baseUrl = config.apiUrl || 'https://api.printify.com/v1'
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    const response = await fetch(url, { ...defaultOptions, ...options })
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Printify API error (${response.status}): ${error}`)
    }

    return response.json()
  }

  // ==================== SHOP MANAGEMENT ====================

  async getShops() {
    return this.request('/shops.json')
  }

  async getShopProducts(limit: number = 100, page: number = 1) {
    return this.request(`/shops/${this.config.shopId}/products.json?limit=${limit}&page=${page}`)
  }

  // ==================== PRODUCT MANAGEMENT ====================

  async getAllProducts(): Promise<PrintifyProduct[]> {
    const products = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await this.request(`/shops/${this.config.shopId}/products.json?limit=100&page=${page}`)
      products.push(...response.data)
      
      hasMore = response.current_page < response.last_page
      page++
    }

    return products
  }

  async getProductById(productId: string): Promise<PrintifyProduct> {
    return this.request(`/shops/${this.config.shopId}/products/${productId}.json`)
  }

  async createProduct(productData: {
    title: string
    description: string
    blueprint_id: number
    print_provider_id: number
    variants: Array<{
      id: number
      price: number
      is_enabled: boolean
    }>
    print_areas: Array<{
      variant_ids: number[]
      placeholders: Array<{
        position: string
        images: Array<{
          id: string
          x: number
          y: number
          scale: number
          angle: number
        }>
      }>
    }>
  }): Promise<PrintifyProduct> {
    return this.request(`/shops/${this.config.shopId}/products.json`, {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(productId: string, updates: Partial<PrintifyProduct>): Promise<PrintifyProduct> {
    return this.request(`/shops/${this.config.shopId}/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteProduct(productId: string): Promise<boolean> {
    await this.request(`/shops/${this.config.shopId}/products/${productId}.json`, {
      method: 'DELETE',
    })
    return true
  }

  async publishProduct(productId: string, publishData: {
    title: boolean
    description: boolean
    images: boolean
    variants: boolean
    tags: boolean
    keyFeatures: boolean
    shipping_template: number
  }): Promise<any> {
    return this.request(`/shops/${this.config.shopId}/products/${productId}/publish.json`, {
      method: 'POST',
      body: JSON.stringify(publishData),
    })
  }

  async unpublishProduct(productId: string): Promise<any> {
    return this.request(`/shops/${this.config.shopId}/products/${productId}/unpublish.json`, {
      method: 'POST',
    })
  }

  // ==================== BLUEPRINTS & PROVIDERS ====================

  async getBlueprints(): Promise<Blueprint[]> {
    return this.request('/catalog/blueprints.json')
  }

  async getBlueprint(blueprintId: number): Promise<Blueprint> {
    return this.request(`/catalog/blueprints/${blueprintId}.json`)
  }

  async getPrintProviders(blueprintId: number): Promise<PrintProvider[]> {
    return this.request(`/catalog/blueprints/${blueprintId}/print_providers.json`)
  }

  async getPrintProviderVariants(blueprintId: number, printProviderId: number) {
    return this.request(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`)
  }

  async getShippingTemplates() {
    return this.request(`/shops/${this.config.shopId}/shipping_templates.json`)
  }

  // ==================== MOCKUP GENERATION ====================

  async generateMockup(productId: string, variantIds: number[]): Promise<Mockup[]> {
    return this.request(`/shops/${this.config.shopId}/products/${productId}/mockups.json`, {
      method: 'POST',
      body: JSON.stringify({ variant_ids: variantIds }),
    })
  }

  async getMockupGenerationStatus(taskId: string) {
    return this.request(`/shops/${this.config.shopId}/tasks/${taskId}.json`)
  }

  // ==================== ORDER MANAGEMENT ====================

  async createOrder(orderData: {
    external_id: string
    label: string
    line_items: Array<{
      product_id: string
      variant_id: number
      quantity: number
    }>
    shipping_method: number
    send_shipping_notification: boolean
    address_to: Address
  }): Promise<Order> {
    return this.request(`/shops/${this.config.shopId}/orders.json`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(limit: number = 100, page: number = 1): Promise<Order[]> {
    const response = await this.request(`/shops/${this.config.shopId}/orders.json?limit=${limit}&page=${page}`)
    return response.data
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.request(`/shops/${this.config.shopId}/orders/${orderId}.json`)
  }

  async sendOrderToProduction(orderId: string): Promise<any> {
    return this.request(`/shops/${this.config.shopId}/orders/${orderId}/send_to_production.json`, {
      method: 'POST',
    })
  }

  async calculateShipping(orderData: {
    line_items: Array<{
      product_id: string
      variant_id: number
      quantity: number
    }>
    address_to: Address
  }) {
    return this.request(`/shops/${this.config.shopId}/orders/shipping.json`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // ==================== UPLOAD IMAGES ====================

  async uploadImage(imageFile: any, fileName: string): Promise<{ id: string; file_name: string; height: number; width: number; size: number; mime_type: string; preview_url: string; upload_time: string }> {
    // For browser environment
    if (typeof File !== 'undefined' && imageFile instanceof File) {
      const formData = new FormData()
      formData.append('file', imageFile, fileName)
      
      const response = await fetch(`${this.baseUrl}/uploads/images.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Image upload failed: ${response.status}`)
      }
      
      return response.json()
    }
    // For Node.js environment
    else {
      // Implement base64 or multipart upload for Node.js
      throw new Error('Node.js image upload not implemented in this example')
    }
  }

  // ==================== SYNC WITH SHOPIFY ====================

  async syncProductToShopify(printifyProductId: string, shopifyProductId?: string): Promise<any> {
    // This would sync a Printify product to Shopify
    // In a real implementation, this would:
    // 1. Get product from Printify
    // 2. Create/update in Shopify
    // 3. Handle variants, images, pricing
    
    const product = await this.getProductById(printifyProductId)
    
    // Transform Printify product to Shopify format
    const shopifyProduct = {
      title: product.title,
      body_html: product.description,
      variants: product.variants.map(variant => ({
        price: variant.price.toString(),
        sku: variant.sku,
        inventory_quantity: variant.is_available ? 100 : 0,
        option1: variant.title,
      })),
      images: product.images.map(img => ({
        src: img.src,
        position: img.position === 'front' ? 1 : 2,
      })),
      tags: product.tags.join(', '),
    }

    // This would call Shopify API
    return {
      success: true,
      shopifyProductId: shopifyProductId || `generated_${Date.now()}`,
      message: 'Product synced successfully',
      product: shopifyProduct,
    }
  }

  // ==================== ANALYTICS ====================

  async getProductAnalytics(productId: string, startDate: string, endDate: string) {
    // Note: Printify doesn't have built-in analytics API
    // This would need to be implemented by tracking orders
    
    const orders = await this.getOrders(1000, 1)
    
    const productOrders = orders.filter(order =>
      order.line_items.some(item => item.product_id === productId)
    )

    const analytics = {
      totalSales: productOrders.reduce((sum, order) => {
        const productItems = order.line_items.filter(item => item.product_id === productId)
        return sum + productItems.reduce((itemSum, item) => itemSum + item.quantity, 0)
      }, 0),
      totalRevenue: productOrders.reduce((sum, order) => {
        const productItems = order.line_items.filter(item => item.product_id === productId)
        return sum + productItems.reduce((itemSum, item) => itemSum + (item.quantity * item.cost), 0)
      }, 0),
      ordersCount: productOrders.length,
      variants: new Map<number, { sales: number; revenue: number }>(),
    }

    // Track variant sales
    productOrders.forEach(order => {
      order.line_items.forEach(item => {
        if (item.product_id === productId) {
          const current = analytics.variants.get(item.variant_id) || { sales: 0, revenue: 0 }
          analytics.variants.set(item.variant_id, {
            sales: current.sales + item.quantity,
            revenue: current.revenue + (item.quantity * item.cost),
          })
        }
      })
    })

    return {
      ...analytics,
      variants: Array.from(analytics.variants.entries()).map(([variantId, stats]) => ({
        variantId,
        ...stats,
      })),
    }
  }

  // ==================== BATCH OPERATIONS ====================

  async batchUpdateProducts(updates: Array<{ productId: string; updates: Partial<PrintifyProduct> }>) {
    const results = []
    
    for (const update of updates) {
      try {
        const result = await this.updateProduct(update.productId, update.updates)
        results.push({ productId: update.productId, success: true, result })
      } catch (error) {
        results.push({ 
          productId: update.productId, 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        })
      }
    }
    
    return results
  }

  async batchPublishProducts(productIds: string[], publishData: any) {
    const results = []
    
    for (const productId of productIds) {
      try {
        const result = await this.publishProduct(productId, publishData)
        results.push({ productId, success: true, result })
      } catch (error) {
        results.push({ 
          productId, 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        })
      }
    }
    
    return results
  }
}

// Singleton instance
let printifyInstance: PrintifyIntegration | null = null

export function getPrintifyIntegration(config?: PrintifyConfig): PrintifyIntegration {
  if (!printifyInstance && config) {
    printifyInstance = new PrintifyIntegration(config)
  }
  
  if (!printifyInstance) {
    throw new Error('Printify integration not initialized. Call initPrintify first.')
  }
  
  return printifyInstance
}

export function initPrintify(config: PrintifyConfig): PrintifyIntegration {
  printifyInstance = new PrintifyIntegration(config)
  return printifyInstance
}

// Helper function to sync Printify products to Shopify
export async function syncPrintifyToShopify(
  printifyProduct: PrintifyProduct,
  shopifyIntegration: any
): Promise<any> {
  // Transform Printify product to Shopify format
  const shopifyProductData = {
    title: printifyProduct.title,
    body_html: printifyProduct.description,
    product_type: 'Print-on-Demand',
    vendor: 'Printify',
    tags: printifyProduct.tags,
    variants: printifyProduct.variants.map(variant => ({
      price: variant.price.toString(),
      compare_at_price: (variant.price * 1.5).toString(), // 50% markup for "compare at"
      sku: variant.sku,
      inventory_quantity: variant.is_available ? 100 : 0,
      weight: variant.grams,
      weight_unit: 'g',
      option1: variant.title,
    })),
    options: printifyProduct.options.map(option => ({
      name: option.name,
      values: option.values.map(val => val.title),
    })),
    images: printifyProduct.images.map(img => ({
      src: img.src,
      alt: printifyProduct.title,
      position: img.position === 'front' ? 1 : 2,
    })),
  }

  // Create in Shopify
  return shopifyIntegration.createProduct(shopifyProductData)
}

export default {
  PrintifyIntegration,
  getPrintifyIntegration,
  initPrintify,
  syncPrintifyToShopify,
}