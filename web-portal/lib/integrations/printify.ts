/**
 * Printify Integration
 * Print-on-demand, auto-fulfillment
 */

export interface PrintifyConfig {
  apiKey: string;
  shopId: string;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: Array<{
    name: string;
    type: string;
    values: Array<{
      id: number;
      title: string;
    }>;
  }>;
  variants: PrintifyVariant[];
  images: Array<{
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
  }>;
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  print_provider_id: number;
  print_areas: Array<{
    variant_ids: number[];
    placeholders: Array<{
      position: string;
      images: Array<{
        id: string;
        name: string;
        type: string;
        height: number;
        width: number;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }>;
    }>;
  }>;
}

export interface PrintifyVariant {
  id: number;
  sku: string;
  cost: number;
  price: number;
  title: string;
  grams: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  options: number[];
}

export interface PrintifyBlueprint {
  id: number;
  title: string;
  description: string;
  brand: string;
  model: string;
  images: string[];
}

export interface PrintifyOrder {
  id: string;
  status: 'pending' | 'on-hold' | 'production' | 'fulfilled' | 'cancelled';
  line_items: Array<{
    product_id: string;
    variant_id: number;
    quantity: number;
    print_provider_id: number;
    cost: number;
    shipping_cost: number;
    status: string;
  }>;
  address_to: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
  };
  shipments: Array<{
    carrier: string;
    number: string;
    url: string;
    delivered_at?: string;
  }>;
  created_at: string;
  sent_to_production_at?: string;
  fulfilled_at?: string;
}

export class PrintifyClient {
  private config: PrintifyConfig;
  private baseUrl = 'https://api.printify.com/v1';

  constructor(config: PrintifyConfig) {
    this.config = config;
  }

  // ============================================================================
  // Products
  // ============================================================================

  async getProducts(page: number = 1, limit: number = 50): Promise<{
    current_page: number;
    total: number;
    data: PrintifyProduct[];
  }> {
    const response = await this.request(
      `GET`,
      `/shops/${this.config.shopId}/products.json?page=${page}&limit=${limit}`
    );
    return response;
  }

  async getProduct(productId: string): Promise<PrintifyProduct> {
    return this.request(
      'GET',
      `/shops/${this.config.shopId}/products/${productId}.json`
    );
  }

  async createProduct(product: {
    title: string;
    description: string;
    blueprint_id: number;
    print_provider_id: number;
    variants: Array<{
      id: number;
      price: number;
      is_enabled: boolean;
    }>;
    print_areas: Array<{
      variant_ids: number[];
      placeholders: Array<{
        position: string;
        images: Array<{
          id: string;
          x: number;
          y: number;
          scale: number;
          angle: number;
        }>;
      }>;
    }>;
  }): Promise<PrintifyProduct> {
    return this.request(
      'POST',
      `/shops/${this.config.shopId}/products.json`,
      product
    );
  }

  async updateProduct(productId: string, updates: Partial<PrintifyProduct>): Promise<PrintifyProduct> {
    return this.request(
      'PUT',
      `/shops/${this.config.shopId}/products/${productId}.json`,
      updates
    );
  }

  async deleteProduct(productId: string): Promise<boolean> {
    await this.request(
      'DELETE',
      `/shops/${this.config.shopId}/products/${productId}.json`
    );
    return true;
  }

  async publishProduct(productId: string, options: {
    title?: boolean;
    description?: boolean;
    images?: boolean;
    variants?: boolean;
    tags?: boolean;
  } = {}): Promise<boolean> {
    await this.request(
      'POST',
      `/shops/${this.config.shopId}/products/${productId}/publish.json`,
      options
    );
    return true;
  }

  // ============================================================================
  // Blueprints (Product Templates)
  // ============================================================================

  async getBlueprints(): Promise<PrintifyBlueprint[]> {
    return this.request('GET', '/catalog/blueprints.json');
  }

  async getBlueprint(blueprintId: number): Promise<PrintifyBlueprint> {
    return this.request('GET', `/catalog/blueprints/${blueprintId}.json`);
  }

  async getBlueprintProviders(blueprintId: number): Promise<Array<{
    id: number;
    title: string;
    location: {
      address1: string;
      city: string;
      country: string;
    };
  }>> {
    return this.request('GET', `/catalog/blueprints/${blueprintId}/print_providers.json`);
  }

  async getBlueprintVariants(blueprintId: number, printProviderId: number): Promise<Array<{
    id: number;
    title: string;
    options: Record<string, string>;
    placeholders: Array<{
      position: string;
      height: number;
      width: number;
    }>;
  }>> {
    return this.request(
      'GET',
      `/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`
    );
  }

  // ============================================================================
  // Orders
  // ============================================================================

  async getOrders(page: number = 1, limit: number = 50): Promise<{
    current_page: number;
    total: number;
    data: PrintifyOrder[];
  }> {
    return this.request(
      'GET',
      `/shops/${this.config.shopId}/orders.json?page=${page}&limit=${limit}`
    );
  }

  async getOrder(orderId: string): Promise<PrintifyOrder> {
    return this.request(
      'GET',
      `/shops/${this.config.shopId}/orders/${orderId}.json`
    );
  }

