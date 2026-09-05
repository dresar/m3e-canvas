Set-Location "c:\Users\NCN0C\Music\m3e-canvas\wedding-studio"
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  Memulai Claude Code CLI secara 100% OTONOM (Bypass Semua Pertanyaan)   " -ForegroundColor Green
Write-Host "=========================================================================" -ForegroundColor Cyan
Get-Content PROMPT_AUTONOMOUS_CLAUDE.txt -Raw | claude -p --dangerously-skip-permissions
