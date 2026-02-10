# Fresh deployment of CubiQo Web Portal
Write-Host "🚀 Creating fresh deployment..." -ForegroundColor Green

# 1. Create fresh directory
$freshDir = "cubiqo-web-portal-fresh"
if (Test-Path $freshDir) {
    Remove-Item -Recurse -Force $freshDir
}

# Copy web-portal files
Write-Host "📁 Copying files..." -ForegroundColor Yellow
Copy-Item -Recurse "web-portal" -Destination $freshDir

# Remove problematic directories
$dirsToRemove = @(".next", "node_modules", ".vercel")
foreach ($dir in $dirsToRemove) {
    $path = "$freshDir\$dir"
    if (Test-Path $path) {
        Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
    }
}

# Create simple package.json with only what we need
$packageJson = @{
    name = "cubiqo-web-portal-fresh"
    version = "1.0.0"
    private = $true
    scripts = @{
        dev = "next dev"
        build = "next build"
        start = "next start"
        lint = "next lint"
    }
    dependencies = @{
        next = "^15.1.0"
        react = "^19.0.0"
        "react-dom" = "^19.0.0"
        "framer-motion" = "^12.0.0"
        "lucide-react" = "^0.469.0"
    }
    devDependencies = @{
        "@types/node" = "^22.10.5"
        "@types/react" = "^19.0.6"
        "@types/react-dom" = "^19.0.2"
        typescript = "^5.7.2"
        tailwindcss = "^3.4.17"
        autoprefixer = "^10.4.20"
        postcss = "^8.4.49"
    }
}

Set-Content "$freshDir\package.json" ($packageJson | ConvertTo-Json)

# Create minimal next.config.js
$nextConfig = @"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
"@

Set-Content "$freshDir\next.config.js" $nextConfig

# Create minimal tsconfig.json
$tsconfig = @"
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@

Set-Content "$freshDir\tsconfig.json" $tsconfig

Write-Host "✅ Fresh directory created: $freshDir" -ForegroundColor Green
Write-Host "Now deploying..." -ForegroundColor Cyan

# Deploy
Set-Location $freshDir
vercel --prod --yes --name "cubiqo-web-portal-fresh"

Write-Host "🎉 Fresh deployment complete!" -ForegroundColor Green