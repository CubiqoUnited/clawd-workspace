#!/usr/bin/env node
/**
 * Cubiqo Web Portal CLI
 * Command-line interface for managing subdomains and deployments
 */

const WebsiteGenerator = require('./generator/index');
const SubdomainManager = require('./manager/subdomain');
const VercelDeployManager = require('./manager/vercel-deploy');

const commands = {
  // Generation commands
  'generate': 'Generate a website from template',
  'generate-all': 'Generate all sites (filter by status/template)',
  
  // Subdomain commands
  'subdomain-create': 'Create a subdomain',
  'subdomain-list': 'List all subdomains',
  'subdomain-delete': 'Delete a subdomain',
  'subdomain-verify': 'Verify subdomain is accessible',
  
  // Deployment commands
  'deploy': 'Deploy a generated site to Vercel',
  'deploy-all': 'Deploy multiple sites',
  'deploy-list': 'List all deployments',
  'deploy-remove': 'Remove a deployment',
  
  // Combined commands
  'create-site': 'Generate + Deploy in one command',
  
  // Info commands
  'list': 'List configured domains',
  'info': 'Show domain information',
  'templates': 'List available templates',
  
  // Utility
  'help': 'Show this help message'
};

class WebPortalCLI {
  constructor() {
    this.generator = new WebsiteGenerator();
    this.subdomainManager = new SubdomainManager();
    this.deployManager = new VercelDeployManager();
  }

