'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, ShoppingCart, Package, Globe, BarChart3, X, ChevronRight, Sparkles } from 'lucide-react'
import { AIAssistant, initAssistant } from '@/lib/ai-assistant'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
  data?: any
  actions?: Array<{
    label: string
    action: string
    type: 'shopify' | 'printify' | 'portal' | 'system'
  }>
}

const AIAssistantComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you manage products, process orders, create sites, and more. What would you like to do?",
      sender: 'assistant',
      timestamp: new Date(),
      actions: [
        { label: 'Show Products', action: 'getProducts', type: 'shopify' },
        { label: 'View Orders', action: 'getOrders', type: 'shopify' },
        { label: 'Sales Analytics', action: 'getAnalytics', type: 'shopify' },
        { label: 'Create New Site', action: 'createSite', type: 'portal' },
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [assistant, setAssistant] = useState<AIAssistant | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize assistant
  useEffect(() => {
    // In production, this would load from environment variables
    const getConfig = () => {
      const config: any = {}
      
      // Load Shopify config
      try {
        const shopifyConfig = process.env.NEXT_PUBLIC_SHOPIFY_CONFIG
        if (shopifyConfig && shopifyConfig.trim() !== '') {
          config.shopify = JSON.parse(shopifyConfig)
        }
      } catch (error) {
        console.warn('Failed to parse Shopify config:', error)
      }
      
      // Load Printify config
      try {
        const printifyConfig = process.env.NEXT_PUBLIC_PRINTIFY_CONFIG
        if (printifyConfig && printifyConfig.trim() !== '') {
          config.printify = JSON.parse(printifyConfig)
        }
      } catch (error) {
        console.warn('Failed to parse Printify config:', error)
      }
      
      return config
    }

    try {
      const config = getConfig()
      const ai = initAssistant(config)
      setAssistant(ai)
    } catch (error) {
      console.error('Failed to initialize AI assistant:', error)
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !assistant) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await assistant.processCommand(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'assistant',
        timestamp: new Date(),
        data: response.data,
        actions: response.nextActions?.map(action => ({
          label: getActionLabel(action),
          action: action.action,
          type: action.type,
        })),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error.message}`,
        sender: 'assistant',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action: string, type: string) => {
    setInput(`${type} ${action}`)
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const getActionLabel = (action: any): string => {
    switch (action.action) {
      case 'getProducts': return 'Show Products'
      case 'createProduct': return 'Create Product'
      case 'getOrders': return 'View Orders'
      case 'processOrders': return 'Process Orders'
      case 'getAnalytics': return 'Sales Analytics'
      case 'createSite': return 'Create Site'
      case 'deploySite': return 'Deploy Site'
      case 'createDesign': return 'Create Design'
      default: return action.action
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'shopify': return <ShoppingCart className="w-4 h-4" />
      case 'printify': return <Package className="w-4 h-4" />
      case 'portal': return <Globe className="w-4 h-4" />
      case 'system': return <BarChart3 className="w-4 h-4" />
      default: return <ChevronRight className="w-4 h-4" />
    }
  }

  const quickActions = [
    { label: 'Show Products', action: 'getProducts', type: 'shopify', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'View Orders', action: 'getOrders', type: 'shopify', icon: <Package className="w-4 h-4" /> },
    { label: 'Sales Report', action: 'getAnalytics', type: 'shopify', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'New Site', action: 'createSite', type: 'portal', icon: <Globe className="w-4 h-4" /> },
  ]

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
      >
        <Bot className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </button>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-2xl h-[80vh] sm:h-[600px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white">AI Assistant</h2>
                  <p className="text-sm text-gray-400">I can help manage your e-commerce</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {/* Actions */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickAction(action.action, action.type)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {getActionIcon(action.type)}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Data Preview */}
                    {message.data && (
                      <div className="mt-3 p-3 bg-black/30 rounded-lg text-sm">
                        <div className="text-gray-400 text-xs mb-1">Data:</div>
                        <pre className="text-xs overflow-x-auto">
                          {JSON.stringify(message.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-none p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.action, action.type)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me to show products, process orders, create sites..."
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  disabled={isLoading || !assistant}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !assistant || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Status */}
              <div className="mt-2 text-xs text-gray-400">
                {!assistant ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>Configure API keys to enable full functionality</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Ready to assist</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistantComponent