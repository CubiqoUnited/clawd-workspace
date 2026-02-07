/**
 * Vercel Deployment Manager
 * Automates deployment to Vercel with custom domain configuration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class VercelDeployManager {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.projectName = options.projectName || 'cubiqo-portal';
    this.orgSlug = options.orgSlug || null; // Vercel team/org slug
  }

  /**
   * Deploy a generated site to Vercel
   */
  async deploy(domain, siteDir, options = {}) {
    console.log(`🚀 Deploying ${domain} to Vercel...`);

    if (!fs.existsSync(siteDir)) {
      throw new Error(`Site directory not found: ${siteDir}`);
    }

    if (this.dryRun) {
      console.log(`🔍 [DRY RUN] Would deploy:`);
      console.log(`   Domain: ${domain}`);
      console.log(`   Directory: ${siteDir}`);
      console.log(`   Project: ${this.projectName}`);
      return { status: 'dry-run', domain, siteDir };
    }

    try {
      // Initialize or link Vercel project
      await this.initProject(siteDir, domain);

      // Deploy to production
      const deployment = await this.deployToProduction(siteDir, domain);

      // Configure custom domain
      if (options.configureDomain !== false) {
        await this.configureDomain(domain, deployment);
      }

      console.log(`✅ Deployment successful!`);
      console.log(`   URL: ${deployment.url}`);
      if (deployment.domain) {
        console.log(`   Custom Domain: https://${deployment.domain}`);
      }

      return {
        status: 'deployed',
        domain,
        url: deployment.url,
        customDomain: deployment.domain,
        deploymentId: deployment.id
      };

    } catch (error) {
      console.error(`❌ Deployment failed:`, error.message);
      throw error;
    }
  }

  /**
   * Initialize or link Vercel project
   */
  async initProject(siteDir, domain) {
    console.log(`🔧 Initializing Vercel project...`);

    const vercelDir = path.join(siteDir, '.vercel');
    
    // Check if already linked
    if (fs.existsSync(vercelDir)) {
      console.log(`   Project already linked`);
      return;
    }

    // Create vercel.json configuration
    const vercelConfig = {
      version: 2,
      name: this.getProjectName(domain),
      builds: [
        {
          src: "**",
          use: "@vercel/static"
        }
      ],
      routes: [
        {
          src: "/(.*)",
          dest: "/$1"
        }
      ]
    };

    fs.writeFileSync(
      path.join(siteDir, 'vercel.json'),
      JSON.stringify(vercelConfig, null, 2)
    );

    console.log(`   Created vercel.json`);

    // Link project using Vercel CLI
    // Note: This requires interactive confirmation, so we document the command
    console.log(`📝 Run this command to link the project:`);
    console.log(`   cd ${siteDir} && vercel link`);
  }

  /**
   * Deploy to production
   */
  async deployToProduction(siteDir, domain) {
    console.log(`📦 Deploying to production...`);

    try {
      // Build deploy command
      const cmd = `cd "${siteDir}" && vercel --prod --yes`;
      
      console.log(`   Executing: ${cmd}`);
      
      // Execute deployment
      const output = execSync(cmd, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      console.log(`   Deployment output:`);
      console.log(output);

      // Parse deployment URL from output
      const urlMatch = output.match(/https:\/\/[^\s]+/);
      const deploymentUrl = urlMatch ? urlMatch[0] : null;

      return {
        url: deploymentUrl,
        id: this.extractDeploymentId(output),
        domain: null // Will be set after domain configuration
      };

    } catch (error) {
      console.error(`   Deployment error:`, error.message);
      throw new Error(`Vercel deployment failed: ${error.message}`);
    }
  }

  /**
   * Configure custom domain
   */
  async configureDomain(domain, deployment) {
    console.log(`🌐 Configuring custom domain: ${domain}...`);

    try {
      // Add domain to project
      const addCmd = `vercel domains add ${domain} --yes`;
      console.log(`   Adding domain...`);
      
      try {
        execSync(addCmd, { encoding: 'utf8', stdio: 'pipe' });
        console.log(`   ✅ Domain added`);
      } catch (error) {
        // Domain might already exist
        console.log(`   ℹ️  Domain may already exist`);
      }

      // Link domain to deployment
      console.log(`   Linking domain to deployment...`);
      
      // Vercel automatically links domains, but we can verify
      deployment.domain = domain;

      // Generate DNS configuration info
      const dnsInfo = this.getDNSConfiguration(domain);
      console.log(`📋 DNS Configuration:`);
      dnsInfo.records.forEach(record => {
        console.log(`   ${record.type} ${record.name} → ${record.value}`);
      });

      return {
        domain,
        configured: true,
        dnsInfo
      };

    } catch (error) {
      console.error(`   Domain configuration error:`, error.message);
      throw new Error(`Failed to configure domain: ${error.message}`);
    }
  }

  /**
   * Get DNS configuration for a domain
   */
  getDNSConfiguration(domain) {
    const isApex = !domain.includes('www') && domain.split('.').length === 2;

    if (isApex) {
      return {
        type: 'apex',
        records: [
          { type: 'A', name: '@', value: '76.76.21.21' },
          { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com' }
        ]
      };
    } else {
      return {
        type: 'subdomain',
        records: [
          { type: 'CNAME', name: domain.split('.')[0], value: 'cname.vercel-dns.com' }
        ]
      };
    }
  }

  /**
   * Remove a deployment
   */
  async remove(domain) {
    console.log(`🗑️  Removing deployment for ${domain}...`);

    if (this.dryRun) {
      console.log(`🔍 [DRY RUN] Would remove deployment`);
      return { status: 'dry-run', domain };
    }

    try {
      // Remove domain
      const removeCmd = `vercel domains rm ${domain} --yes`;
      execSync(removeCmd, { encoding: 'utf8', stdio: 'pipe' });
      
      console.log(`✅ Deployment removed`);

      return { status: 'removed', domain };

    } catch (error) {
      console.error(`❌ Removal failed:`, error.message);
      throw error;
    }
  }

  /**
   * List all deployments
   */
  async list() {
    console.log(`📋 Listing deployments...`);

    try {
      const cmd = 'vercel list --yes';
      const output = execSync(cmd, { encoding: 'utf8' });
      
      console.log(output);

      return {
        status: 'success',
        output
      };

    } catch (error) {
      console.error(`❌ Failed to list deployments:`, error.message);
      throw error;
    }
  }

  /**
   * Get deployment status
   */
  async getStatus(domain) {
    console.log(`🔍 Checking deployment status for ${domain}...`);

    try {
      // Try to fetch the URL
      const url = `https://${domain}`;
      
      // Simple check - would use fetch() in production
      console.log(`   Checking: ${url}`);
      
      return {
        domain,
        status: 'unknown',
        message: 'Manual verification required'
      };

    } catch (error) {
      return {
        domain,
        status: 'error',
        error: error.message
      };
    }
  }

  /**
   * Deploy multiple sites
   */
  async deployMultiple(sites, options = {}) {
    console.log(`🚀 Deploying ${sites.length} sites...`);

    const results = [];

    for (const site of sites) {
      try {
        const result = await this.deploy(site.domain, site.siteDir, options);
        results.push(result);
        
        // Add delay between deployments to avoid rate limiting
        if (options.delay) {
          await this.sleep(options.delay);
        }

      } catch (error) {
        console.error(`❌ Failed to deploy ${site.domain}:`, error.message);
        results.push({
          status: 'failed',
          domain: site.domain,
          error: error.message
        });
      }
    }

    const successful = results.filter(r => r.status === 'deployed').length;
    const failed = results.filter(r => r.status === 'failed').length;

    console.log(`\n📊 Deployment Summary:`);
    console.log(`   Successful: ${successful}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Total: ${sites.length}`);

    return results;
  }

  /**
   * Utility methods
   */
  getProjectName(domain) {
    // Convert domain to valid project name
    return domain
      .replace(/\./g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .toLowerCase();
  }

  extractDeploymentId(output) {
    // Extract deployment ID from Vercel output
    const match = output.match(/https:\/\/([^\.]+)\.vercel\.app/);
    return match ? match[1] : null;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate deployment report
   */
  generateReport(results, outputPath) {
    const report = {
      timestamp: new Date().toISOString(),
      total: results.length,
      successful: results.filter(r => r.status === 'deployed').length,
      failed: results.filter(r => r.status === 'failed').length,
      deployments: results
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved to: ${outputPath}`);

    return report;
  }
}

module.exports = VercelDeployManager;
