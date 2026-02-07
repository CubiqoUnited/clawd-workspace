/**
 * Template Engine
 * Processes templates and generates complete websites
 */

const fs = require('fs');
const path = require('path');

class TemplateEngine {
  constructor(templateConfig) {
    this.templateConfig = templateConfig;
    this.templatesDir = path.join(__dirname, 'templates');
  }

  /**
   * Generate a complete website from a template
   */
  async generate(templateName, siteData, outputDir) {
    console.log(`🎨 Generating website using ${templateName} template...`);

    const template = this.templateConfig[templateName];
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    const templateDir = path.join(this.templatesDir, templateName);
    
    // Check if template directory exists
    if (!fs.existsSync(templateDir)) {
      console.log(`⚠️  Template directory not found, creating from base...`);
      await this.createTemplateFromBase(templateName, template, templateDir);
    }

    // Process template files
    await this.processTemplate(templateDir, outputDir, siteData);

    // Generate additional files
    await this.generateSEOFiles(outputDir, siteData);
    await this.generateManifest(outputDir, siteData);

    console.log(`✅ Template processed successfully`);
  }

  /**
   * Create a new template from base template
   */
  async createTemplateFromBase(templateName, templateConfig, templateDir) {
    const baseDir = path.join(this.templatesDir, 'base');
    
    if (!fs.existsSync(baseDir)) {
      // Create base template if it doesn't exist
      await this.createBaseTemplate(baseDir);
    }

    // Copy base to new template directory
    fs.mkdirSync(templateDir, { recursive: true });
    this.copyRecursive(baseDir, templateDir);

    // Customize based on template config
    await this.customizeTemplate(templateDir, templateConfig);
  }

  /**
   * Create the base template
   */
  async createBaseTemplate(baseDir) {
    console.log(`📦 Creating base template...`);
    
    fs.mkdirSync(baseDir, { recursive: true });
    fs.mkdirSync(path.join(baseDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(baseDir, 'js'), { recursive: true });

    // Create base HTML
    const baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{description}}">
    <title>{{title}}</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="favicon.ico">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <header>
        <nav>
            <div class="logo">{{siteName}}</div>
            <ul class="nav-links">
                {{navLinks}}
            </ul>
        </nav>
    </header>

    <main>
        {{content}}
    </main>

    <footer>
        <div class="footer-content">
            <p>&copy; {{year}} {{siteName}}. All rights reserved.</p>
            {{footerLinks}}
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;

    // Create base CSS
    const baseCSS = `/* Base Styles */
:root {
    --primary-color: {{primaryColor}};
    --secondary-color: {{secondaryColor}};
    --background-color: {{backgroundColor}};
    --text-color: {{textColor}};
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

header {
    background-color: var(--primary-color);
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-links a:hover {
    opacity: 0.8;
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 2rem;
    min-height: 70vh;
}

footer {
    background-color: var(--primary-color);
    color: white;
    padding: 2rem;
    margin-top: 4rem;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    main {
        padding: 0 1rem;
    }
}`;

    // Create base JS
    const baseJS = `// Base JavaScript
console.log('Site loaded successfully');

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle (if needed)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
}`;

    fs.writeFileSync(path.join(baseDir, 'index.html'), baseHTML);
    fs.writeFileSync(path.join(baseDir, 'css', 'styles.css'), baseCSS);
    fs.writeFileSync(path.join(baseDir, 'js', 'main.js'), baseJS);

    console.log(`✅ Base template created`);
  }

  /**
   * Customize template based on config
   */
  async customizeTemplate(templateDir, templateConfig) {
    // Read template files
    const htmlPath = path.join(templateDir, 'index.html');
    const cssPath = path.join(templateDir, 'css', 'styles.css');

    let html = fs.readFileSync(htmlPath, 'utf8');
    let css = fs.readFileSync(cssPath, 'utf8');

    // Add template-specific features
    if (templateConfig.features.includes('product-grid')) {
      html = this.addProductGrid(html);
      css += this.getProductGridCSS();
    }

    if (templateConfig.features.includes('shopping-cart')) {
      html = this.addShoppingCart(html);
      css += this.getShoppingCartCSS();
    }

    if (templateConfig.features.includes('scroll-animations')) {
      html = this.addScrollAnimations(html);
      css += this.getScrollAnimationCSS();
    }

    // Write back modified files
    fs.writeFileSync(htmlPath, html);
    fs.writeFileSync(cssPath, css);
  }

