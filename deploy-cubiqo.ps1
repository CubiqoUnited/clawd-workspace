# Deploy CubiQo Web Portal
Write-Host "🚀 Deploying CubiQo Web Portal..." -ForegroundColor Green

# Step 1: Check if we're in web-portal directory
$currentDir = Get-Location
if ($currentDir.Path -notlike "*web-portal") {
    Write-Host "📁 Changing to web-portal directory..." -ForegroundColor Yellow
    Set-Location "web-portal"
}

# Step 2: Install dependencies if needed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

# Step 3: Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Step 4: Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "Target: thecubiqo project" -ForegroundColor Cyan

# Check if .vercel exists and remove it
if (Test-Path ".vercel") {
    Write-Host "Removing existing .vercel link..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .vercel
}

# Deploy to thecubiqo project
Write-Host "Starting deployment..." -ForegroundColor Green
vercel --prod --yes

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host "Check: https://vercel.com/adityas-projects-261b17a9/thecubiqo" -ForegroundColor Cyan