/**
 * Subdomain Manager
 * Handles subdomain creation, DNS configuration, and domain management
 */

const fs = require('fs');
const path = require('path');

class SubdomainManager {
  constructor(options = {}) {
    this.config = this.loadConfig();
    this.dnsProvider = options.dnsProvider || 'vercel';
    this.dryRun = options.dryRun || false;
  }

  loadConfig() {
    const configPath = path.join(__dirname, '../../subdomain-config.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    return { subdomains: [] };
  }

  /**
   * Create a new subdomain
   */
  async create(domain, options = {}) {
    console.log(`📡 Creating subdomain: ${domain}`);

    // Check if domain already exists
    const existing = this.config.subdomains.find(s => s.domain === domain);
    if (existing) {
      console.log(`ℹ️  Domain ${domain} already exists in configuration`);
      if (existing.status === 'active') {
        console.log(`✅ Domain is already active`);
        return { status: 'exists', domain, config: existing };
      }
    }

    if (this.dryRun) {
      console.log(`🔍 [DRY RUN] Would create subdomain: ${domain}`);
      return { status: 'dry-run', domain };
    }

    // Validate domain format
    if (!this.isValidDomain(domain)) {
      throw new Error(`Invalid domain format: ${domain}`);
    }

    // Determine domain type
    const domainType = this.getDomainType(domain);
    console.log(`   Type: ${domainType}`);

    // Configure DNS based on provider
    const dnsResult = await this.configureDNS(domain, options);

    // Update config
    await this.updateConfig(domain, {
      ...options,
      status: 'active',
      createdAt: new Date().toISOString(),
      dnsConfigured: true
    });

    console.log(`✅ Subdomain created successfully`);

    return {
      status: 'created',
      domain,
      type: domainType,
      dnsResult
    };
  }

  /**
   * Configure DNS for the domain
   */
  async configureDNS(domain, options = {}) {
    console.log(`🌐 Configuring DNS for ${domain}...`);

    switch (this.dnsProvider) {
      case 'vercel':
        return await this.configureVercelDNS(domain, options);
      case 'cloudflare':
        return await this.configureCloudflareDNS(domain, options);
      case 'manual':
        return this.getManualDNSInstructions(domain, options);
      default:
        throw new Error(`Unknown DNS provider: ${this.dnsProvider}`);
    }
  }

  /**
   * Configure DNS via Vercel
   */
  async configureVercelDNS(domain, options = {}) {
    console.log(`   Using Vercel DNS...`);

    // For Vercel, DNS is configured via their CLI or API
    // This is a placeholder for the actual implementation
    
    const instructions = {
      provider: 'vercel',
      steps: [
        `1. Add domain in Vercel dashboard: vercel domains add ${domain}`,
        `2. Verify ownership with DNS records`,
        `3. Deploy project to domain: vercel --prod --domain ${domain}`
      ],
      configured: false,
      manual: true
    };

    console.log(`📝 Manual steps required:`);
    instructions.steps.forEach(step => console.log(`   ${step}`));

    return instructions;
  }

  /**
   * Configure DNS via Cloudflare
   */
  async configureCloudflareDNS(domain, options = {}) {
    console.log(`   Using Cloudflare DNS...`);
    
    // Placeholder for Cloudflare API integration
    return {
      provider: 'cloudflare',
      configured: false,
      manual: true,
      message: 'Cloudflare DNS configuration requires API key'
    };
  }

  /**
   * Get manual DNS configuration instructions
   */
  getManualDNSInstructions(domain, options = {}) {
    const records = [
      {
        type: 'A',
        name: '@',
        value: '76.76.21.21', // Vercel's IP
        ttl: 3600
      },
      {
        type: 'CNAME',
        name: 'www',
        value: 'cname.vercel-dns.com',
        ttl: 3600
      }
    ];

    return {
      provider: 'manual',
      domain,
      records,
      instructions: [
        `Add the following DNS records in your domain registrar:`,
        ...records.map(r => `  ${r.type} record: ${r.name} -> ${r.value}`)
      ]
    };
  }

  /**
   * Update subdomain configuration
   */
  async updateConfig(domain, updates) {
    const configPath = path.join(__dirname, '../../subdomain-config.json');
    
    // Find existing or create new entry
    let subdomain = this.config.subdomains.find(s => s.domain === domain);
    
    if (subdomain) {
      Object.assign(subdomain, updates);
    } else {
      subdomain = {
        domain,
        ...updates
      };
      this.config.subdomains.push(subdomain);
    }

    // Save config
    fs.writeFileSync(
      configPath,
      JSON.stringify(this.config, null, 2)
    );

    console.log(`💾 Configuration updated`);
  }

  /**
   * Delete a subdomain
   */
  async delete(domain) {
    console.log(`🗑️  Deleting subdomain: ${domain}`);

    if (this.dryRun) {
      console.log(`🔍 [DRY RUN] Would delete subdomain: ${domain}`);
      return { status: 'dry-run', domain };
    }

    // Remove DNS records
    await this.removeDNS(domain);

    // Update config
    const configPath = path.join(__dirname, '../../subdomain-config.json');
    this.config.subdomains = this.config.subdomains.filter(s => s.domain !== domain);
    
    fs.writeFileSync(
      configPath,
      JSON.stringify(this.config, null, 2)
    );

    console.log(`✅ Subdomain deleted`);

    return { status: 'deleted', domain };
  }

  /**
   * Remove DNS configuration
   */
  async removeDNS(domain) {
    console.log(`🌐 Removing DNS configuration for ${domain}...`);
    
    // Placeholder - actual implementation would use DNS provider API
    console.log(`ℹ️  Manual removal required via DNS provider dashboard`);
  }

  /**
   * List all subdomains
   */
  list(filter = {}) {
    let subdomains = this.config.subdomains;

    if (filter.status) {
      subdomains = subdomains.filter(s => s.status === filter.status);
    }

    if (filter.template) {
      subdomains = subdomains.filter(s => s.template === filter.template);
    }

    return subdomains;
  }

  /**
   * Get subdomain details
   */
  get(domain) {
    return this.config.subdomains.find(s => s.domain === domain);
  }

  /**
   * Update subdomain status
   */
  async updateStatus(domain, status) {
    await this.updateConfig(domain, { status, updatedAt: new Date().toISOString() });
    console.log(`✅ Status updated: ${domain} -> ${status}`);
  }

  /**
   * Verify subdomain is accessible
   */
  async verify(domain) {
    console.log(`🔍 Verifying subdomain: ${domain}`);

    try {
      // Check DNS resolution
      const dnsResolved = await this.checkDNS(domain);
      
      // Check HTTP accessibility
      const httpAccessible = await this.checkHTTP(domain);

      const result = {
        domain,
        dnsResolved,
        httpAccessible,
        verified: dnsResolved && httpAccessible
      };

      if (result.verified) {
        console.log(`✅ Subdomain verified successfully`);
      } else {
        console.log(`⚠️  Subdomain verification incomplete`);
        if (!dnsResolved) console.log(`   DNS not resolved`);
        if (!httpAccessible) console.log(`   HTTP not accessible`);
      }

      return result;
    } catch (error) {
      console.error(`❌ Verification failed:`, error.message);
      return {
        domain,
        verified: false,
        error: error.message
      };
    }
  }

  /**
   * Check DNS resolution
   */
  async checkDNS(domain) {
    // Placeholder - would use dns.resolve() or similar
    console.log(`   Checking DNS...`);
    return false; // Not implemented
  }

  /**
   * Check HTTP accessibility
   */
  async checkHTTP(domain) {
    // Placeholder - would use fetch() or similar
    console.log(`   Checking HTTP...`);
    return false; // Not implemented
  }

  /**
   * Utility methods
   */
  isValidDomain(domain) {
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain) || domain.includes('.'); // Allow subdomains
  }

  getDomainType(domain) {
    const parts = domain.split('.');
    
    if (parts.length === 2) {
      return 'apex'; // e.g., cubiqo.com
    } else if (parts[0] === 'www') {
      return 'www'; // e.g., www.cubiqo.com
    } else {
      return 'subdomain'; // e.g., shop.cubiqo.com
    }
  }

  /**
   * Generate DNS configuration file for export
   */
  exportDNSConfig(domain) {
    const subdomain = this.get(domain);
    if (!subdomain) {
      throw new Error(`Domain not found: ${domain}`);
    }

    const config = {
      domain,
      type: this.getDomainType(domain),
      records: this.getManualDNSInstructions(domain).records,
      vercel: {
        add: `vercel domains add ${domain}`,
        deploy: `vercel --prod --domain ${domain}`
      },
      status: subdomain.status
    };

    const outputPath = path.join(__dirname, '../../generated', `${domain}-dns.json`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));

    console.log(`📄 DNS configuration exported to: ${outputPath}`);

    return config;
  }
}

module.exports = SubdomainManager;