  async createOrder(order: {
    external_id: string;
    line_items: Array<{
      product_id: string;
      variant_id: number;
      quantity: number;
    }>;
    shipping_method: number;
    send_shipping_notification: boolean;
    address_to: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      country: string;
      region: string;
      address1: string;
      address2?: string;
      city: string;
      zip: string;
    };
  }): Promise<PrintifyOrder> {
    return this.request(
      'POST',
      `/shops/${this.config.shopId}/orders.json`,
      order
    );
  }

  async submitOrderToProduction(orderId: string): Promise<boolean> {
    await this.request(
      'POST',
      `/shops/${this.config.shopId}/orders/${orderId}/send_to_production.json`
    );
    return true;
  }

  async calculateShipping(order: {
    line_items: Array<{
      product_id: string;
      variant_id: number;
      quantity: number;
    }>;
    address_to: {
      country: string;
      region: string;
      zip?: string;
    };
  }): Promise<Array<{
    id: number;
    name: string;
    cost: number;
    delivery_days_min: number;
    delivery_days_max: number;
  }>> {
    return this.request(
      'POST',
      `/shops/${this.config.shopId}/orders/shipping.json`,
      order
    );
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    await this.request(
      'POST',
      `/shops/${this.config.shopId}/orders/${orderId}/cancel.json`
    );
    return true;
  }

  // ============================================================================
  // Images
  // ============================================================================

  async uploadImage(imageData: {
    file_name: string;
    contents: string; // Base64 encoded
  }): Promise<{
    id: string;
    file_name: string;
    height: number;
    width: number;
    size: number;
    mime_type: string;
    preview_url: string;
    upload_time: string;
  }> {
    return this.request('POST', '/uploads/images.json', imageData);
  }

  async getUploadedImages(): Promise<Array<{
    id: string;
    file_name: string;
    height: number;
    width: number;
    size: number;
    mime_type: string;
    preview_url: string;
    upload_time: string;
  }>> {
    return this.request('GET', '/uploads/images.json');
  }

  // ============================================================================
  // Webhooks
  // ============================================================================

  async createWebhook(webhook: {
    topic: 'order:created' | 'order:updated' | 'order:sent-to-production' | 'order:shipment:created' | 'order:shipment:delivered' | 'product:deleted';
    url: string;
  }): Promise<{
    id: string;
    topic: string;
    url: string;
    shop_id: string;
  }> {
    return this.request(
      'POST',
      `/shops/${this.config.shopId}/webhooks.json`,
      webhook
    );
  }

  async getWebhooks(): Promise<Array<{
    id: string;
    topic: string;
    url: string;
    shop_id: string;
  }>> {
    return this.request('GET', `/shops/${this.config.shopId}/webhooks.json`);
  }

  async deleteWebhook(webhookId: string): Promise<boolean> {
    await this.request('DELETE', `/shops/${this.config.shopId}/webhooks/${webhookId}.json`);
    return true;
  }

  // ============================================================================
  // Auto-fulfillment
  // ============================================================================

  async autoFulfillOrder(shopifyOrder: {
    id: string;
    line_items: Array<{
      product_id: string;
      variant_id: string;
      quantity: number;
    }>;
    shipping_address: {
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
      country: string;
      province: string;
      address1: string;
      address2?: string;
      city: string;
      zip: string;
    };
  }): Promise<{
    success: boolean;
    printifyOrderId?: string;
    error?: string;
  }> {
    try {
      // Map Shopify line items to Printify products
      const lineItems = await Promise.all(
        shopifyOrder.line_items.map(async (item) => {
          // TODO: Map Shopify product to Printify product
          // This would require a mapping table in your database
          return {
            product_id: item.product_id,
            variant_id: parseInt(item.variant_id),
            quantity: item.quantity
          };
        })
      );

      // Calculate shipping
      const shippingOptions = await this.calculateShipping({
        line_items: lineItems,
        address_to: {
          country: shopifyOrder.shipping_address.country,
          region: shopifyOrder.shipping_address.province,
          zip: shopifyOrder.shipping_address.zip
        }
      });

      // Use cheapest shipping by default
      const shippingMethod = shippingOptions.sort((a, b) => a.cost - b.cost)[0];

      // Create Printify order
      const printifyOrder = await this.createOrder({
        external_id: shopifyOrder.id,
        line_items: lineItems,
        shipping_method: shippingMethod.id,
        send_shipping_notification: true,
        address_to: {
          first_name: shopifyOrder.shipping_address.first_name,
          last_name: shopifyOrder.shipping_address.last_name,
          email: shopifyOrder.shipping_address.email,
          phone: shopifyOrder.shipping_address.phone || '',
          country: shopifyOrder.shipping_address.country,
          region: shopifyOrder.shipping_address.province,
          address1: shopifyOrder.shipping_address.address1,
          address2: shopifyOrder.shipping_address.address2,
          city: shopifyOrder.shipping_address.city,
          zip: shopifyOrder.shipping_address.zip
        }
      });

      // Submit to production
      await this.submitOrderToProduction(printifyOrder.id);

      return {
        success: true,
        printifyOrderId: printifyOrder.id
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================================================
  // Sync with Shopify
  // ============================================================================

  async syncProductToShopify(productId: string, shopifyClient: any): Promise<{
    success: boolean;
    shopifyProductId?: string;
    error?: string;
  }> {
    try {
      const product = await this.getProduct(productId);

      // Create Shopify product
      const shopifyProduct = {
        title: product.title,
        body_html: product.description,
        vendor: 'Printify',
        product_type: 'Print on Demand',
        tags: product.tags.join(','),
        images: product.images.map(img => ({ src: img.src })),
        variants: product.variants.map(variant => ({
          title: variant.title,
          price: variant.price.toString(),
          sku: variant.sku,
          inventory_quantity: 999,
          inventory_policy: 'continue'
        }))
      };

      // TODO: Create product in Shopify using shopifyClient

      return {
        success: true,
        shopifyProductId: 'shopify-id'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================================================
  // Private helpers
  // ============================================================================

  private async request(method: string, endpoint: string, data?: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Printify API error: ${error.message || response.statusText}`);
    }

    return response.json();
  }
}

export function createPrintifyClient(config: PrintifyConfig): PrintifyClient {
  return new PrintifyClient(config);
}
