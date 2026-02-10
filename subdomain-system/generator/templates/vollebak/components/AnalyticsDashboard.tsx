'use client'

import { TrendingUp, Users, ShoppingBag, DollarSign, BarChart3, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const AnalyticsDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,580',
      change: '+24.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Active Users',
      value: '3,842',
      change: '+12.3%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+18.7%',
      icon: ShoppingBag,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ]

  const topProducts = [
    { name: 'Quantum Jacket', sales: 342, revenue: '$170,658' },
    { name: 'Solar Hoodie', sales: 287, revenue: '$85,713' },
    { name: 'Gravity Pants', sales: 198, revenue: '$69,102' },
    { name: 'Nebula Tee', sales: 156, revenue: '$20,124' },
  ]

  const trafficSources = [
    { source: 'Direct', percentage: 35, color: 'bg-vollebak-cyan' },
    { source: 'Social', percentage: 25, color: 'bg-vollebak-blue' },
    { source: 'Search', percentage: 20, color: 'bg-purple-500' },
    { source: 'Email', percentage: 15, color: 'bg-green-500' },
    { source: 'Referral', percentage: 5, color: 'bg-yellow-500' },
  ]

  return (
    <section className="py-20 bg-vollebak-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 mb-4"
          >
            <BarChart3 className="w-5 h-5 text-vollebak-cyan" />
            <span className="text-vollebak-cyan font-semibold">AI ANALYTICS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="block">Real-time Business</span>
            <span className="text-gradient">Intelligence</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-vollebak-light/70 max-w-3xl mx-auto"
          >
            AI-powered analytics dashboard showing real-time performance metrics,
            customer insights, and revenue tracking.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-vollebak-gray rounded-xl p-6 border border-vollebak-cyan/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-sm font-semibold ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-vollebak-light/60 text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-vollebak-gray rounded-xl p-6 border border-vollebak-cyan/10"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Target className="w-5 h-5 text-vollebak-cyan mr-2" />
              Top Performing Products
            </h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 hover:bg-vollebak-black/30 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-vollebak-black/50 rounded-lg mr-3">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-vollebak-light/60">{product.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{product.revenue}</div>
                    <div className="text-sm text-green-500">+{Math.floor(Math.random() * 20) + 10}%</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-vollebak-gray rounded-xl p-6 border border-vollebak-cyan/10"
          >
            <h3 className="text-xl font-bold mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{source.source}</span>
                    <span>{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-vollebak-black rounded-full overflow-hidden">
                    <div
                      className={`h-full ${source.color} rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI Insights */}
            <div className="mt-8 pt-6 border-t border-vollebak-gray">
              <h4 className="font-bold mb-3 flex items-center">
                <BarChart3 className="w-4 h-4 text-vollebak-cyan mr-2" />
                AI Insights
              </h4>
              <div className="text-sm text-vollebak-light/70 space-y-2">
                <p>• Quantum Jacket driving 42% of total revenue</p>
                <p>• Social media traffic increased by 35% this month</p>
                <p>• Conversion rate peak: 6.2% (Weekdays 2-4 PM)</p>
                <p>• Recommended: Increase ad spend on Instagram</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SEO Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-vollebak-gray to-vollebak-dark rounded-xl p-6 border border-vollebak-cyan/10"
        >
          <h3 className="text-xl font-bold mb-6">SEO Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Organic Traffic', value: '24.5K', change: '+18%' },
              { label: 'Keyword Rankings', value: '1.2K', change: '+32%' },
              { label: 'Backlinks', value: '856', change: '+15%' },
              { label: 'Page Speed', value: '92/100', change: '+8%' },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-vollebak-light/60 mb-1">{metric.label}</div>
                <div className="text-xs text-green-500 font-semibold">{metric.change}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-vollebak-light/70">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              AI SEO optimization active - generating 15% more organic traffic monthly
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsDashboard