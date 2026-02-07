#!/usr/bin/env node
/**
 * Subdomain Website Generator
 * Generates complete websites from templates in ~10 minutes
 * Based on Alex's JSON configuration
 */

const fs = require('fs');
const path = require('path');
const TemplateEngine = require('./template-engine');
const SubdomainManager = require('../manager/subdomain');

class WebsiteGenerator {
  constructor(configPath = '../../subdomain-config.json') {
    this.config = this.loadConfig(configPath);
    this.templateEngine = new TemplateEngine(this.config.templates);
    this.subdomainManager = new SubdomainManager();
  }

  loadConfig(configPath) {
    const fullPath = path.join(__dirname, configPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Config file not found: ${fullPath}`);
    }
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }

  async generateWebsite(domain, options = {}) {
    console.log(`🚀 Starting website generation for ${domain}...`);
    const startTime = Date.now();

    // 1. Find subdomain config
    const subdomainConfig = this.config.subdomains.find(s => s.domain === domain);
    if (!subdomainConfig) {
      throw new Error(`Domain not found in config: ${domain}`);
    }

    console.log(`📋 Found config for ${domain}`);
    console.log(`   Purpose: ${subdomainConfig.purpose}`);
    console.log(`   Template: ${subdomainConfig.template || 'default'}`);

    // 2. Check if redirect
    if (subdomainConfig.redirect) {
      console.log(`🔀 This is a redirect to ${subdomainConfig.redirect}`);
      return this.generateRedirect(domain, subdomainConfig.redirect);
    }

    // 3. Get template
    const templateName = subdomainConfig.template || options.template || 'custom';
    const template = this.config.templates[templateName];
    
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    console.log(`📝 Using template: ${template.name}`);

    // 4. Generate site structure
    const siteData = {
      domain,
      purpose: subdomainConfig.purpose,
      template: templateName,
      templateConfig: template,
      generatedAt: new Date().toISOString(),
      ...options
    };

    // 5. Create directories
    const outputDir = path.join(__dirname, '../../generated', domain);
    this.createDirectoryStructure(outputDir, template);

    // 6. Generate HTML/CSS/JS
    await this.templateEngine.generate(templateName, siteData, outputDir);

    // 7. Generate assets
    await this.generateAssets(outputDir, siteData);

    // 8. Generate config files
    this.generateConfigFiles(outputDir, siteData);

    // 9. Create subdomain (if not dry-run)
    if (!options.dryRun) {
      await this.subdomainManager.create(domain, {
        type: subdomainConfig.canonical ? 'canonical' : 'alias',
        purpose: subdomainConfig.purpose
      });
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Website generated successfully in ${duration}s`);
    console.log(`📁 Output: ${outputDir}`);

    return {
      domain,
      outputDir,
      duration,
      template: templateName,
      status: 'generated'
    };
  }

  generateRedirect(fromDomain, toDomain) {
    console.log(`🔀 Generating redirect from ${fromDomain} to ${toDomain}`);
    
    const outputDir = path.join(__dirname, '../../generated', fromDomain);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const redirectHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=https://${toDomain}">
    <link rel="canonical" href="https://${toDomain}" />
    <title>Redirecting to ${toDomain}</title>
</head>
<body>
    <p>Redirecting to <a href="https://${toDomain}">${toDomain}</a>...</p>
    <script>
        window.location.href = "https://${toDomain}";
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(outputDir, 'index.html'), redirectHTML);
    
