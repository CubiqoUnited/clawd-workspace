Write-Host "Fixing and deploying CubiQo web portal..." -ForegroundColor Green

# Go to web-portal directory
Set-Location "web-portal"

# Remove any .vercel link to start fresh
if (Test-Path ".vercel") {
    Remove-Item -Recurse -Force ".vercel"
    Write-Host "Removed existing .vercel link" -ForegroundColor Yellow
}

# Deploy
Write-Host "Deploying..." -ForegroundColor Cyan
vercel --prod --yes

Write-Host "Deployment started!" -ForegroundColor Green