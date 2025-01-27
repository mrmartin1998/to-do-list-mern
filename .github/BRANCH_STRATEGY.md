# Branch Strategy

This repository follows a modified GitFlow workflow:

## Main Branches

- `master` - Production-ready code
- `develop` - Master development branch

## Supporting Branches

### Feature Branches
- Purpose: New features and non-emergency bug fixes
- Branch from: `develop`
- Merge into: `develop`
- Naming: `feature/descriptive-name`

### Bugfix Branches
- Purpose: Bug fixes
- Branch from: `develop`
- Merge into: `develop`
- Naming: `bugfix/descriptive-name`

### Release Branches
- Purpose: Release preparation
- Branch from: `develop`
- Merge into: `master` and `develop`
- Naming: `release/version-number`

## Branch Protection Rules

Set up these branch protection rules in GitHub:

1. `master` branch:
   - Require pull request reviews
   - Require status checks to pass
   - No direct pushes

2. `develop` branch:
   - Require pull request reviews
   - Require status checks to pass
   - No direct pushes

## Workflow

1. Create feature/bugfix branch from `develop`
2. Work on your changes
3. Create PR to merge into `develop`
4. After review and testing, merge into `develop`
5. Create release branch when ready
6. After final testing, merge release into `master` and `develop` 