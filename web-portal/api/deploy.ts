/**
 * Deployment API
 * 
 * Handles deployment to Vercel (or other providers),
 * build triggers, and deployment status tracking.
 */

import type { SiteConfig } from './subdomain';

// ============================================================================
// Types
// ============================================================================

export interface DeploymentRequest {
  siteId: string;
  branch?: string;
  environmentVariables?: Record<string, string>;
  force?: boolean;
}

export interface DeploymentResponse {
  deploymentId: string;
  url: string;
  status: 'queued' | 'building' | 'ready' | 'error' | 'canceled';
  buildLog?: string;
  error?: string;
}

export interface DeploymentStatus {
  id: string;
  siteId: string;
  status: 'queued' | 'building' | 'ready' | 'error' | 'canceled';
  url?: string;
  createdAt: string;
  readyAt?: string;
  buildTime?: number;
  error?: string;
}

// ============================================================================
// Vercel Deployment
// ============================================================================

export async function deployToVercel(
  siteConfig: SiteConfig,
  options: DeploymentRequest
): Promise<DeploymentResponse> {
  
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  if (!VERCEL_TOKEN) {
    return {
      deploymentId: '',
      url: '',
      status: 'error',
      error: 'VERCEL_TOKEN not configured'
    };
  }
  
  try {
    // 1. Create or get Vercel project
    const project = await ensureVercelProject(siteConfig);
    
    if (!project) {
      return {
        deploymentId: '',
        url: '',
        status: 'error',
        error: 'Failed to create Vercel project'
      };
    }
    
    // 2. Prepare deployment payload
    const deploymentPayload = {
      name: siteConfig.subdomain,
      project: project.id,
      target: 'production',
      gitSource: {
        type: 'github',
        repo: process.env.GITHUB_REPO || 'your-org/web-portal-sites',
        ref: options.branch || siteConfig.deployment.branch || 'main'
      },
      env: {
        NEXT_PUBLIC_SITE_ID: siteConfig.id,
        NEXT_PUBLIC_SITE_CONFIG: JSON.stringify(siteConfig),
        ...siteConfig.deployment.environmentVariables,
        ...options.environmentVariables
      },
      buildCommand: siteConfig.deployment.buildCommand,
      outputDirectory: siteConfig.deployment.outputDirectory,
      framework: 'nextjs'
    };
    
    // 3. Trigger deployment
    const headers: HeadersInit = {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    };
    
    if (VERCEL_TEAM_ID) {
      headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
    }
    
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers,
      body: JSON.stringify(deploymentPayload)
    });
    
    if (!response.ok) {
      const error = await response.json();
      return {
        deploymentId: '',
        url: '',
        status: 'error',
        error: `Vercel API error: ${error.error?.message || 'Unknown error'}`
      };
    }
    
    const deployment = await response.json();
    
    // 4. Configure domain
    await configureDomain(project.id, siteConfig.domain);
    
    return {
      deploymentId: deployment.id,
      url: deployment.url || `https://${siteConfig.domain}`,
      status: deployment.readyState || 'queued'
    };
    
  } catch (error: any) {
    return {
      deploymentId: '',
      url: '',
      status: 'error',
      error: error.message
    };
  }
}

async function ensureVercelProject(siteConfig: SiteConfig): Promise<any> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  // Check if project exists
  if (siteConfig.deployment.projectId) {
    const existing = await getVercelProject(siteConfig.deployment.projectId);
    if (existing) return existing;
  }
  
  // Create new project
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json'
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  const response = await fetch('https://api.vercel.com/v9/projects', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: siteConfig.subdomain,
      framework: 'nextjs',
      buildCommand: siteConfig.deployment.buildCommand,
      outputDirectory: siteConfig.deployment.outputDirectory,
      environmentVariables: Object.entries(siteConfig.deployment.environmentVariables || {}).map(
        ([key, value]) => ({
          key,
          value,
          type: 'encrypted',
          target: ['production', 'preview', 'development']
        })
      )
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to create Vercel project:', error);
    return null;
  }
  
  return await response.json();
}

async function getVercelProject(projectId: string): Promise<any> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}`,
    { headers }
  );
  
  if (!response.ok) return null;
  return await response.json();
}

async function configureDomain(projectId: string, domain: string): Promise<boolean> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json'
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  // Add domain to project
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/domains`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: domain,
        redirect: null,
        redirectStatusCode: null
      })
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to configure domain:', error);
    return false;
  }
  
  return true;
}

// ============================================================================
// Deployment Status
// ============================================================================

export async function getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus | null> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  if (!VERCEL_TOKEN) return null;
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  const response = await fetch(
    `https://api.vercel.com/v13/deployments/${deploymentId}`,
    { headers }
  );
  
  if (!response.ok) return null;
  
  const deployment = await response.json();
  
  return {
    id: deployment.id,
    siteId: deployment.meta?.siteId || '',
    status: deployment.readyState,
    url: deployment.url,
    createdAt: new Date(deployment.created).toISOString(),
    readyAt: deployment.ready ? new Date(deployment.ready).toISOString() : undefined,
    buildTime: deployment.buildingAt && deployment.ready 
      ? deployment.ready - deployment.buildingAt 
      : undefined,
    error: deployment.error?.message
  };
}

export async function getDeploymentLogs(deploymentId: string): Promise<string> {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  if (!VERCEL_TOKEN) return '';
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  const response = await fetch(
    `https://api.vercel.com/v2/deployments/${deploymentId}/events`,
    { headers }
  );
  
  if (!response.ok) return '';
  
  const events = await response.json();
  
  // Combine build logs
  return events
    .filter((e: any) => e.type === 'stdout' || e.type === 'stderr')
    .map((e: any) => e.payload.text)
    .join('\n');
}

