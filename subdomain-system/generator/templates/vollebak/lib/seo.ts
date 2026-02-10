// AI SEO Optimization System
// This handles automatic SEO optimization for the Vollebak template

import { NextSeo, NextSeoProps } from 'next-seo'

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export class AISEOOptimizer {
  private content: string
  private metadata: SEOData

  constructor(content: string, metadata: SEOData) {
    this.content = content
    this.metadata = metadata
  }

  // Analyze content and generate optimal SEO metadata
  analyzeAndOptimize(): SEOData {
    const wordCount = this.content.split(/\s+/).length
    const sentences = this.content.split(/[.!?]+/)
    const avgSentenceLength = this.content.length / sentences.length

    // AI-powered keyword extraction (simplified)
    const keywords = this.extractKeywords(this.content)
    
    // Generate optimal title (60-70 chars)
    let title = this.metadata.title
    if (title.length > 70) {
      title = title.substring(0, 67) + '...'
    } else if (title.length < 50) {
      // Add primary keyword if title is too short
      const primaryKeyword = keywords[0]
      if (primaryKeyword && !title.includes(primaryKeyword)) {
        title = `${title} | ${primaryKeyword}`
      }
    }

    // Generate optimal description (150-160 chars)
    let description = this.metadata.description
    if (description.length > 160) {
      description = description.substring(0, 157) + '...'
    } else if (description.length < 120) {
      // Enhance description with secondary keywords
      const secondaryKeywords = keywords.slice(1, 3).join(', ')
      if (secondaryKeywords) {
        description = `${description}. Features: ${secondaryKeywords}.`
      }
    }

    // Calculate SEO score
    const seoScore = this.calculateSEOScore(wordCount, avgSentenceLength, keywords.length)

    return {
      ...this.metadata,
      title,
      description,
      keywords: [...new Set([...this.metadata.keywords, ...keywords])].slice(0, 10),
      // Add AI-generated insights
      ...(seoScore < 70 && {
        aiRecommendations: this.generateRecommendations(wordCount, avgSentenceLength, keywords.length)
      })
    }
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction (in production, use NLP library)
    const words = text.toLowerCase().split(/\W+/)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])
    
    const wordFreq: Record<string, number> = {}
    words.forEach(word => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1
      }
    })

    // Sort by frequency and return top keywords
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word)
  }

  private calculateSEOScore(
    wordCount: number,
    avgSentenceLength: number,
    keywordCount: number
  ): number {
    let score = 100

    // Word count penalty/bonus
    if (wordCount < 300) score -= 20
    else if (wordCount > 1000) score -= 10
    else if (wordCount > 500) score += 10

    // Sentence length penalty
    if (avgSentenceLength > 25) score -= 15
    else if (avgSentenceLength < 10) score -= 10

    // Keyword density penalty/bonus
    if (keywordCount < 5) score -= 15
    else if (keywordCount > 20) score -= 10
    else if (keywordCount > 10) score += 10

    return Math.max(0, Math.min(100, score))
  }

  private generateRecommendations(
    wordCount: number,
    avgSentenceLength: number,
    keywordCount: number
  ): string[] {
    const recommendations: string[] = []

    if (wordCount < 300) {
      recommendations.push('Add more content (aim for 500+ words)')
    } else if (wordCount > 1500) {
      recommendations.push('Consider breaking content into multiple pages')
    }

    if (avgSentenceLength > 25) {
      recommendations.push('Use shorter sentences for better readability')
    } else if (avgSentenceLength < 10) {
      recommendations.push('Combine some short sentences for better flow')
    }

    if (keywordCount < 5) {
      recommendations.push('Include more relevant keywords naturally')
    } else if (keywordCount > 20) {
      recommendations.push('Reduce keyword density to avoid stuffing')
    }

    return recommendations
  }

  // Generate JSON-LD structured data
  generateStructuredData(type: 'Product' | 'Article' | 'Website' = 'Website'): any {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vollebak.com'
    
    switch (type) {
      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: this.metadata.title,
          description: this.metadata.description,
          image: this.metadata.image,
          url: `${baseUrl}${this.metadata.url || ''}`,
          brand: {
            '@type': 'Brand',
            name: 'Vollebak'
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '0.00', // Would be dynamic in production
            availability: 'https://schema.org/InStock'
          }
        }

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: this.metadata.title,
          description: this.metadata.description,
          image: this.metadata.image,
          datePublished: this.metadata.publishedTime,
          dateModified: this.metadata.modifiedTime,
          author: {
            '@type': 'Person',
            name: this.metadata.author || 'Vollebak'
          }
        }

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Vollebak',
          description: 'Premium futuristic clothing',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }
    }
  }

  // Generate sitemap entry
  generateSitemapEntry(): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vollebak.com'
    const url = `${baseUrl}${this.metadata.url || ''}`
    const lastmod = new Date().toISOString().split('T')[0]
    
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${this.metadata.url === '/' ? '1.0' : '0.8'}</priority>
      </url>
    `.trim()
  }
}

// Helper function to generate SEO config for NextSeo
export function generateSEOConfig(seoData: SEOData): NextSeoProps {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vollebak.com'
  const url = `${baseUrl}${seoData.url || ''}`
  
  return {
    title: seoData.title,
    description: seoData.description,
    canonical: url,
    openGraph: {
      type: seoData.type || 'website',
      url,
      title: seoData.title,
      description: seoData.description,
      images: seoData.image ? [
        {
          url: seoData.image,
          width: 1200,
          height: 630,
          alt: seoData.title,
        }
      ] : [],
      ...(seoData.publishedTime && { publishedTime: seoData.publishedTime }),
      ...(seoData.modifiedTime && { modifiedTime: seoData.modifiedTime }),
    },
    twitter: {
      handle: '@vollebak',
      site: '@vollebak',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: seoData.keywords.join(', '),
      },
      {
        name: 'author',
        content: seoData.author || 'Vollebak',
      },
    ],
  }
}

// AI-powered content optimization
export async function optimizeContentWithAI(content: string): Promise<string> {
  // In production, this would call an AI API (OpenAI, Claude, etc.)
  // For now, return enhanced content with basic improvements
  
  // Add headings if missing
  if (!content.includes('<h2') && !content.includes('##')) {
    const sentences = content.split(/[.!?]+/)
    if (sentences.length > 3) {
      content = `## ${sentences[0]}\n\n${content}`
    }
  }

  // Ensure keyword inclusion (simplified)
  const keywords = ['futuristic', 'clothing', 'technology', 'sustainable', 'premium']
  keywords.forEach(keyword => {
    if (!content.toLowerCase().includes(keyword)) {
      content += `\n\nOur ${keyword} apparel is designed for the future.`
    }
  })

  return content
}

export default {
  AISEOOptimizer,
  generateSEOConfig,
  optimizeContentWithAI,
}