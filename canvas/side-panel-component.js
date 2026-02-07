/**
 * RGY Side Panel Component
 * Reusable component for managing Red/Yellow/Green keyword zones
 * Can be integrated into any Cubiqo frontend
 */

class RGYSidePanel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    this.options = {
      storageKey: 'rgy-keywords',
      defaultKeywords: {
        red: ['dating', 'romance', 'nightlife'],
        yellow: ['friends', 'hangout', 'coffee', 'movies'],
        green: ['networking', 'freelance', 'IT development', 'wellness']
      },
      onKeywordAdd: null,
      onKeywordRemove: null,
      onKeywordsChange: null,
      ...options
    };

    this.keywords = { ...this.options.defaultKeywords };
    this.loadKeywords();
    this.render();
    this.attachEventListeners();
  }

  /**
   * Load keywords from storage
   */
  loadKeywords() {
    const saved = localStorage.getItem(this.options.storageKey);
    if (saved) {
      try {
        this.keywords = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load keywords:', e);
      }
    }
  }

  /**
   * Save keywords to storage
   */
  saveKeywords() {
    localStorage.setItem(this.options.storageKey, JSON.stringify(this.keywords));
    if (this.options.onKeywordsChange) {
      this.options.onKeywordsChange(this.keywords);
    }
  }

  /**
   * Get keywords for a specific color
   */
  getKeywords(color) {
    return this.keywords[color] || [];
  }

  /**
   * Get all keywords
   */
  getAllKeywords() {
    return { ...this.keywords };
  }

  /**
   * Add keyword to a color zone
   */
  addKeyword(color, keyword) {
    keyword = keyword.trim().toLowerCase();
    if (!keyword) return false;

    if (this.keywords[color].includes(keyword)) {
      return false;
    }

    this.keywords[color].push(keyword);
    this.saveKeywords();
    this.renderKeywords(color);

    if (this.options.onKeywordAdd) {
      this.options.onKeywordAdd(color, keyword);
    }

    return true;
  }

  /**
   * Remove keyword from a color zone
   */
  removeKeyword(color, keyword) {
    this.keywords[color] = this.keywords[color].filter(k => k !== keyword);
    this.saveKeywords();
    this.renderKeywords(color);

    if (this.options.onKeywordRemove) {
      this.options.onKeywordRemove(color, keyword);
    }
  }

  /**
   * Toggle zone expansion
   */
  toggleZone(color) {
    const body = this.container.querySelector(`#${color}-body`);
    const isExpanded = body.classList.contains('expanded');

    // Collapse all zones
    this.container.querySelectorAll('.zone-body').forEach(zone => {
      zone.classList.remove('expanded');
    });

    // Expand clicked zone if it wasn't already expanded
    if (!isExpanded) {
      body.classList.add('expanded');
    }
  }

  /**
   * Render keywords for a specific color zone
   */
  renderKeywords(color) {
    const container = this.container.querySelector(`#${color}-keywords`);
    if (!container) return;

    container.innerHTML = '';

    this.keywords[color].forEach(keyword => {
      const tag = document.createElement('div');
      tag.className = 'keyword-tag';
      tag.innerHTML = `
        <span>${keyword}</span>
        <span class="remove-btn" data-color="${color}" data-keyword="${keyword}">×</span>
      `;
      container.appendChild(tag);
    });
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Zone toggle events
    this.container.querySelectorAll('.zone-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const color = e.currentTarget.closest('.color-zone').dataset.color;
        this.toggleZone(color);
      });
    });

    // Add keyword button events
    this.container.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        const input = this.container.querySelector(`#${color}-input`);
        this.addKeyword(color, input.value);
        input.value = '';
      });
    });

    // Enter key events
    this.container.querySelectorAll('.keyword-input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const color = e.target.dataset.color;
          this.addKeyword(color, e.target.value);
          e.target.value = '';
        }
      });
    });

    // Remove keyword events (delegated)
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        const color = e.target.dataset.color;
        const keyword = e.target.dataset.keyword;
        this.removeKeyword(color, keyword);
      }
    });
  }

  /**
   * Render the complete panel
   */
  render() {
    this.container.innerHTML = `
      <div class="panel-header">
        <div class="panel-title">RGY Keywords Panel</div>
        <div class="panel-subtitle">Manage your color-coded preferences</div>
      </div>

      <div class="panel-content">
        ${this.renderZone('red', 'Red Zone', 'Dating, adult content, indulgence. Keywords here help with intimate and personal connections.')}
        ${this.renderZone('yellow', 'Yellow Zone', 'Social, friends, harmless platonic hangouts. Keywords for casual connections and fun activities.')}
        ${this.renderZone('green', 'Green Zone', 'Work, trade, wellness, achievement. Keywords for professional networking and personal growth.')}
      </div>

      <div class="panel-footer">
        <div class="disclaimers">
          <div class="disclaimer-item">Keywords are used to match you with relevant connections and content within the RGY chat system.</div>
          <div class="disclaimer-item">Your keywords are private and only used for matching purposes. They are not shared publicly.</div>
          <div class="disclaimer-item">Keywords automatically update when you navigate to RGY chats, based on your conversations with Cubiqo.</div>
          <div class="disclaimer-item">You can edit or remove keywords at any time. Changes take effect immediately.</div>
        </div>
      </div>
    `;

    // Render keywords for each zone
    ['red', 'yellow', 'green'].forEach(color => this.renderKeywords(color));

    // Expand first zone by default
    this.toggleZone('red');
  }

  /**
   * Render a single color zone
   */
  renderZone(color, title, description) {
    return `
      <div class="color-zone ${color}" data-color="${color}">
        <div class="zone-header">
          <div class="zone-label">
            <span class="color-indicator"></span>
            <span>${title}</span>
          </div>
          <span class="zone-toggle">▼</span>
        </div>
        <div class="zone-body" id="${color}-body">
          <div class="zone-description">${description}</div>
          <div class="keywords-container" id="${color}-keywords"></div>
          <div class="add-keyword-form">
            <input 
              type="text" 
              class="keyword-input" 
              id="${color}-input"
              data-color="${color}"
              placeholder="Add keyword..."
            />
            <button class="add-btn" data-color="${color}">Add</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Destroy the panel and clean up
   */
  destroy() {
    this.container.innerHTML = '';
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RGYSidePanel;
}