// ============================================================================
// Template Generation
// ============================================================================

export async function generateSiteFromTemplate(
  siteConfig: SiteConfig,
  templatePath: string
): Promise<{ success: boolean; outputPath?: string; error?: string }> {
  
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    // 1. Copy template directory
    const templatesDir = path.join(__dirname, '../templates');
    const templateDir = path.join(templatesDir, siteConfig.template);
    const outputDir = path.join(__dirname, `../generated/${siteConfig.subdomain}`);
    
    // Check if template exists
    try {
      await fs.access(templateDir);
    } catch {
      return { 
        success: false, 
        error: `Template not found: ${siteConfig.template}` 
      };
    }
    
    // Copy template
    await fs.mkdir(outputDir, { recursive: true });
    await copyDirectory(templateDir, outputDir);
    
    // 2. Inject site configuration
    const configPath = path.join(outputDir, 'site-config.json');
    await fs.writeFile(configPath, JSON.stringify(siteConfig, null, 2));
    
    // 3. Update template variables
    await processTemplateFiles(outputDir, siteConfig);
    
    // 4. Create package.json if needed
    await ensurePackageJson(outputDir, siteConfig);
    
    return { 
      success: true, 
      outputPath: outputDir 
    };
    
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  const fs = require('fs').promises;
  const path = require('path');
  
  await fs.mkdir(dest, { recursive: true });
  
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function processTemplateFiles(dir: string, config: SiteConfig): Promise<void> {
  const fs = require('fs').promises;
  const path = require('path');
  
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processTemplateFiles(fullPath, config);
    } else if (entry.name.endsWith('.template') || entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      // Replace template variables
      let content = await fs.readFile(fullPath, 'utf-8');
      
      content = content
        .replace(/\{\{SITE_NAME\}\}/g, config.content.siteName || '')
        .replace(/\{\{SITE_TAGLINE\}\}/g, config.content.tagline || '')
        .replace(/\{\{SITE_DESCRIPTION\}\}/g, config.content.description || '')
        .replace(/\{\{PRIMARY_COLOR\}\}/g, config.appearance.primaryColor || '#F79009')
        .replace(/\{\{SECONDARY_COLOR\}\}/g, config.appearance.secondaryColor || '#2E90FA')
        .replace(/\{\{BG_COLOR\}\}/g, config.appearance.backgroundColor || '#000000')
        .replace(/\{\{DOMAIN\}\}/g, config.domain)
        .replace(/\{\{SITE_ID\}\}/g, config.id);
      
      await fs.writeFile(fullPath, content);
    }
  }
}

async function ensurePackageJson(dir: string, config: SiteConfig): Promise<void> {
  const fs = require('fs').promises;
  const path = require('path');
  
  const packagePath = path.join(dir, 'package.json');
  
  try {
    await fs.access(packagePath);
    // package.json exists
  } catch {
    // Create default package.json
    const packageJson = {
      name: config.subdomain,
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        'next': '^15.0.0',
        'react': '^19.0.0',
        'react-dom': '^19.0.0',
        '@vercel/analytics': '^1.1.0',
        '@vercel/speed-insights': '^1.0.0'
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        '@types/react': '^18.0.0',
        'typescript': '^5.0.0'
      }
    };
    
    await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
  }
}

// ============================================================================
// Quick Deploy (10-minute target)
// ============================================================================

export async function quickDeploy(
  subdomain: string,
  template: string,
  ownerId: string,
  ownerEmail: string
): Promise<DeploymentResponse> {
  
  const { createSubdomain } = await import('./subdomain');
  
  // 1. Create subdomain configuration (2 mins)
  const createResult = await createSubdomain({
    subdomain,
    template,
    config: {},
    ownerId,
    ownerEmail
  });
  
  if (createResult.errors && createResult.errors.length > 0) {
    return {
      deploymentId: '',
      url: '',
      status: 'error',
      error: createResult.errors.join(', ')
    };
  }
  
  // 2. Get site configuration
  const { getSubdomain } = await import('./subdomain');
  const siteConfig = await getSubdomain(createResult.siteId);
  
  if (!siteConfig) {
    return {
      deploymentId: '',
      url: '',
      status: 'error',
      error: 'Failed to retrieve site configuration'
    };
  }
  
  // 3. Generate site from template (3 mins)
  const generateResult = await generateSiteFromTemplate(siteConfig, template);
  
  if (!generateResult.success) {
    return {
      deploymentId: '',
      url: '',
      status: 'error',
      error: generateResult.error
    };
  }
  
  // 4. Deploy to Vercel (5 mins)
  const deployResult = await deployToVercel(siteConfig, {
    siteId: siteConfig.id
  });
  
  return deployResult;
}

// ============================================================================
// Rollback
// ============================================================================

export async function rollbackDeployment(
  siteId: string,
  targetDeploymentId: string
): Promise<{ success: boolean; error?: string }> {
  
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  
  if (!VERCEL_TOKEN) {
    return { success: false, error: 'VERCEL_TOKEN not configured' };
  }
  
  const { getSubdomain } = await import('./subdomain');
  const siteConfig = await getSubdomain(siteId);
  
  if (!siteConfig || !siteConfig.deployment.projectId) {
    return { success: false, error: 'Site not found or no project configured' };
  }
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json'
  };
  
  if (VERCEL_TEAM_ID) {
    headers['X-Vercel-Team-Id'] = VERCEL_TEAM_ID;
  }
  
  // Promote deployment to production
  const response = await fetch(
    `https://api.vercel.com/v13/deployments/${targetDeploymentId}/promote`,
    {
      method: 'POST',
      headers
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    return { 
      success: false, 
      error: `Failed to rollback: ${error.error?.message || 'Unknown error'}` 
    };
  }
  
  return { success: true };
}
