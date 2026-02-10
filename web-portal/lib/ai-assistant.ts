// AI Assistant Integration for Merchandise Portal
// This allows me (the AI) to help you manage everything

import { getShopifyIntegration, initShopify } from './shopify-integration'
import { getPrintifyIntegration, initPrintify } from './printify-integration'

export interface AssistantConfig {
  shopify?: {
    storeDomain: string
    adminAccessToken: string
    storefrontAccessToken: string
    apiVersion: string
  }
  printify?: {
    apiKey: string
    shopId: string
  }
  openai?: {
    apiKey: string
  }
}

export interface AssistantAction {
  type: 'shopify' | 'printify' | 'portal' | 'system'
  action: string
  parameters: any
  requiresConfirmation?: boolean
}

export interface AssistantResponse {
  success: boolean
  message: string
  data?: any
  nextActions?: AssistantAction[]
}

export class AIAssistant {
  private config: AssistantConfig
  private shopify: any = null
  private printify: any = null

  constructor(config: AssistantConfig) {
    this.config = config
    
    // Initialize integrations
    if (config.shopify) {
      this.shopify = initShopify(config.shopify)
    }
    
    if (config.printify) {
      this.printify = initPrintify(config.printify)
    }
  }

  // ==================== MAIN PROCESS METHOD ====================

  async processCommand(command: string): Promise<AssistantResponse> {
    console.log(`Processing command: "${command}"`)
    
    // Parse command and determine action
    const action = this.parseCommand(command)
    
    if (!action) {
      return {
        success: false,
        message: "I didn't understand that command. Try something like:\n- 'Show me my products'\n- 'Create a new t-shirt design'\n- 'Process orders'\n- 'Get sales analytics'",
      }
    }

    // Execute the action
    return await this.executeAction(action)
  }

  // ==================== COMMAND PARSING ====================

  private parseCommand(command: string): AssistantAction | null {
    const lowerCommand = command.toLowerCase()
    
    // Shopify commands
    if (lowerCommand.includes('product') || lowerCommand.includes('item')) {
      if (lowerCommand.includes('show') || lowerCommand.includes('list') || lowerCommand.includes('get')) {
        return {
          type: 'shopify',
          action: 'getProducts',
          parameters: { limit: 50 },
        }
      }
      if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
        return {
          type: 'shopify',
          action: 'createProduct',
          parameters: this.extractProductDetails(command),
          requiresConfirmation: true,
        }
      }
    }

    // Order commands
    if (lowerCommand.includes('order') || lowerCommand.includes('sale')) {
      if (lowerCommand.includes('process') || lowerCommand.includes('fulfill')) {
        return {
          type: 'shopify',
          action: 'processOrders',
          parameters: {},
          requiresConfirmation: true,
        }
      }
      if (lowerCommand.includes('show') || lowerCommand.includes('list')) {
        return {
          type: 'shopify',
          action: 'getOrders',
          parameters: { limit: 20 },
        }
      }
    }

