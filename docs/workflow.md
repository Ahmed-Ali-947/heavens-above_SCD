# Workflow Overview – Heavens Above Automation

## Continuous Integration (CI)
- **File:** `.github/workflows/ci.yml`
- **Trigger:** On every push or pull request to `main`.
- **Purpose:** Runs linting, unit tests, and reports errors early.
- **Evidence:** GitHub Actions log with test pass/fail status.

## Continuous Deployment (CD)
- **File:** `.github/workflows/deploy.yml`
- **Trigger:** On every successful push to `main`.
- **Purpose:** Deploys the app automatically to **Vercel**.
- **Secrets Used:** `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`.

## Scheduled Maintenance
- **File:** `.github/workflows/scheduled-tasks.yml`
- **Trigger:** Runs daily using cron (`0 0 * * *`).
- **Purpose:** Performs cleanup and writes logs automatically.
- **Output:** `logs/maintenance.log` uploaded as artifact.

## Dependency Updates
- **File:** `.github/dependabot.yml`
- **Trigger:** Weekly on Sundays.
- **Purpose:** Creates PRs for outdated dependencies and runs CI to verify.
- **Tool:** GitHub Dependabot.

## Code Review Workflow
- **File:** `.github/workflows/code-review.yml`
- **Trigger:** On pull requests to main.
- **Purpose:** Checks coding standards (ESLint) and scans security vulnerabilities (CodeQL).
- **Integration:** Optional Reviewdog PR feedback.
- **Result:** Enforced PR checks before merging.

## Documentation Deployment
- **File:** `.github/workflows/documentation.yml`
- **Trigger:** When Markdown docs are updated (`docs/**` or `README.md`).
- **Purpose:** Builds documentation using MkDocs and deploys to GitHub Pages.
- **URL:**  