  async run(args) {
    const command = args[0];
    const options = this.parseArgs(args.slice(1));

    try {
      switch (command) {
        // Generation
        case 'generate':
          await this.generate(options);
          break;
        case 'generate-all':
          await this.generateAll(options);
          break;

        // Subdomain
        case 'subdomain-create':
          await this.createSubdomain(options);
          break;
        case 'subdomain-list':
          await this.listSubdomains(options);
          break;
        case 'subdomain-delete':
          await this.deleteSubdomain(options);
          break;
        case 'subdomain-verify':
          await this.verifySubdomain(options);
          break;

        // Deployment
        case 'deploy':
          await this.deploy(options);
          break;
        case 'deploy-all':
          await this.deployAll(options);
          break;
        case 'deploy-list':
          await this.deployList(options);
          break;
        case 'deploy-remove':
          await this.deployRemove(options);
          break;

        // Combined
        case 'create-site':
          await this.createSite(options);
          break;

        // Info
        case 'list':
          this.generator.listDomains(options);
          break;
        case 'info':
          await this.showInfo(options);
          break;
        case 'templates':
          this.listTemplates();
          break;

        // Help
        case 'help':
        case undefined:
          this.showHelp();
          break;

        default:
          console.error(`❌ Unknown command: ${command}`);
          console.log(`Run 'portal help' for usage information`);
          process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error:`, error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }

  parseArgs(args) {
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith('--')) {
        const key = args[i].slice(2);
        const value = args[i + 1] && !args[i + 1].startsWith('--') 
          ? args[i + 1] 
          : true;
        parsed[key] = value;
        if (value !== true) i++;
      }
    }
    return parsed;
  }

  // Generation commands
  async generate(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    console.log(`\n🏗️  Generating website for ${options.domain}...\n`);
    
    const result = await this.generator.generateWebsite(options.domain, options);
    
    console.log(`\n✅ Generation complete!`);
    console.log(`📁 Output directory: ${result.outputDir}`);
    console.log(`⏱️  Time: ${result.duration}s`);
  }

  async generateAll(options) {
    console.log(`\n🏗️  Generating multiple websites...\n`);
    
    const results = await this.generator.generateAll(options);
    
    const successful = results.filter(r => r.status !== 'failed').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    console.log(`\n📊 Generation Summary:`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📦 Total: ${results.length}`);
  }

  // Subdomain commands
  async createSubdomain(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    console.log(`\n🌐 Creating subdomain...\n`);
    
    const result = await this.subdomainManager.create(options.domain, options);
    
    console.log(`\n✅ Subdomain created!`);
    if (result.dnsResult && result.dnsResult.instructions) {
      console.log(`\n📝 Next steps:`);
      result.dnsResult.instructions.forEach(step => console.log(`   ${step}`));
    }
  }

  async listSubdomains(options) {
    console.log(`\n📋 Subdomains:\n`);
    
    const subdomains = this.subdomainManager.list(options);
    
    subdomains.forEach(s => {
      const statusIcon = s.status === 'active' ? '✅' : 
                        s.status === 'planned' ? '📋' : '⏸️';
      console.log(`${statusIcon} ${s.domain}`);
      console.log(`   Purpose: ${s.purpose}`);
      console.log(`   Status: ${s.status}`);
      if (s.redirect) {
        console.log(`   Redirects to: ${s.redirect}`);
      }
      console.log('');
    });

    console.log(`Total: ${subdomains.length}`);
  }

  async deleteSubdomain(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    if (!options.yes) {
      console.error(`❌ This will delete the subdomain. Use --yes to confirm.`);
      process.exit(1);
    }

    console.log(`\n🗑️  Deleting subdomain...\n`);
    
    await this.subdomainManager.delete(options.domain);
    
    console.log(`\n✅ Subdomain deleted!`);
  }

  async verifySubdomain(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    console.log(`\n🔍 Verifying subdomain...\n`);
    
    const result = await this.subdomainManager.verify(options.domain);
    
    console.log(`\nDomain: ${result.domain}`);
    console.log(`DNS Resolved: ${result.dnsResolved ? '✅' : '❌'}`);
    console.log(`HTTP Accessible: ${result.httpAccessible ? '✅' : '❌'}`);
    console.log(`Overall: ${result.verified ? '✅ Verified' : '⚠️  Not verified'}`);
  }

  // Deployment commands
  async deploy(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    const siteDir = options.dir || `generated/${options.domain}`;
    
    console.log(`\n🚀 Deploying to Vercel...\n`);
    
    const result = await this.deployManager.deploy(options.domain, siteDir, options);
    
    console.log(`\n✅ Deployment complete!`);
    console.log(`🌐 URL: ${result.url}`);
    if (result.customDomain) {
      console.log(`🔗 Custom Domain: https://${result.customDomain}`);
    }
  }

  async deployAll(options) {
    // Get all generated sites
    const fs = require('fs');
    const path = require('path');
    const generatedDir = path.join(__dirname, '../generated');
    
    if (!fs.existsSync(generatedDir)) {
      console.log(`No generated sites found in ${generatedDir}`);
      return;
    }

    const domains = fs.readdirSync(generatedDir).filter(f => {
      return fs.statSync(path.join(generatedDir, f)).isDirectory();
    });

    const sites = domains.map(domain => ({
      domain,
      siteDir: path.join(generatedDir, domain)
    }));

    console.log(`\n🚀 Deploying ${sites.length} sites...\n`);
    
    const results = await this.deployManager.deployMultiple(sites, {
      delay: options.delay ? parseInt(options.delay) : 2000
    });
    
    // Generate report
    const reportPath = path.join(__dirname, '../deployment-report.json');
    this.deployManager.generateReport(results, reportPath);
  }

  async deployList(options) {
    console.log(`\n📋 Deployments:\n`);
    await this.deployManager.list();
  }

  async deployRemove(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    if (!options.yes) {
      console.error(`❌ This will remove the deployment. Use --yes to confirm.`);
      process.exit(1);
    }

    console.log(`\n🗑️  Removing deployment...\n`);
    
    await this.deployManager.remove(options.domain);
    
    console.log(`\n✅ Deployment removed!`);
  }

  // Combined commands
  async createSite(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    console.log(`\n🎯 Creating complete site: ${options.domain}\n`);
    console.log(`This will:`);
    console.log(`  1. Generate website from template`);
    console.log(`  2. Create subdomain`);
    console.log(`  3. Deploy to Vercel\n`);

    // Step 1: Generate
    console.log(`📝 Step 1: Generating website...`);
    const genResult = await this.generator.generateWebsite(options.domain, options);
    console.log(`✅ Generated in ${genResult.duration}s\n`);

    // Step 2: Subdomain (already done by generator)
    console.log(`📝 Step 2: Subdomain configured\n`);

    // Step 3: Deploy
    if (!options.skipDeploy) {
      console.log(`📝 Step 3: Deploying...`);
      const deployResult = await this.deployManager.deploy(
        options.domain,
        genResult.outputDir,
        options
      );
      console.log(`✅ Deployed to ${deployResult.url}\n`);
    } else {
      console.log(`📝 Step 3: Skipped (--skip-deploy)\n`);
    }

    console.log(`\n🎉 Site creation complete!`);
    console.log(`📁 Files: ${genResult.outputDir}`);
    console.log(`🌐 Domain: ${options.domain}`);
  }

  // Info commands
  async showInfo(options) {
    if (!options.domain) {
      throw new Error('--domain is required');
    }

    const subdomain = this.subdomainManager.get(options.domain);
    
    if (!subdomain) {
      console.log(`❌ Domain not found: ${options.domain}`);
      return;
    }

    console.log(`\n📊 Domain Information:\n`);
    console.log(`Domain: ${subdomain.domain}`);
    console.log(`Purpose: ${subdomain.purpose}`);
    console.log(`Template: ${subdomain.template || 'N/A'}`);
    console.log(`Status: ${subdomain.status}`);
    console.log(`Type: ${this.subdomainManager.getDomainType(subdomain.domain)}`);
    
    if (subdomain.canonical) {
      console.log(`Canonical: Yes`);
    }
    if (subdomain.redirect) {
      console.log(`Redirects to: ${subdomain.redirect}`);
    }
    if (subdomain.createdAt) {
      console.log(`Created: ${subdomain.createdAt}`);
    }
    
    console.log('');
  }

  listTemplates() {
    const templates = this.generator.config.templates;
    
    console.log(`\n📦 Available Templates:\n`);
    
    Object.entries(templates).forEach(([key, template]) => {
      console.log(`${key}`);
      console.log(`  Name: ${template.name}`);
      console.log(`  Style: ${template.style}`);
      console.log(`  Features: ${template.features.join(', ')}`);
      console.log('');
    });
  }

  showHelp() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║              Cubiqo Web Portal CLI                           ║
║  Automated website generation and deployment system          ║
╚═══════════════════════════════════════════════════════════════╝

COMMANDS:

  Generation:
    generate --domain <domain>         Generate website from template
    generate-all [--status <status>]   Generate all configured sites

  Subdomain Management:
    subdomain-create --domain <domain> Create subdomain
    subdomain-list [--status <status>] List all subdomains
    subdomain-delete --domain <domain> Delete subdomain
    subdomain-verify --domain <domain> Verify subdomain

  Deployment:
    deploy --domain <domain>           Deploy to Vercel
    deploy-all [--delay <ms>]          Deploy all generated sites
    deploy-list                        List all deployments
    deploy-remove --domain <domain>    Remove deployment

  Combined:
    create-site --domain <domain>      Generate + Deploy (full flow)

  Information:
    list [--status <status>]           List configured domains
    info --domain <domain>             Show domain information
    templates                          List available templates
    help                              Show this help

OPTIONS:

  --domain <domain>     Target domain
  --template <name>     Override template
  --status <status>     Filter by status (active|planned|inactive)
  --dry-run            Simulate without making changes
  --yes                Skip confirmations
  --skip-deploy        Don't deploy (create-site only)
  --delay <ms>         Delay between operations
  --verbose            Show detailed output

EXAMPLES:

  # Generate a single site
  portal generate --domain www.cubiqo.shop

  # Generate all planned sites
  portal generate-all --status planned

  # Create complete site (generate + deploy)
  portal create-site --domain www.cubiqo.blog

  # List all active domains
  portal list --status active

  # Deploy a generated site
  portal deploy --domain www.cubiqo.shop

  # Show information about a domain
  portal info --domain www.cubiqo.shop

For more information, visit: https://github.com/cubiqo/web-portal
`);
  }
}

// Run CLI
if (require.main === module) {
  const cli = new WebPortalCLI();
  const args = process.argv.slice(2);
  
  cli.run(args).catch(error => {
    console.error(`\n❌ Fatal error:`, error.message);
    process.exit(1);
  });
}

module.exports = WebPortalCLI;
