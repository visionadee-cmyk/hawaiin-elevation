# Git Push Guide

Quick reference for pushing changes to the Hawaiin Elevation repository.

## Quick Push (One Command)

```powershell
git -C hawaiin-elevation add .; git -C hawaiin-elevation commit -m "fix: description"; git -C hawaiin-elevation push origin main
```

**Note:** Use `main` branch for all pushes. Vercel auto-deploys from `main`.

## Setup (One Time)

To avoid GitHub login prompts every time, use a Personal Access Token:

```powershell
# Set remote with token (replace YOUR_TOKEN with actual token)
git -C hawaiin-elevation remote set-url origin https://YOUR_TOKEN@github.com/hawaiin-elevation/Hawaiin-Elevation.git
```

**Get token:** https://github.com/settings/tokens → Generate new token (classic) → check `repo` scope

## Full Workflow

### 1. Check Status
```powershell
git -C hawaiin-elevation status
```

### 2. Add Changes
```powershell
git -C hawaiin-elevation add .
```

### 3. Commit
```powershell
git -C hawaiin-elevation commit -m "fix: description of change"
```

**Commit prefixes:**
- `feat:` - New feature
- `fix:` - Bug fix  
- `chore:` - Maintenance
- `docs:` - Documentation
- `refactor:` - Code refactoring

### 4. Push to Main
```powershell
git -C hawaiin-elevation push origin main
```

## Quick Commands Reference

```powershell
# Check status + log + branch
git -C hawaiin-elevation status; git -C hawaiin-elevation log --oneline -1; git -C hawaiin-elevation branch --show-current

# See unpushed commits
git -C hawaiin-elevation log --oneline origin/main..HEAD

# View file changes
git -C hawaiin-elevation diff filename

# Pull latest
git -C hawaiin-elevation pull origin main
```

## Repository Info

-- **Remote:** `https://github.com/hawaiin-elevation/Hawaiin-Elevation.git`
-- **Branch:** `main` (deploys to Vercel)
-- **Location:** `c:\Users\maushaz.MADIHAA\Desktop\Rettey\hawaiin_elevation\hawaiin-elevation`

## Troubleshooting

### "Not a git repository"
Always use `git -C business-watch` prefix (repo is in subdirectory).

### Authentication Prompt
If not using token: GitHub may ask for browser auth - click the link and approve.

**To avoid prompts:** See Setup section above to configure token authentication.

### Secret Scanning Block
If push is rejected due to secrets:
1. Visit the GitHub URL shown in error
2. Click "Allow secret" 
3. Push again

### Merge Conflicts
```powershell
git -C business-watch checkout main
git -C business-watch pull origin main
git -C business-watch merge your-branch --no-edit
git -C business-watch push origin main
```
