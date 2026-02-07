/**
 * Subdomain Management API
 * 
 * Handles subdomain creation, validation, DNS configuration,
 * and deployment integration.
 */

import { z } from 'zod';
import Ajv from 'ajv';
import siteSchema from '../config/schema.json';

const ajv = new Ajv();
const validateSiteConfig = ajv.compile(siteSchema);

// ============================================================================
// Types
// ============================================================================

export interface SubdomainCreateRequest {
  subdomain: string;
  template: 'cubiqo-staging' | 'vollebak' | 'etsy-marketplace';
  config: Partial<SiteConfig>;
  ownerId: string;
  ownerEmail: string;
}

export interface SubdomainCreateResponse {
  siteId: string;
  domain: string;
  status: 'draft' | 'deploying' | 'active';
  deploymentUrl?: string;
  errors?: string[];
}

export interface SiteConfig {
  id: string;
  domain: string;
  subdomain: string;
  template: string;
  status: string;
  routing: any;
  appearance: any;
  content: any;
  seo: any;
  analytics: any;
  integrations: any;
  features: any;
  deployment: any;
  locale: any;
  permissions: any;
  metadata?: any;
}

// ============================================================================
// Subdomain Validation
// ============================================================================

const RESERVED_SUBDOMAINS = [
  'www', 'api', 'admin', 'dashboard', 'staging', 'dev', 'test',
  'mail', 'smtp', 'pop', 'imap', 'ftp', 'ssh', 'vpn',
  'blog', 'shop', 'store', 'portal', 'app',
  'support', 'help', 'docs', 'status',
  'cdn', 'static', 'assets', 'media', 'images'
];

export function validateSubdomain(subdomain: string): { valid: boolean; error?: string } {
  // Length check
  if (subdomain.length < 3 || subdomain.length > 63) {
    return { valid: false, error: 'Subdomain must be 3-63 characters long' };
  }

  // Pattern check: alphanumeric and hyphens only, no start/end hyphens
  const pattern = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/;
  if (!pattern.test(subdomain)) {
    return { 
      valid: false, 
      error: 'Subdomain can only contain lowercase letters, numbers, and hyphens (no start/end hyphens)' 
    };
  }

  // Reserved check
  if (RESERVED_SUBDOMAINS.includes(subdomain)) {
    return { valid: false, error: 'This subdomain is reserved' };
  }

  // No consecutive hyphens
  if (subdomain.includes('--')) {
    return { valid: false, error: 'Subdomain cannot contain consecutive hyphens' };
  }

  return { valid: true };
}

export async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
  // Check database for existing subdomains
  // TODO: Implement database query
  // For now, simulate with file check
  
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const sitesDir = path.join(__dirname, '../config/sites');
    const files = await fs.readdir(sitesDir);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const configPath = path.join(sitesDir, file);
        const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
        
        if (config.subdomain === subdomain) {
          return false; // Subdomain already exists
        }
      }
    }
    
    return true; // Available
  } catch (error) {
    console.error('Error checking subdomain availability:', error);
    return false; // Assume not available on error
  }
}

// ============================================================================
// DNS Configuration
// ============================================================================

export interface DNSRecord {
  type: 'A' | 'CNAME' | 'TXT';
  name: string;
  value: string;
  ttl?: number;
}

export async function configureDNS(
  subdomain: string,
  baseDomain: string = 'cubiqo.ai'
): Promise<{ success: boolean; records?: DNSRecord[]; error?: string }> {
  
  const domain = `${subdomain}.${baseDomain}`;
  
  // For Vercel deployment, we typically need:
  // 1. CNAME record pointing to Vercel's edge network
  // 2. TXT record for verification (if custom domain)
  
  const records: DNSRecord[] = [
    {
      type: 'CNAME',
      name: subdomain,
      value: 'cname.vercel-dns.com',
      ttl: 300
    }
  ];

  try {
    // TODO: Implement actual DNS provider API call
    // Options:
    // - Vercel DNS API
    // - Cloudflare API
    // - Route53 API
    // - Custom DNS provider
    
    // For now, return the records that need to be configured
    console.log(`DNS configuration needed for ${domain}:`, records);
    
    // Simulate API call to DNS provider
    const dnsConfigured = await configureDNSProvider(records, baseDomain);
    
    if (!dnsConfigured) {
      return { 
        success: false, 
        error: 'Failed to configure DNS records',
        records 
      };
    }
    
    return { success: true, records };
    
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message,
      records 
    };
  }
}

