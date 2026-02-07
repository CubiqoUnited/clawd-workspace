#!/usr/bin/env node
/**
 * Demo Script - Subdomain Creature System
 * Demonstrates the full capability of the system
 */

const WebsiteGenerator = require('./generator/index');
const SubdomainManager = require('./manager/subdomain');
const DeploymentPipeline = require('./deploy/pipeline');

async function runDemo() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║        🌐 Subdomain Creature System - Demo                     ║
║        Based on Alex's JSON Configuration                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);

  try {
    // Initialize components
    const generator = new WebsiteGenerator();
    const subdomainManager = new SubdomainManager();
    const pipeline = new DeploymentPipeline();

    console.log('\n📊 STEP 1: List Configured Domains\n');
    console.log('=' .repeat(60));
    generator.listDomains({ status: 'active' });

    console.log('\n📊 Domain Statistics:');
    const stats = subdomainManager.getStats();
    console.log(`   Total configured: ${generator.config.subdomains.length}`);
    console.log(`   Active: ${generator.config.subdomains.filter(s => s.status === 'active').length}`);
    console.log(`   Planned: ${generator.config.subdomains.filter(s => s.status === 'planned').length}`);
    console.log(`   Templates available: ${Object.keys(generator.config.templates).length}`);

    console.log('\n\n🎨 STEP 2: Available Templates\n');
    console.log('=' .repeat(60));
    Object.entries(generator.config.templates).forEach(([key, template]) => {
      console.log(`📝 ${key.padEnd(20)} - ${template.name}`);
      console.log(`   Style: ${template.style}`);
      console.log(`   Features: ${template.features.join(', ')}`);
      console.log('');
    });

    console.log('\n🚀 STEP 3: Generate Sample Website (Dry Run)\n');
    console.log('=' .repeat(60));
    
    // Pick a domain to demonstrate
    const demoConfig = generator.config.subdomains.find(s => 
      s.domain === 'www.cubiqo.shop' || s.template === 'etsy-marketplace'
    ) || generator.config.subdomains[0];

    console.log(`\nGenerating: ${demoConfig.domain}`);
    console.log(`Template: ${demoConfig.template}`);
    console.log(`Purpose: ${demoConfig.purpose}`);
    console.log('\nStarting generation...\n');

    const result = await generator.generateWebsite(demoConfig.domain, { 
      dryRun: true 
    });

    console.log('\n✅ Generation Result:');
    console.log(`   Domain: ${result.domain}`);
    console.log(`   Output: ${result.outputDir}`);
    console.log(`   Duration: ${result.duration}s`);
    console.log(`   Template: ${result.template}`);
    console.log(`   Status: ${result.status}`);

    console.log('\n\n📦 STEP 4: Check Generated Files\n');
    console.log('=' .repeat(60));
    
    const fs = require('fs');
    const path = require('path');
    
    const outputDir = result.outputDir;
    
    function listFiles(dir, indent = '') {
      if (!fs.existsSync(dir)) {
        console.log(`${indent}(Directory not found)`);
        return;
      }
      
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          console.log(`${indent}📁 ${item}/`);
          listFiles(fullPath, indent + '  ');
        } else {
          const size = (stats.size / 1024).toFixed(2);
          console.log(`${indent}📄 ${item} (${size} KB)`);
        }
      });
    }
    
    listFiles(outputDir);

    console.log('\n\n🔍 STEP 5: Preview Generated HTML\n');
    console.log('=' .repeat(60));
    
    const htmlPath = path.join(outputDir, 'index.html');
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const preview = html.substring(0, 500);
      console.log(preview + '...\n');
      console.log(`[Full file: ${htmlPath}]`);
    }

    console.log('\n\n📋 STEP 6: Web Portal Features\n');
    console.log('=' .repeat(60));
    
    const portalFeatures = generator.config.web_portal;
    console.log('Priority:', portalFeatures.priority);
    console.log('Story Points:', portalFeatures.story_points);
    console.log('\nScope:');
    Object.entries(portalFeatures.scope).forEach(([key, value]) => {
      console.log(`  ✅ ${key}: ${value}`);
    });
    
    console.log('\nMVP Features:');
    portalFeatures.mvp_features.forEach(feature => {
      console.log(`  🎯 ${feature}`);
    });

    console.log('\n\n🌐 STEP 7: Subdomain Management Demo\n');
    console.log('=' .repeat(60));
    
    console.log('\nSubdomain Manager Capabilities:');
    console.log('  ✅ Create subdomains');
    console.log('  ✅ CNAME records');
    console.log('  ✅ Redirects (301/302)');
    console.log('  ✅ DNS verification');
    console.log('  ✅ SSL certificates');
    console.log('  ✅ Bulk operations');
    
    console.log('\nCurrent Status:', stats);

    console.log('\n\n🚀 STEP 8: Deployment Pipeline Demo\n');
    console.log('=' .repeat(60));
    
    console.log('\nDeployment Steps:');
    console.log('  1. ✅ Pre-deployment checks');
    console.log('  2. ✅ Build assets (minify CSS/JS)');
    console.log('  3. ✅ Run tests (validation, responsiveness, accessibility)');
    console.log('  4. ✅ Deploy to hosting (Netlify/Vercel/S3)');
    console.log('  5. ✅ Configure DNS');
    console.log('  6. ✅ Setup SSL certificate');
    console.log('  7. ✅ Setup analytics (Google Analytics)');
    console.log('  8. ✅ Post-deployment validation');
    
    console.log('\nSupported Hosting Providers:');
    console.log('  • Netlify');
    console.log('  • Vercel');
    console.log('  • AWS S3');
    console.log('  • Static hosting');

    console.log('\n\n📊 STEP 9: System Summary\n');
    console.log('=' .repeat(60));
    
    console.log('\n✅ System Capabilities:');
    console.log('  • Generate websites in ~10 minutes');
    console.log('  • 8 pre-built templates');
    console.log('  • Automated subdomain creation');
    console.log('  • Full deployment pipeline');
    console.log('  • Multi-provider hosting');
    console.log('  • SEO optimization');
    console.log('  • Analytics integration');
    console.log('  • Shopify e-commerce support');
    
    console.log('\n📈 Configuration:');
    console.log(`  • Total domains: ${generator.config.subdomains.length}`);
    console.log(`  • Templates: ${Object.keys(generator.config.templates).length}`);
    console.log(`  • International TLDs: ${generator.config.international_subdomains.tlds.length}`);

    console.log('\n\n🎯 STEP 10: Quick Commands\n');
    console.log('=' .repeat(60));
    
    console.log('\nTo use this system:\n');
    console.log('  # List all domains');
    console.log('  npm run list\n');
    console.log('  # Generate a website');
    console.log('  npm run generate -- --domain cubiqo.shop\n');
    console.log('  # Deploy to production');
    console.log('  npm run deploy -- --domain cubiqo.shop\n');
    console.log('  # Generate all active sites');
    console.log('  npm run generate-all -- --status active\n');
    console.log('  # Deploy all active sites');
    console.log('  npm run deploy-all -- --status active\n');

    console.log('\n' + '='.repeat(60));
    console.log('\n✨ Demo Complete! ✨\n');
    console.log('The subdomain creature system is ready to use!');
    console.log('Check QUICKSTART.md for detailed instructions.\n');

  } catch (error) {
    console.error('\n❌ Demo Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run demo
if (require.main === module) {
  runDemo().catch(console.error);
}

module.exports = runDemo;
