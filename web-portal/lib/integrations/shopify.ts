/**
 * Shopify Integration
 * Product sync, inventory management, embedded checkout
 */

export interface ShopifyConfig {
  storeUrl: string;
  storefrontAccessToken: string;
  adminAccessToken?: string;
  apiVersion?: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  vendor: string;
  productType: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'draft';
  images: Array<{
    id: string;
    src: string;
    alt?: string;
    width: number;
    height: number;
  }>;
  variants: ShopifyVariant[];
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  seo: {
    title?: string;
    description?: string;
  };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  sku?: string;
  barcode?: string;
  inventoryQuantity: number;
  inventoryPolicy: 'deny' | 'continue';
  availableForSale: boolean;
  image?: {
    id: string;
    src: string;
  };
  weight?: number;
  weightUnit?: string;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    src: string;
    alt?: string;
  };
  productsCount: number;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  totalPrice: string;
  subtotalPrice: string;
  totalTax: string;
  totalShipping: string;
  financialStatus: 'pending' | 'authorized' | 'paid' | 'partially_paid' | 'refunded' | 'voided';
  fulfillmentStatus: 'fulfilled' | 'partial' | 'unfulfilled' | null;
  lineItems: Array<{
    id: string;
    title: string;
    quantity: number;
    price: string;
    sku?: string;
    variant: {
      id: string;
      title: string;
    };
  }>;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  };
}

export class ShopifyClient {
  private config: ShopifyConfig;
  private storefrontEndpoint: string;
  private adminEndpoint: string;

  constructor(config: ShopifyConfig) {
    this.config = config;
    const storeName = config.storeUrl.replace('https://', '').replace('.myshopify.com', '');
    this.storefrontEndpoint = `https://${storeName}.myshopify.com/api/${config.apiVersion || '2024-01'}/graphql.json`;
    this.adminEndpoint = `https://${storeName}.myshopify.com/admin/api/${config.apiVersion || '2024-01'}`;
  }

  // ============================================================================
  // Storefront API (Public access)
  // ============================================================================

  async getProducts(limit: number = 50): Promise<ShopifyProduct[]> {
    const query = `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              vendor
              productType
              tags
              publishedAt
              createdAt
              updatedAt
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    sku
                    barcode
                    availableForSale
                    quantityAvailable
                    image {
                      id
                      url
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                id
                name
                values
              }
              seo {
                title
                description
              }
            }
          }
        }
      }
    `;

    const response = await this.storefrontQuery(query, { first: limit });
    return this.transformProducts(response.data.products.edges);
  }

  async getProduct(handle: string): Promise<ShopifyProduct | null> {
    const query = `
      query GetProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          vendor
          productType
          tags
          publishedAt
          createdAt
          updatedAt
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                sku
                barcode
                availableForSale
                quantityAvailable
                image {
                  id
                  url
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          seo {
            title
            description
          }
        }
      }
    `;

    const response = await this.storefrontQuery(query, { handle });
    
    if (!response.data.productByHandle) {
      return null;
    }

    const products = this.transformProducts([{ node: response.data.productByHandle }]);
    return products[0] || null;
  }

