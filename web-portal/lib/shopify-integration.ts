// Complete Shopify Integration for Merchandise Portal
// Handles products, orders, inventory, and store management

import { createAdminApiClient } from '@shopify/admin-api-client'

export interface ShopifyConfig {
  storeDomain: string
  adminAccessToken: string
  storefrontAccessToken: string
  apiVersion: string
}

export interface Product {
  id: string
  title: string
  description: string
  handle: string
  variants: Variant[]
  images: Image[]
  price: number
  compareAtPrice?: number
  inventory: number
  tags: string[]
  options: Option[]
  status: 'active' | 'draft' | 'archived'
}

export interface Variant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  sku: string
  inventoryQuantity: number
  weight: number
  weightUnit: string
  option1?: string
  option2?: string
  option3?: string
}

export interface Image {
  id: string
  src: string
  altText?: string
}

export interface Option {
  id: string
  name: string
  values: string[]
}

export interface Order {
  id: string
  name: string
  email: string
  financialStatus: string
  fulfillmentStatus: string
  totalPrice: string
  lineItems: OrderLineItem[]
  shippingAddress?: Address
  billingAddress?: Address
  createdAt: string
}

export interface OrderLineItem {
  id: string
  title: string
  quantity: number
  variant: Variant
  price: string
}

export interface Address {
  address1: string
  address2?: string
  city: string
  province?: string
  country: string
  zip: string
  phone?: string
}

