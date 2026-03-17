# Update all React components to Next.js
Write-Host "Starting component updates..." -ForegroundColor Yellow

# Get all JSX/JS files
$files = Get-ChildItem -Path ".\app\components" -Recurse -Include *.jsx, *.js

foreach ($file in $files) {
    Write-Host "Updating: $($file.Name)"
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Remove react-router imports
    $content = $content -replace 'import\s+\{[^}]*\}\s+from\s+["'']react-router-dom["'']', ''
    $content = $content -replace 'import\s+\{[^}]*\}\s+from\s+["'']react-router["'']', ''
    
    # Remove Outlet import (if present)
    $content = $content -replace "import.*Outlet.*from.*react-router-dom.*", ''
    
    # Add 'use client' directive if component uses hooks or event handlers
    if ($content -match 'useState|useEffect|useContext|onClick|onChange|onSubmit|useRef') {
        if (-not ($content -match "'use client'" -or $content -match '"use client"')) {
            $content = "'use client'
" + $content
        }
    }
    
    # Write back to file
    Set-Content $file.FullName $content -Encoding UTF8
}

Write-Host "Component updates complete!" -ForegroundColor Green
