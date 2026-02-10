// Shopify Storefront API Integration
// This handles all Shopify operations for the Vollebak template

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.warn('Shopify environment variables not set. Some features may not work.')
}

const shopifyFetch = async (query: string, variables?: any) => {
  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      console.error('Shopify GraphQL errors:', data.errors)
      throw new Error(data.errors[0].message)
    }

    return data.data
  } catch (error) {
    console.error('Shopify fetch error:', error)
    throw error
  }
}

// Product queries
export const getAllProducts = async () => {
  const query = `
    query GetAllProducts($first: Int = 20) {
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

  return shopifyFetch(query, { first: 20 })
}

export const getProductByHandle = async (handle: string) => {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
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
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `

  return shopifyFetch(query, { handle })
}

// Cart operations
export const createCart = async () => {
  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `

  return shopifyFetch(query)
}

export const addToCart = async (cartId: string, variantId: string, quantity: number = 1) => {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  return shopifyFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }]
  })
}

export const updateCartItem = async (cartId: string, lineId: string, quantity: number) => {
  const query = `
    mutation UpdateCartItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  return shopifyFetch(query, {
    cartId,
    lines: [{ id: lineId, quantity }]
  })
}

export const removeFromCart = async (cartId: string, lineId: string) => {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  return shopifyFetch(query, {
    cartId,
    lineIds: [lineId]
  })
}

// Checkout
export const createCheckout = async (lineItems: Array<{ variantId: string; quantity: number }>) => {
  const query = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `

  return shopifyFetch(query, {
    input: {
      lineItems,
      email: 'customer@example.com' // In production, get from user input
    }
  })
}

// Printify integration helper
export const syncWithPrintify = async (productData: any) => {
  // This would integrate with Printify API
  // For now, return mock data
  return {
    success: true,
    printifyProductId: `printify_${Date.now()}`,
    mockupUrls: [
      'https://via.placeholder.com/800x800/000000/FFFFFF?text=Printify+Mockup',
    ],
    price: productData.price || 29.99,
    productionTime: '7-10 business days',
  }
}

// Analytics for Shopify
export const getShopifyAnalytics = async () => {
  // This would use Shopify Admin API for detailed analytics
  // For now, return mock data
  return {
    totalOrders: 1247,
    totalRevenue: 124580,
    averageOrderValue: 99.9,
    conversionRate: 4.8,
    topProducts: [
      { name: 'Quantum Jacket', sales: 342 },
      { name: 'Solar Hoodie', sales: 287 },
    ],
  }
}

export default {
  getAllProducts,
  getProductByHandle,
  createCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  createCheckout,
  syncWithPrintify,
  getShopifyAnalytics,
}