export class ShopifyIntegration {
  private client: any
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
    this.client = createAdminApiClient({
      storeDomain: config.storeDomain,
      apiVersion: config.apiVersion,
      accessToken: config.adminAccessToken,
    })
  }

  // ==================== PRODUCT MANAGEMENT ====================

  async getAllProducts(limit: number = 50): Promise<Product[]> {
    const query = `
      query GetAllProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              descriptionHtml
              handle
              status
              tags
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price
                    compareAtPrice
                    sku
                    inventoryQuantity
                    weight
                    weightUnit
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              images(first: 10) {
                edges {
                  node {
                    id
                    src
                    altText
                  }
                }
              }
              options {
                id
                name
                values
              }
            }
          }
        }
      }
    `

    const response = await this.client.request(query, { first: limit })
    return response.data.products.edges.map((edge: any) => this.transformProduct(edge.node))
  }

  async getProductById(id: string): Promise<Product | null> {
    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          descriptionHtml
          handle
          status
          tags
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                weight
                weightUnit
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                src
                altText
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    `

    try {
      const response = await this.client.request(query, { id })
      return response.data.product ? this.transformProduct(response.data.product) : null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const mutation = `
      mutation CreateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            descriptionHtml
            handle
            status
            tags
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const input = {
      title: productData.title,
      descriptionHtml: productData.description,
      handle: productData.handle,
      tags: productData.tags,
      status: productData.status || 'ACTIVE',
      variants: productData.variants?.map(variant => ({
        price: variant.price,
        sku: variant.sku,
        inventoryQuantity: variant.inventoryQuantity,
      })),
    }

    const response = await this.client.request(mutation, { input })
    
    if (response.data.productCreate.userErrors.length > 0) {
      throw new Error(response.data.productCreate.userErrors[0].message)
    }

    return this.transformProduct(response.data.productCreate.product)
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const mutation = `
      mutation UpdateProduct($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            title
            descriptionHtml
            handle
            status
            tags
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const input = {
      id,
      ...updates,
    }

    const response = await this.client.request(mutation, { input })
    
    if (response.data.productUpdate.userErrors.length > 0) {
      throw new Error(response.data.productUpdate.userErrors[0].message)
    }

    return this.transformProduct(response.data.productUpdate.product)
  }

  async deleteProduct(id: string): Promise<boolean> {
    const mutation = `
      mutation DeleteProduct($input: ProductDeleteInput!) {
        productDelete(input: $input) {
          deletedProductId
          userErrors {
            field
            message
          }
        }
      }
    `

    const response = await this.client.request(mutation, { input: { id } })
    
    if (response.data.productDelete.userErrors.length > 0) {
      throw new Error(response.data.productDelete.userErrors[0].message)
    }

    return !!response.data.productDelete.deletedProductId
  }

  // ==================== ORDER MANAGEMENT ====================

  async getAllOrders(limit: number = 50): Promise<Order[]> {
    const query = `
      query GetAllOrders($first: Int!) {
        orders(first: $first) {
          edges {
            node {
              id
              name
              email
              financialStatus
              fulfillmentStatus
              totalPrice
              lineItems(first: 10) {
                edges {
                  node {
                    id
                    title
                    quantity
                    variant {
                      id
                      title
                      price
                    }
                  }
                }
              }
              shippingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              billingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              createdAt
            }
          }
        }
      }
    `

    const response = await this.client.request(query, { first: limit })
    return response.data.orders.edges.map((edge: any) => this.transformOrder(edge.node))
  }

  async getOrderById(id: string): Promise<Order | null> {
    const query = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          email
          financialStatus
          fulfillmentStatus
          totalPrice
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price
                }
              }
            }
          }
          shippingAddress {
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          billingAddress {
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          createdAt
        }
      }
    `

    try {
      const response = await this.client.request(query, { id })
      return response.data.order ? this.transformOrder(response.data.order) : null
    } catch (error) {
      console.error('Error fetching order:', error)
      return null
    }
  }

  async createFulfillment(orderId: string, lineItems: Array<{ id: string; quantity: number }>) {
    const mutation = `
      mutation CreateFulfillment($input: FulfillmentInput!) {
        fulfillmentCreateV2(input: $input) {
          fulfillment {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const input = {
      lineItemsByFulfillmentOrder: [
        {
          fulfillmentOrderId: orderId,
          fulfillmentOrderLineItems: lineItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
        },
      ],
    }

    const response = await this.client.request(mutation, { input })
    
    if (response.data.fulfillmentCreateV2.userErrors.length > 0) {
      throw new Error(response.data.fulfillmentCreateV2.userErrors[0].message)
    }

    return response.data.fulfillmentCreateV2.fulfillment
  }

  // ==================== INVENTORY MANAGEMENT ====================

  async updateInventory(variantId: string, quantity: number): Promise<boolean> {
    const mutation = `
      mutation UpdateInventory($input: InventoryAdjustQuantityInput!) {
        inventoryAdjustQuantity(input: $input) {
          inventoryLevel {
            available
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const input = {
      inventoryItemId: variantId,
      locationId: await this.getDefaultLocationId(),
      availableDelta: quantity,
    }

    const response = await this.client.request(mutation, { input })
    
    if (response.data.inventoryAdjustQuantity.userErrors.length > 0) {
      throw new Error(response.data.inventoryAdjustQuantity.userErrors[0].message)
    }

    return true
  }

  async getInventoryLevels(productId: string): Promise<number> {
    const query = `
      query GetInventoryLevels($id: ID!) {
        product(id: $id) {
          variants(first: 10) {
            edges {
              node {
                inventoryQuantity
              }
            }
          }
        }
      }
    `

    const response = await this.client.request(query, { id: productId })
    const variants = response.data.product.variants.edges
    
    return variants.reduce((total: number, edge: any) => {
      return total + edge.node.inventoryQuantity
    }, 0)
  }

  // ==================== ANALYTICS ====================

  async getSalesAnalytics(startDate: string, endDate: string) {
    const query = `
      query GetSalesAnalytics($startDate: DateTime!, $endDate: DateTime!) {
        orders(first: 100, query: "created_at:>=${startDate} created_at:<=${endDate}") {
          edges {
            node {
              totalPrice
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await this.client.request(query, { startDate, endDate })
    const orders = response.data.orders.edges
    
    const analytics = {
      totalRevenue: 0,
      totalOrders: orders.length,
      topProducts: new Map<string, { quantity: number; revenue: number }>(),
      dailySales: new Map<string, number>(),
    }

    orders.forEach((edge: any) => {
      const order = edge.node
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0]
      const orderRevenue = parseFloat(order.totalPrice)
      
      analytics.totalRevenue += orderRevenue
      analytics.dailySales.set(orderDate, (analytics.dailySales.get(orderDate) || 0) + orderRevenue)

      order.lineItems.edges.forEach((itemEdge: any) => {
        const item = itemEdge.node
        const productName = item.title
        const quantity = item.quantity
        const price = parseFloat(item.variant.price)
        const revenue = quantity * price
        
        const current = analytics.topProducts.get(productName) || { quantity: 0, revenue: 0 }
        analytics.topProducts.set(productName, {
          quantity: current.quantity + quantity,
          revenue: current.revenue + revenue,
        })
      })
    })

    return {
      ...analytics,
      topProducts: Array.from(analytics.topProducts.entries())
        .sort((a, b) => b[1].revenue - a[1].revenue)
        .slice(0, 10),
      dailySales: Array.from(analytics.dailySales.entries())
        .sort((a, b) => a[0].localeCompare(b[0])),
    }
  }

  // ==================== HELPER METHODS ====================

  private async getDefaultLocationId(): Promise<string> {
    const query = `
      query GetLocations {
        locations(first: 1) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `

    const response = await this.client.request(query)
    return response.data.locations.edges[0].node.id
  }

  private transformProduct(shopifyProduct: any): Product {
    return {
      id: shopifyProduct.id,
      title: shopifyProduct.title,
      description: shopifyProduct.descriptionHtml,
      handle: shopifyProduct.handle,
      status: shopifyProduct.status.toLowerCase() as 'active' | 'draft' | 'archived',
      tags: shopifyProduct.tags,
      variants: shopifyProduct.variants.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: edge.node.price,
        compareAtPrice: edge.node.compareAtPrice,
        sku: edge.node.sku,
        inventoryQuantity: edge.node.inventoryQuantity,
        weight: edge.node.weight,
        weightUnit: edge.node.weightUnit,
        option1: edge.node.selectedOptions[0]?.value,
        option2: edge.node.selectedOptions[1]?.value,
        option3: edge.node.selectedOptions[2]?.value,
      })),
      images: shopifyProduct.images.edges.map((edge: any) => ({
        id: edge.node.id,
        src: edge.node.src,
        altText: edge.node.altText,
      })),
      options: shopifyProduct.options,
      price: parseFloat(shopifyProduct.variants.edges[0]?.node.price || '0'),
      inventory: shopifyProduct.variants.edges.reduce((total: number, edge: any) => {
        return total + edge.node.inventoryQuantity
      }, 0),
    }
  }

  private transformOrder(shopifyOrder: any): Order {
    return {
      id: shopifyOrder.id,
      name: shopifyOrder.name,
      email: shopifyOrder.email,
      financialStatus: shopifyOrder.financialStatus,
      fulfillmentStatus: shopifyOrder.fulfillmentStatus,
      totalPrice: shopifyOrder.totalPrice,
      lineItems: shopifyOrder.lineItems.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        quantity: edge.node.quantity,
        variant: {
          id: edge.node.variant.id,
          title: edge.node.variant.title,
          price: edge.node.variant.price,
        },
        price: edge.node.variant.price,
      })),
      shippingAddress: shopifyOrder.shippingAddress,
      billingAddress: shopifyOrder.billingAddress,
      createdAt: shopifyOrder.createdAt,
    }
  }

  // ==================== STOREFRONT API (For customers) ====================

  async getStorefrontProducts(limit: number = 20): Promise<any[]> {
    const storefrontQuery = `
      query GetStorefrontProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(`https://${this.config.storeDomain}/api/${this.config.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.config.storefrontAccessToken,
      },
      body: JSON.stringify({
        query: storefrontQuery,
        variables: { first: limit },
      }),
    })

    const data = await response.json()
    return data.data.products.edges.map((edge: any) => edge.node)
  }
}

// Singleton instance
let shopifyInstance: ShopifyIntegration | null = null

export function getShopifyIntegration(config?: ShopifyConfig): ShopifyIntegration {
  if (!shopifyInstance && config) {
    shopifyInstance = new ShopifyIntegration(config)
  }
  
  if (!shopifyInstance) {
    throw new Error('Shopify integration not initialized. Call initShopify first.')
  }
  
  return shopifyInstance
}

export function initShopify(config: ShopifyConfig): ShopifyIntegration {
  shopifyInstance = new ShopifyIntegration(config)
  return shopifyInstance
}

export default {
  ShopifyIntegration,
  getShopifyIntegration,
  initShopify,
}