  async getCollections(limit: number = 50): Promise<ShopifyCollection[]> {
    const query = `
      query GetCollections($first: Int!) {
        collections(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              image {
                url
                altText
              }
              productsCount
            }
          }
        }
      }
    `;

    const response = await this.storefrontQuery(query, { first: limit });
    
    return response.data.collections.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      handle: edge.node.handle,
      image: edge.node.image ? {
        src: edge.node.image.url,
        alt: edge.node.image.altText
      } : undefined,
      productsCount: edge.node.productsCount
    }));
  }

  async getCollectionProducts(handle: string, limit: number = 50): Promise<ShopifyProduct[]> {
    const query = `
      query GetCollectionProducts($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
          products(first: $first) {
            edges {
              node {
                id
                title
                description
                handle
                vendor
                productType
                tags
                images(first: 5) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
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
          }
        }
      }
    `;

    const response = await this.storefrontQuery(query, { handle, first: limit });
    
    if (!response.data.collectionByHandle) {
      return [];
    }

    return this.transformProducts(response.data.collectionByHandle.products.edges);
  }

  async createCheckout(lineItems: Array<{ variantId: string; quantity: number }>): Promise<{
    checkoutUrl: string;
    checkoutId: string;
  }> {
    const mutation = `
      mutation CreateCheckout($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `;

    const input = {
      lineItems: lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }))
    };

    const response = await this.storefrontQuery(mutation, { input });

    if (response.data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(response.data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return {
      checkoutId: response.data.checkoutCreate.checkout.id,
      checkoutUrl: response.data.checkoutCreate.checkout.webUrl
    };
  }

  // ============================================================================
  // Admin API (Requires admin access token)
  // ============================================================================

  async updateInventory(variantId: string, quantity: number): Promise<boolean> {
    if (!this.config.adminAccessToken) {
      throw new Error('Admin access token required for inventory management');
    }

    const inventoryItemId = await this.getInventoryItemId(variantId);

    const response = await fetch(`${this.adminEndpoint}/inventory_levels/set.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.adminAccessToken
      },
      body: JSON.stringify({
        location_id: await this.getLocationId(),
        inventory_item_id: inventoryItemId,
        available: quantity
      })
    });

    return response.ok;
  }

  async getOrders(limit: number = 50, status?: string): Promise<ShopifyOrder[]> {
    if (!this.config.adminAccessToken) {
      throw new Error('Admin access token required for order management');
    }

    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(status && { financial_status: status })
    });

    const response = await fetch(`${this.adminEndpoint}/orders.json?${params}`, {
      headers: {
        'X-Shopify-Access-Token': this.config.adminAccessToken
      }
    });

    const data = await response.json();
    return this.transformOrders(data.orders || []);
  }

  async fulfillOrder(orderId: string, trackingNumber?: string): Promise<boolean> {
    if (!this.config.adminAccessToken) {
      throw new Error('Admin access token required for order fulfillment');
    }

    const response = await fetch(`${this.adminEndpoint}/orders/${orderId}/fulfillments.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.config.adminAccessToken
      },
      body: JSON.stringify({
        fulfillment: {
          tracking_number: trackingNumber,
          notify_customer: true
        }
      })
    });

    return response.ok;
  }

  async syncProducts(): Promise<{ synced: number; errors: string[] }> {
    const products = await this.getProducts(250);
    const errors: string[] = [];
    let synced = 0;

    // Store products in local database
    for (const product of products) {
      try {
        // TODO: Save to database
        synced++;
      } catch (error: any) {
        errors.push(`${product.handle}: ${error.message}`);
      }
    }

    return { synced, errors };
  }

  // ============================================================================
  // Private helpers
  // ============================================================================

  private async storefrontQuery(query: string, variables: any = {}): Promise<any> {
    const response = await fetch(this.storefrontEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.config.storefrontAccessToken
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Shopify GraphQL error: ${data.errors[0].message}`);
    }

    return data;
  }

  private transformProducts(edges: any[]): ShopifyProduct[] {
    return edges.map(edge => {
      const node = edge.node;
      
      return {
        id: node.id,
        title: node.title,
        description: node.description || '',
        handle: node.handle,
        vendor: node.vendor || '',
        productType: node.productType || '',
        tags: node.tags || [],
        publishedAt: node.publishedAt,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        status: 'active',
        images: node.images?.edges.map((img: any) => ({
          id: img.node.id,
          src: img.node.url,
          alt: img.node.altText,
          width: img.node.width,
          height: img.node.height
        })) || [],
        variants: node.variants?.edges.map((variant: any) => ({
          id: variant.node.id,
          title: variant.node.title,
          price: variant.node.price.amount,
          compareAtPrice: variant.node.compareAtPrice?.amount,
          sku: variant.node.sku,
          barcode: variant.node.barcode,
          inventoryQuantity: variant.node.quantityAvailable || 0,
          inventoryPolicy: 'deny',
          availableForSale: variant.node.availableForSale,
          image: variant.node.image ? {
            id: variant.node.image.id,
            src: variant.node.image.url
          } : undefined,
          selectedOptions: variant.node.selectedOptions
        })) || [],
        options: node.options || [],
        seo: node.seo || {}
      };
    });
  }

  private transformOrders(orders: any[]): ShopifyOrder[] {
    return orders.map(order => ({
      id: order.id,
      name: order.name,
      email: order.email,
      createdAt: order.created_at,
      totalPrice: order.total_price,
      subtotalPrice: order.subtotal_price,
      totalTax: order.total_tax,
      totalShipping: order.total_shipping,
      financialStatus: order.financial_status,
      fulfillmentStatus: order.fulfillment_status,
      lineItems: order.line_items.map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku,
        variant: {
          id: item.variant_id,
          title: item.variant_title
        }
      })),
      shippingAddress: order.shipping_address
    }));
  }

  private async getInventoryItemId(variantId: string): Promise<string> {
    const response = await fetch(`${this.adminEndpoint}/variants/${variantId}.json`, {
      headers: {
        'X-Shopify-Access-Token': this.config.adminAccessToken!
      }
    });

    const data = await response.json();
    return data.variant.inventory_item_id;
  }

  private async getLocationId(): Promise<string> {
    const response = await fetch(`${this.adminEndpoint}/locations.json`, {
      headers: {
        'X-Shopify-Access-Token': this.config.adminAccessToken!
      }
    });

    const data = await response.json();
    return data.locations[0].id;
  }
}

export function createShopifyClient(config: ShopifyConfig): ShopifyClient {
  return new ShopifyClient(config);
}
