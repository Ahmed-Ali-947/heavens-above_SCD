# User Manual — Heavens Above Automation Project

## Overview

The **Heavens Above Automation Project** demonstrates GitHub Actions automations for the software lifecycle:
- Continuous Integration (tests + lint)
- Continuous Deployment (Vercel)
- Scheduled maintenance tasks
- Automated dependency updates (Dependabot)
- Code review and security scanning (ESLint + CodeQL)
- Documentation build & deployment (MkDocs → GitHub Pages)

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/heavens-above_SCD.git
cd heavens-above_SCD
``` 

### 2. Install dependencies
```bash
npm install
```

### 3. Run tests and lint
```bash
npm test
npm run lint
```

### 4. Run the application (if applicable)

If the project has an entry point, start it with:
```bash
node src/app.js
```

---

## Documentation
### Local preview (MkDocs)

If you have Python and MkDocs installed:
```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

Open http://127.0.0.1:8000 to preview.

### Live site

Documentation is published to GitHub Pages automatically. Visit:
```arduino
https://<your-username>.github.io/heavens-above_SCD/
```

## Workflows (quick summary)

CI: .github/workflows/ci.yml
Runs on push and pull_request to main. Executes npm ci, npm run lint, and npm test.

CD (Vercel): .github/workflows/deploy.yml
Deploys to Vercel on pushes to main using secrets: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID.

Scheduled tasks: .github/workflows/scheduled-tasks.yml
Runs a maintenance script daily and uploads logs as artifacts.

Dependabot: .github/dependabot.yml
Schedules dependency checks weekly and opens PRs for updates.

Code review: .github/workflows/code-review.yml
Runs ESLint, CodeQL, and optional Reviewdog on PRs for inline feedback and security scanning.

Docs: .github/workflows/documentation.yml
Builds documentation with MkDocs and publishes to GitHub Pages (gh-pages branch).

---

## Artifacts & Logs

The workflows upload useful artifacts to Actions runs:

CI: test coverage, test reports (if configured)

Scheduled tasks: logs/maintenance.log → uploaded as maintenance-logs artifact

Documentation: built site/ uploaded as documentation-site artifact

Deployment: deployment logs available in the workflow run / Vercel dashboard

To download artifacts:

Open the workflow run in GitHub → Actions.

Scroll to the bottom of the run page.

Under Artifacts, click the artifact name to download.

---

## Troubleshooting

npm ci fails
Ensure package-lock.json exists. Run npm install locally and commit package-lock.json.

Lint errors in CI
Run npm run lint locally to see and fix errors. Use npx eslint . --fix to auto-fix simple problems.

Docs not published
Verify GitHub Pages is set to deploy from the gh-pages branch (Settings → Pages) and that the documentation.yml workflow completed successfully.

Vercel deploy fails
Check repository Secrets (Settings → Secrets → Actions) for VERCEL_TOKEN, VERCEL_PROJECT_ID, and VERCEL_ORG_ID.

---

## Support

If you encounter issues:

Open a GitHub issue in this repository.

Include workflow run URLs and attached artifacts (logs, screenshots).

---

## License

This project is distributed under the MIT License.