  /**
   * Process template and replace variables
   */
  async processTemplate(templateDir, outputDir, siteData) {
    const files = this.getAllFiles(templateDir);

    for (const file of files) {
      const relativePath = path.relative(templateDir, file);
      const outputPath = path.join(outputDir, relativePath);
      
      // Ensure output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      if (this.isTextFile(file)) {
        // Process text files (HTML, CSS, JS)
        let content = fs.readFileSync(file, 'utf8');
        content = this.replaceVariables(content, siteData);
        fs.writeFileSync(outputPath, content);
      } else {
        // Copy binary files as-is
        fs.copyFileSync(file, outputPath);
      }
    }

    // Add template-specific enhancements
    await this.addTemplateEnhancements(outputDir, siteData);
  }

  /**
   * Add template-specific enhancements (products.js, etc)
   */
  async addTemplateEnhancements(outputDir, siteData) {
    const template = siteData.template;
    
    // For marketplace templates, add product functionality
    if (template === 'etsy-marketplace' || siteData.templateConfig.features.includes('product-grid')) {
      const productsJsSource = path.join(this.templatesDir, 'base', 'js', 'products.js');
      const productsCssSource = path.join(this.templatesDir, 'base', 'css', 'products.css');
      
      if (fs.existsSync(productsJsSource)) {
        fs.copyFileSync(productsJsSource, path.join(outputDir, 'js', 'products.js'));
        
        // Add script tag to HTML
        const htmlPath = path.join(outputDir, 'index.html');
        if (fs.existsSync(htmlPath)) {
          let html = fs.readFileSync(htmlPath, 'utf8');
          if (!html.includes('products.js')) {
            html = html.replace('</body>', '    <script src="js/products.js"></script>\n</body>');
            fs.writeFileSync(htmlPath, html);
          }
        }
      }

      if (fs.existsSync(productsCssSource)) {
        fs.copyFileSync(productsCssSource, path.join(outputDir, 'css', 'products.css'));
        
        // Add link tag to HTML
        const htmlPath = path.join(outputDir, 'index.html');
        if (fs.existsSync(htmlPath)) {
          let html = fs.readFileSync(htmlPath, 'utf8');
          if (!html.includes('products.css')) {
            html = html.replace('</head>', '    <link rel="stylesheet" href="css/products.css">\n</head>');
            fs.writeFileSync(htmlPath, html);
          }
        }
      }
    }
  }

  /**
   * Replace template variables with actual data
   */
  replaceVariables(content, data) {
    const variables = {
      title: data.domain || 'New Site',
      siteName: this.getDomainName(data.domain),
      description: data.purpose || 'Welcome to our website',
      year: new Date().getFullYear(),
      domain: data.domain,
      primaryColor: data.primaryColor || '#000000',
      secondaryColor: data.secondaryColor || '#333333',
      backgroundColor: data.backgroundColor || '#ffffff',
      textColor: data.textColor || '#333333',
      navLinks: this.generateNavLinks(data),
      footerLinks: this.generateFooterLinks(data),
      content: this.generateContent(data)
    };

    let result = content;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }

    return result;
  }

  /**
   * Extract domain name from full domain
   */
  getDomainName(domain) {
    if (!domain) return 'Site';
    const parts = domain.split('.');
    return parts[0].replace('www', '').replace(/^\./, '') || parts[1] || domain;
  }

  /**
   * Generate navigation links
   */
  generateNavLinks(data) {
    const defaultLinks = [
      { href: '/', text: 'Home' },
      { href: '#about', text: 'About' },
      { href: '#contact', text: 'Contact' }
    ];

    const links = data.navLinks || defaultLinks;
    return links.map(link => 
      `<li><a href="${link.href}">${link.text}</a></li>`
    ).join('\n                ');
  }

  /**
   * Generate footer links
   */
  generateFooterLinks(data) {
    return `<div class="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact</a>
    </div>`;
  }

  /**
   * Generate main content based on template
   */
  generateContent(data) {
    const template = data.template || 'custom';
    
    switch (template) {
      case 'etsy-marketplace':
        return this.getMarketplaceContent();
      case 'cubiqo-rolldown':
        return this.getRolldownContent();
      case 'content-blog':
        return this.getBlogContent();
      case 'team-page':
        return this.getTeamContent();
      case 'contact-form':
        return this.getContactContent();
      default:
        return this.getDefaultContent(data);
    }
  }

  /**
   * Template-specific content generators
   */
  getMarketplaceContent() {
    return `
        <section class="hero">
            <h1>Shop Our Collection</h1>
            <p>Discover unique products</p>
        </section>
        
        <section class="products">
            <div class="product-grid" id="productGrid">
                <!-- Products will be loaded here -->
            </div>
        </section>`;
  }

  getRolldownContent() {
    return `
        <section class="hero-section">
            <h1>Welcome to Our Product</h1>
            <p>Revolutionary technology for modern needs</p>
            <button class="cta-button">Learn More</button>
        </section>
        
        <section class="features">
            <div class="feature">
                <h3>Feature 1</h3>
                <p>Description of feature 1</p>
            </div>
            <div class="feature">
                <h3>Feature 2</h3>
                <p>Description of feature 2</p>
            </div>
            <div class="feature">
                <h3>Feature 3</h3>
                <p>Description of feature 3</p>
            </div>
        </section>`;
  }

  getBlogContent() {
    return `
        <section class="blog">
            <h1>Latest Articles</h1>
            <div class="post-grid">
                <!-- Blog posts will be loaded here -->
            </div>
        </section>`;
  }

  getTeamContent() {
    return `
        <section class="team">
            <h1>Our Team</h1>
            <div class="team-grid">
                <!-- Team members will be loaded here -->
            </div>
        </section>`;
  }

  getContactContent() {
    return `
        <section class="contact">
            <h1>Get in Touch</h1>
            <form id="contactForm">
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </section>`;
  }

  getDefaultContent(data) {
    return `
        <section class="hero">
            <h1>${this.getDomainName(data.domain)}</h1>
            <p>${data.purpose || 'Welcome to our website'}</p>
        </section>`;
  }

  /**
   * Feature-specific HTML additions
   */
  addProductGrid(html) {
    // Product grid is added via content generation
    return html;
  }

  addShoppingCart(html) {
    const cartHTML = `
    <div id="cart" class="cart">
        <button class="cart-toggle">
            🛒 <span class="cart-count">0</span>
        </button>
        <div class="cart-dropdown">
            <h3>Shopping Cart</h3>
            <div class="cart-items"></div>
            <div class="cart-total">Total: $0.00</div>
            <button class="checkout-btn">Checkout</button>
        </div>
    </div>`;
    
    return html.replace('</header>', `${cartHTML}\n    </header>`);
  }

  addScrollAnimations(html) {
    return html;
  }

  /**
   * Feature-specific CSS
   */
  getProductGridCSS() {
    return `
/* Product Grid */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.product-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.product-info {
    padding: 1rem;
}

.product-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
}
`;
  }

  getShoppingCartCSS() {
    return `
/* Shopping Cart */
.cart {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.cart-toggle {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.2rem;
}

.cart-count {
    background: red;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
}

.cart-dropdown {
    display: none;
    position: absolute;
    top: 60px;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.cart.active .cart-dropdown {
    display: block;
}
`;
  }

  getScrollAnimationCSS() {
    return `
/* Scroll Animations */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
`;
  }

  /**
   * Generate SEO files
   */
  async generateSEOFiles(outputDir, siteData) {
    // Generate sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://${siteData.domain}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>1.0</priority>
    </url>
</urlset>`;

    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);

    // robots.txt is generated by the main generator
  }

  /**
   * Generate PWA manifest
   */
  async generateManifest(outputDir, siteData) {
    const manifest = {
      name: siteData.domain,
      short_name: this.getDomainName(siteData.domain),
      description: siteData.purpose || '',
      start_url: "/",
      display: "standalone",
      background_color: siteData.backgroundColor || "#ffffff",
      theme_color: siteData.primaryColor || "#000000",
      icons: []
    };

    fs.writeFileSync(
      path.join(outputDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  /**
   * Utility methods
   */
  getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        this.getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }

  isTextFile(filePath) {
    const textExtensions = ['.html', '.css', '.js', '.json', '.txt', '.md', '.svg', '.xml'];
    return textExtensions.some(ext => filePath.endsWith(ext));
  }

  copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      const files = fs.readdirSync(src);
      files.forEach(file => {
        this.copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

module.exports = TemplateEngine;
