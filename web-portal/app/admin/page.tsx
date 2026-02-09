'use client';

import { useState, useEffect } from 'react';
import {
  Globe,
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Eye,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  sites: {
    total: number;
    active: number;
    deploying: number;
  };
  analytics: {
    sessions: number;
    pageviews: number;
    activeUsers: number;
    bounceRate: number;
  };
  products: {
    total: number;
    inStock: number;
  };
  orders: {
    total: number;
    pending: number;
    fulfilled: number;
    revenue: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="spinner" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Sites',
      value: stats?.sites.total || 0,
      subtitle: `${stats?.sites.active || 0} active`,
      icon: Globe,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      href: '/admin/sites'
    },
    {
      title: 'Active Users',
      value: stats?.analytics.activeUsers || 0,
      subtitle: 'Right now',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      href: '/admin/analytics'
    },
    {
      title: 'Total Sessions',
      value: stats?.analytics.sessions || 0,
      subtitle: 'Last 7 days',
      icon: Eye,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      href: '/admin/analytics'
    },
    {
      title: 'Products',
      value: stats?.products.total || 0,
      subtitle: `${stats?.products.inStock || 0} in stock`,
      icon: Package,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      href: '/admin/products'
    },
    {
      title: 'Orders',
      value: stats?.orders.total || 0,
      subtitle: `${stats?.orders.pending || 0} pending`,
      icon: ShoppingCart,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      href: '/admin/orders'
    },
    {
      title: 'Revenue',
      value: `$${((stats?.orders.revenue || 0) / 100).toFixed(2)}`,
      subtitle: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      href: '/admin/orders'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-dark-400">
          Welcome to your CubiQo Web Portal. Here's what's happening across your sites.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="stat-card group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-dark-300 mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-dark-500">
                  {stat.subtitle}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/sites/new">
            <button className="btn btn-primary w-full">
              <Globe className="w-4 h-4" />
              Create New Site
            </button>
          </Link>
          <Link href="/admin/templates">
            <button className="btn btn-outline w-full">
              View Templates
            </button>
          </Link>
          <Link href="/admin/products/new">
            <button className="btn btn-outline w-full">
              Add Product
            </button>
          </Link>
          <Link href="/admin/analytics">
            <button className="btn btn-outline w-full">
              View Analytics
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sites */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Recent Sites
            </h2>
            <Link href="/admin/sites" className="text-sm text-primary-500 hover:text-primary-400">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
                  <div>
                    <div className="text-sm font-medium text-white">example{i}.cubiqo.ai</div>
                    <div className="text-xs text-dark-400">Created 2 hours ago</div>
                  </div>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-pink-500" />
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="text-sm text-primary-500 hover:text-primary-400">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white">#ORDER-{1000 + i}</div>
                  <div className="text-xs text-dark-400">customer{i}@example.com</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">$49.99</div>
                  <span className="badge badge-warning text-xs">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-white">Deployment Pipeline</span>
            </div>
            <span className="text-xs text-green-500 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-white">Analytics Tracking</span>
            </div>
            <span className="text-xs text-green-500 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-white">API Services</span>
            </div>
            <span className="text-xs text-green-500 font-medium">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
