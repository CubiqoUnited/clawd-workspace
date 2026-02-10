# Deploy to thecubiqo project
Write-Host "Deploying to thecubiqo project..." -ForegroundColor Green

# Remove any existing .vercel link
if (Test-Path "web-portal/.vercel") {
    Remove-Item -Recurse -Force "web-portal/.vercel"
}

# Deploy
Set-Location "web-portal"
vercel --prod --yes

Write-Host "Check the output above for the deployment URL" -ForegroundColor Cyan