async function configureDNSProvider(records: DNSRecord[], baseDomain: string): Promise<boolean> {
  // This would integrate with your DNS provider's API
  // Example for Vercel DNS:
  
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  
  if (!VERCEL_TOKEN) {
    console.warn('VERCEL_TOKEN not set, skipping DNS configuration');
    return false;
  }
  
  // Vercel DNS API example:
  // POST https://api.vercel.com/v2/domains/{domain}/records
  
  try {
    for (const record of records) {
      const response = await fetch(
        `https://api.vercel.com/v2/domains/${baseDomain}/records`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${VERCEL_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: record.type,
            name: record.name,
            value: record.value,
            ttl: record.ttl || 300
          })
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        console.error('DNS record creation failed:', error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('DNS configuration error:', error);
    return false;
  }
}

// ============================================================================
// Site Configuration Generation
// ============================================================================

export function generateSiteConfig(
  subdomain: string,
  template: string,
  partialConfig: Partial<SiteConfig>,
  ownerId: string,
  ownerEmail: string
): SiteConfig {
  
  const siteId = generateUUID();
  const timestamp = new Date().toISOString();
  const domain = `${subdomain}.cubiqo.ai`;
  
  // Default configuration based on template
  const templateDefaults = getTemplateDefaults(template);
  
  // Merge with user-provided config
  const config: SiteConfig = {
    id: siteId,
    domain,
    subdomain,
    template,
    status: 'draft',
    createdAt: timestamp,
    updatedAt: timestamp,
    owner: {
      userId: ownerId,
      email: ownerEmail
    },
    routing: {
      path: '/',
      customDomain: null,
      redirects: [],
      canonicalUrl: `https://${domain}`,
      ...partialConfig.routing
    },
    appearance: {
      ...templateDefaults.appearance,
      ...partialConfig.appearance
    },
    content: {
      ...templateDefaults.content,
      ...partialConfig.content
    },
    seo: {
      ...templateDefaults.seo,
      ...partialConfig.seo
    },
    analytics: {
      googleAnalytics: '',
      googleTagManager: '',
      customEvents: true,
      vercelAnalytics: true,
      vercelSpeedInsights: true,
      ...partialConfig.analytics
    },
    integrations: {
      shopify: { enabled: false },
      printify: { enabled: false },
      googleSheets: { enabled: false },
      supabase: { enabled: false },
      ...partialConfig.integrations
    },
    features: {
      ...templateDefaults.features,
      ...partialConfig.features
    },
    deployment: {
      provider: 'vercel',
      branch: 'main',
      buildCommand: 'npm run build',
      outputDirectory: '.next',
      autoDeployOnPush: false,
      ...partialConfig.deployment
    },
    locale: {
      defaultLanguage: 'en',
      supportedLanguages: ['en'],
      timezone: 'America/New_York',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      ...partialConfig.locale
    },
    permissions: {
      public: true,
      passwordProtected: false,
      allowedUsers: [],
      requireAuth: false,
      ...partialConfig.permissions
    },
    metadata: partialConfig.metadata || {}
  };
  
  return config;
}

function getTemplateDefaults(template: string): Partial<SiteConfig> {
  const templates = {
    'cubiqo-staging': {
      appearance: {
        theme: 'dark',
        primaryColor: '#F79009',
        secondaryColor: '#2E90FA',
        backgroundColor: '#000000',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      content: {
        siteName: 'CubiQo',
        tagline: 'One Mind. Many Dimensions.',
        description: 'Emotional AI companion with persistent memory'
      },
      seo: {
        title: 'CubiQo - Emotional AI Companion',
        description: 'Experience AI in four emotional dimensions',
        robots: 'index,follow',
        sitemap: true
      },
      features: {
        voice: true,
        chat: true,
        ecommerce: false,
        blog: false,
        newsletter: false,
        contactForm: true,
        cuboidAnimation: true
      }
    },
    'vollebak': {
      appearance: {
        theme: 'dark',
        primaryColor: '#FFFFFF',
        secondaryColor: '#666666',
        backgroundColor: '#0A0A0A',
        fontFamily: 'Helvetica Neue, sans-serif'
      },
      content: {
        siteName: 'Store',
        tagline: 'Premium Products',
        description: 'Carefully curated products for modern living'
      },
      seo: {
        title: 'Premium Store',
        description: 'Shop premium products',
        robots: 'index,follow',
        sitemap: true
      },
      features: {
        voice: false,
        chat: false,
        ecommerce: true,
        blog: true,
        newsletter: true,
        contactForm: true,
        cuboidAnimation: false
      }
    },
    'etsy-marketplace': {
      appearance: {
        theme: 'light',
        primaryColor: '#F56400',
        secondaryColor: '#222222',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Graphik, sans-serif'
      },
      content: {
        siteName: 'Marketplace',
        tagline: 'Unique Products',
        description: 'Discover unique handmade and vintage items'
      },
      seo: {
        title: 'Online Marketplace',
        description: 'Shop unique products',
        robots: 'index,follow',
        sitemap: true
      },
      features: {
        voice: false,
        chat: true,
        ecommerce: true,
        blog: false,
        newsletter: true,
        contactForm: true,
        cuboidAnimation: false
      }
    }
  };
  
  return templates[template] || templates['cubiqo-staging'];
}

// ============================================================================
// Main Subdomain Creation Flow
// ============================================================================

export async function createSubdomain(
  request: SubdomainCreateRequest
): Promise<SubdomainCreateResponse> {
  
  const errors: string[] = [];
  
  // 1. Validate subdomain format
  const subdomainValidation = validateSubdomain(request.subdomain);
  if (!subdomainValidation.valid) {
    return {
      siteId: '',
      domain: '',
      status: 'draft',
      errors: [subdomainValidation.error!]
    };
  }
  
  // 2. Check availability
  const isAvailable = await checkSubdomainAvailability(request.subdomain);
  if (!isAvailable) {
    return {
      siteId: '',
      domain: '',
      status: 'draft',
      errors: ['Subdomain is already taken']
    };
  }
  
  // 3. Generate site configuration
  const siteConfig = generateSiteConfig(
    request.subdomain,
    request.template,
    request.config,
    request.ownerId,
    request.ownerEmail
  );
  
  // 4. Validate against schema
  const isValid = validateSiteConfig(siteConfig);
  if (!isValid) {
    return {
      siteId: siteConfig.id,
      domain: siteConfig.domain,
      status: 'draft',
      errors: validateSiteConfig.errors?.map(e => e.message) || ['Configuration validation failed']
    };
  }
  
  // 5. Save configuration
  const saved = await saveSiteConfig(siteConfig);
  if (!saved) {
    return {
      siteId: siteConfig.id,
      domain: siteConfig.domain,
      status: 'draft',
      errors: ['Failed to save site configuration']
    };
  }
  
  // 6. Configure DNS
  const dnsResult = await configureDNS(request.subdomain);
  if (!dnsResult.success) {
    errors.push(`DNS configuration warning: ${dnsResult.error}`);
    // Don't fail completely, DNS can be configured manually
  }
  
  return {
    siteId: siteConfig.id,
    domain: siteConfig.domain,
    status: 'draft',
    errors: errors.length > 0 ? errors : undefined
  };
}

async function saveSiteConfig(config: SiteConfig): Promise<boolean> {
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const sitesDir = path.join(__dirname, '../config/sites');
    await fs.mkdir(sitesDir, { recursive: true });
    
    const filename = `${config.subdomain}.json`;
    const filepath = path.join(sitesDir, filename);
    
    await fs.writeFile(filepath, JSON.stringify(config, null, 2), 'utf-8');
    
    console.log(`Site configuration saved: ${filepath}`);
    return true;
  } catch (error) {
    console.error('Error saving site configuration:', error);
    return false;
  }
}

// ============================================================================
// Utilities
// ============================================================================

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function listSubdomains(): Promise<SiteConfig[]> {
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const sitesDir = path.join(__dirname, '../config/sites');
    const files = await fs.readdir(sitesDir);
    
    const configs: SiteConfig[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const configPath = path.join(sitesDir, file);
        const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
        configs.push(config);
      }
    }
    
    return configs;
  } catch (error) {
    console.error('Error listing subdomains:', error);
    return [];
  }
}

export async function getSubdomain(subdomainOrId: string): Promise<SiteConfig | null> {
  const sites = await listSubdomains();
  return sites.find(s => s.subdomain === subdomainOrId || s.id === subdomainOrId) || null;
}

export async function updateSubdomain(
  siteId: string,
  updates: Partial<SiteConfig>
): Promise<{ success: boolean; error?: string }> {
  
  const site = await getSubdomain(siteId);
  if (!site) {
    return { success: false, error: 'Site not found' };
  }
  
  const updatedSite = {
    ...site,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  const isValid = validateSiteConfig(updatedSite);
  if (!isValid) {
    return { 
      success: false, 
      error: validateSiteConfig.errors?.map(e => e.message).join(', ') || 'Validation failed' 
    };
  }
  
  const saved = await saveSiteConfig(updatedSite);
  return { success: saved, error: saved ? undefined : 'Failed to save configuration' };
}

export async function deleteSubdomain(siteId: string): Promise<{ success: boolean; error?: string }> {
  const site = await getSubdomain(siteId);
  if (!site) {
    return { success: false, error: 'Site not found' };
  }
  
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const filepath = path.join(__dirname, '../config/sites', `${site.subdomain}.json`);
    await fs.unlink(filepath);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