    return {
      domain: fromDomain,
      redirect: toDomain,
      outputDir,
      status: 'redirect'
    };
  }

  createDirectoryStructure(baseDir, template) {
    const dirs = [
      '',
      'css',
      'js',
      'images',
      'assets',
      'config'
    ];

    // Add template-specific directories
    if (template.features.includes('product-grid')) {
      dirs.push('products');
    }
    if (template.features.includes('post-grid')) {
      dirs.push('posts');
    }

    dirs.forEach(dir => {
      const fullPath = path.join(baseDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });

    console.log(`📁 Created directory structure at ${baseDir}`);
  }

  async generateAssets(outputDir, siteData) {
    // Generate favicon
    const faviconPath = path.join(outputDir, 'favicon.ico');
    // Placeholder - would generate actual favicon
    console.log(`🎨 Generating assets...`);
    
    // Generate manifest.json for PWA
    const manifest = {
      name: siteData.domain,
      short_name: siteData.domain.split('.')[0],
      description: siteData.purpose,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000"
    };
    
    fs.writeFileSync(
      path.join(outputDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  generateConfigFiles(outputDir, siteData) {
    // Generate deployment config
    const deployConfig = {
      domain: siteData.domain,
      template: siteData.template,
      generatedAt: siteData.generatedAt,
      canonical: siteData.canonical || false,
      analytics: {
        googleAnalytics: `UA-XXXXXXXX-X`, // Placeholder
        enabled: true
      },
      seo: {
        sitemap: true,
        robots: true
      }
    };

    fs.writeFileSync(
      path.join(outputDir, 'config', 'deploy.json'),
      JSON.stringify(deployConfig, null, 2)
    );

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://${siteData.domain}/sitemap.xml`;
    
    fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);

    console.log(`⚙️  Generated config files`);
  }

  async generateAll(filter = {}) {
    const { status = 'active', template } = filter;
    
    let subdomains = this.config.subdomains.filter(s => {
      if (status && s.status !== status) return false;
      if (template && s.template !== template) return false;
      return true;
    });

    console.log(`🏗️  Generating ${subdomains.length} websites...`);
    
    const results = [];
    for (const subdomain of subdomains) {
      try {
        const result = await this.generateWebsite(subdomain.domain);
        results.push(result);
      } catch (error) {
        console.error(`❌ Failed to generate ${subdomain.domain}:`, error.message);
        results.push({
          domain: subdomain.domain,
          status: 'failed',
          error: error.message
        });
      }
    }

    return results;
  }

  listDomains(filter = {}) {
    const { status, template } = filter;
    
    let subdomains = this.config.subdomains;
    
    if (status) {
      subdomains = subdomains.filter(s => s.status === status);
    }
    if (template) {
      subdomains = subdomains.filter(s => s.template === template);
    }

    console.log(`\n📊 Domains (${subdomains.length} total):\n`);
    
    subdomains.forEach(s => {
      const statusIcon = s.status === 'active' ? '✅' : 
                        s.status === 'planned' ? '📋' : '⏸️';
      console.log(`${statusIcon} ${s.domain}`);
      console.log(`   Purpose: ${s.purpose}`);
      console.log(`   Template: ${s.template || 'N/A'}`);
      console.log(`   Status: ${s.status}`);
      if (s.redirect) {
        console.log(`   Redirects to: ${s.redirect}`);
      }
      console.log('');
    });
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const generator = new WebsiteGenerator();

  const parseArgs = () => {
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
  };

  const options = parseArgs();

  (async () => {
    try {
      if (options.list) {
        generator.listDomains(options);
      } else if (options.domain) {
        await generator.generateWebsite(options.domain, options);
      } else if (options.all) {
        await generator.generateAll(options);
      } else {
        console.log(`
Subdomain Website Generator

Usage:
  node index.js --domain <domain> [options]
  node index.js --all [--status active|planned]
  node index.js --list [--status active|planned] [--template <name>]

Options:
  --domain <domain>     Generate website for specific domain
  --template <name>     Override template from config
  --dry-run            Generate without creating subdomain
  --all                Generate all domains
  --status <status>    Filter by status (active|planned|inactive)
  --list               List all configured domains

Examples:
  node index.js --domain cubiqo.shop
  node index.js --all --status planned
  node index.js --list --template etsy-marketplace
        `);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  })();
}

module.exports = WebsiteGenerator;