    // Analytics commands
    if (lowerCommand.includes('analytics') || lowerCommand.includes('sales') || lowerCommand.includes('revenue')) {
      return {
        type: 'shopify',
        action: 'getAnalytics',
        parameters: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Last 30 days
          endDate: new Date().toISOString().split('T')[0],
        },
      }
    }

    // Printify commands
    if (lowerCommand.includes('printify') || lowerCommand.includes('print on demand') || lowerCommand.includes('pod')) {
      if (lowerCommand.includes('design') || lowerCommand.includes('mockup')) {
        return {
          type: 'printify',
          action: 'createDesign',
          parameters: this.extractDesignDetails(command),
          requiresConfirmation: true,
        }
      }
    }

    // Site management
    if (lowerCommand.includes('site') || lowerCommand.includes('website')) {
      if (lowerCommand.includes('create') || lowerCommand.includes('build') || lowerCommand.includes('launch')) {
        return {
          type: 'portal',
          action: 'createSite',
          parameters: this.extractSiteDetails(command),
          requiresConfirmation: true,
        }
      }
      if (lowerCommand.includes('update') || lowerCommand.includes('deploy')) {
        return {
          type: 'portal',
          action: 'deploySite',
          parameters: {},
          requiresConfirmation: true,
        }
      }
    }

    // System commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      return {
        type: 'system',
        action: 'showHelp',
        parameters: {},
      }
    }

    if (lowerCommand.includes('status') || lowerCommand.includes('check')) {
      return {
        type: 'system',
        action: 'getStatus',
        parameters: {},
      }
    }

    return null
  }

  private extractProductDetails(command: string): any {
    // Simple extraction - in reality would use NLP
    const details: any = {
      title: 'New Product',
      description: 'Product description',
      price: 29.99,
      inventory: 100,
    }

    if (command.includes('t-shirt') || command.includes('tshirt')) {
      details.title = 'Premium T-Shirt'
      details.product_type = 'Clothing'
      details.tags = ['t-shirt', 'clothing', 'apparel']
    } else if (command.includes('hoodie')) {
      details.title = 'Classic Hoodie'
      details.price = 59.99
      details.product_type = 'Clothing'
      details.tags = ['hoodie', 'sweatshirt', 'apparel']
    }

    return details
  }

  private extractDesignDetails(command: string): any {
    return {
      title: 'New Design',
      blueprint_id: 1, // T-shirt
      print_provider_id: 1,
    }
  }

  private extractSiteDetails(command: string): any {
    return {
      template: 'alex-nextjs', // or 'vollebak'
      domain: 'new-store.example.com',
      products: [],
    }
  }

  // ==================== ACTION EXECUTION ====================

  private async executeAction(action: AssistantAction): Promise<AssistantResponse> {
    try {
      switch (action.type) {
        case 'shopify':
          return await this.executeShopifyAction(action)
        case 'printify':
          return await this.executePrintifyAction(action)
        case 'portal':
          return await this.executePortalAction(action)
        case 'system':
          return await this.executeSystemAction(action)
        default:
          return {
            success: false,
            message: `Unknown action type: ${action.type}`,
          }
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Error executing action: ${error.message}`,
      }
    }
  }

  private async executeShopifyAction(action: AssistantAction): Promise<AssistantResponse> {
    if (!this.shopify) {
      return {
        success: false,
        message: 'Shopify integration not configured. Please add your Shopify credentials.',
      }
    }

    switch (action.action) {
      case 'getProducts': {
        const products = await this.shopify.getAllProducts(action.parameters.limit)
        return {
          success: true,
          message: `Found ${products.length} products in your store.`,
          data: products,
          nextActions: [
            {
              type: 'shopify',
              action: 'createProduct',
              parameters: {},
              requiresConfirmation: true,
            },
            {
              type: 'shopify',
              action: 'getAnalytics',
              parameters: {},
            },
          ],
        }
      }

      case 'createProduct': {
        if (action.requiresConfirmation) {
          return {
            success: true,
            message: `Ready to create product: "${action.parameters.title}" for $${action.parameters.price}. Confirm?`,
            data: action.parameters,
            nextActions: [
              {
                type: 'shopify',
                action: 'confirmCreateProduct',
                parameters: action.parameters,
              },
            ],
          }
        }

        const product = await this.shopify.createProduct(action.parameters)
        return {
          success: true,
          message: `Product "${product.title}" created successfully!`,
          data: product,
          nextActions: [
            {
              type: 'printify',
              action: 'createDesign',
              parameters: { shopifyProductId: product.id },
              requiresConfirmation: true,
            },
            {
              type: 'shopify',
              action: 'getProducts',
              parameters: { limit: 10 },
            },
          ],
        }
      }

      case 'getOrders': {
        const orders = await this.shopify.getAllOrders(action.parameters.limit)
        const pending = orders.filter((o: any) => o.fulfillmentStatus === 'unfulfilled')
        
        return {
          success: true,
          message: `You have ${orders.length} total orders, ${pending.length} pending fulfillment.`,
          data: { orders, pending },
          nextActions: pending.length > 0 ? [
            {
              type: 'shopify',
              action: 'processOrders',
              parameters: { orderIds: pending.map((o: any) => o.id) },
              requiresConfirmation: true,
            },
          ] : undefined,
        }
      }

      case 'getAnalytics': {
        const analytics = await this.shopify.getSalesAnalytics(
          action.parameters.startDate,
          action.parameters.endDate
        )
        
        return {
          success: true,
          message: `Sales analytics for the period:\n• Revenue: $${analytics.totalRevenue}\n• Orders: ${analytics.totalOrders}\n• Top product: ${analytics.topProducts[0]?.[0] || 'None'}`,
          data: analytics,
          nextActions: [
            {
              type: 'shopify',
              action: 'getProducts',
              parameters: { limit: 10 },
            },
          ],
        }
      }

      default:
        return {
          success: false,
          message: `Unknown Shopify action: ${action.action}`,
        }
    }
  }

  private async executePrintifyAction(action: AssistantAction): Promise<AssistantResponse> {
    if (!this.printify) {
      return {
        success: false,
        message: 'Printify integration not configured. Please add your Printify credentials.',
      }
    }

    switch (action.action) {
      case 'createDesign': {
        // This would create a Printify design from a Shopify product
        return {
          success: true,
          message: 'Ready to create Printify design. This will sync with your Shopify product.',
          data: action.parameters,
          nextActions: [
            {
              type: 'printify',
              action: 'confirmCreateDesign',
              parameters: action.parameters,
            },
          ],
        }
      }

      default:
        return {
          success: false,
          message: `Unknown Printify action: ${action.action}`,
        }
    }
  }

  private async executePortalAction(action: AssistantAction): Promise<AssistantResponse> {
    switch (action.action) {
      case 'createSite': {
        // This would use the template system to create a new site
        return {
          success: true,
          message: `Ready to create new e-commerce site using ${action.parameters.template} template.`,
          data: action.parameters,
          nextActions: [
            {
              type: 'portal',
              action: 'confirmCreateSite',
              parameters: action.parameters,
            },
          ],
        }
      }

      case 'deploySite': {
        // This would deploy to Vercel/Netlify
        return {
          success: true,
          message: 'Ready to deploy site to production.',
          data: {},
          nextActions: [
            {
              type: 'portal',
              action: 'confirmDeploySite',
              parameters: {},
            },
          ],
        }
      }

      default:
        return {
          success: false,
          message: `Unknown portal action: ${action.action}`,
        }
    }
  }

  private async executeSystemAction(action: AssistantAction): Promise<AssistantResponse> {
    switch (action.action) {
      case 'showHelp': {
        return {
          success: true,
          message: `I can help you with:

🛍️ **E-commerce Management:**
• Show products/orders
• Create new products
• Process orders
• View sales analytics

🎨 **Print-on-Demand:**
• Create designs
• Generate mockups
• Sync with Shopify

🌐 **Site Management:**
• Create new stores
• Deploy to production
• Update templates

📊 **Analytics:**
• Sales reports
• Product performance
• Customer insights

Just tell me what you want to do!`,
          nextActions: [
            {
              type: 'shopify',
              action: 'getProducts',
              parameters: { limit: 10 },
            },
            {
              type: 'shopify',
              action: 'getAnalytics',
              parameters: {},
            },
            {
              type: 'portal',
              action: 'createSite',
              parameters: {},
              requiresConfirmation: true,
            },
          ],
        }
      }

      case 'getStatus': {
        const status = {
          shopify: !!this.shopify,
          printify: !!this.printify,
          templates: ['alex-nextjs', 'vollebak'],
        }
        
        return {
          success: true,
          message: `System Status:
• Shopify: ${status.shopify ? 'Connected ✓' : 'Not configured'}
• Printify: ${status.printify ? 'Connected ✓' : 'Not configured'}
• Templates: ${status.templates.join(', ')}`,
          data: status,
        }
      }

      default:
        return {
          success: false,
          message: `Unknown system action: ${action.action}`,
        }
    }
  }

  // ==================== CONFIRMATION HANDLING ====================

  async confirmAction(confirmationId: string, confirmed: boolean): Promise<AssistantResponse> {
    // In a real implementation, this would track pending confirmations
    if (!confirmed) {
      return {
        success: true,
        message: 'Action cancelled.',
      }
    }

    // Execute the confirmed action
    // This would look up the pending action by confirmationId
    return {
      success: true,
      message: 'Action confirmed and executed!',
    }
  }

  // ==================== QUICK ACTIONS ====================

  async quickActions(): Promise<AssistantAction[]> {
    return [
      {
        type: 'shopify',
        action: 'getProducts',
        parameters: { limit: 10 },
      },
      {
        type: 'shopify',
        action: 'getOrders',
        parameters: { limit: 10 },
      },
      {
        type: 'portal',
        action: 'createSite',
        parameters: { template: 'alex-nextjs' },
        requiresConfirmation: true,
      },
      {
        type: 'system',
        action: 'showHelp',
        parameters: {},
      },
    ]
  }
}

// Singleton instance
let assistantInstance: AIAssistant | null = null

export function getAssistant(config?: AssistantConfig): AIAssistant {
  if (!assistantInstance && config) {
    assistantInstance = new AIAssistant(config)
  }
  
  if (!assistantInstance) {
    throw new Error('AI Assistant not initialized. Call initAssistant first.')
  }
  
  return assistantInstance
}

export function initAssistant(config: AssistantConfig): AIAssistant {
  assistantInstance = new AIAssistant(config)
  return assistantInstance
}

// Example usage:
/*
const assistant = initAssistant({
  shopify: {
    storeDomain: 'your-store.myshopify.com',
    adminAccessToken: 'shpat_...',
    storefrontAccessToken: '...',
    apiVersion: '2024-01',
  },
  printify: {
    apiKey: 'printify_api_key',
    shopId: 'your_shop_id',
  },
})

// Then you can:
assistant.processCommand('Show me my products')
assistant.processCommand('Create a new t-shirt')
assistant.processCommand('Get sales analytics')
*/

export default {
  AIAssistant,
  getAssistant,
  initAssistant,
}