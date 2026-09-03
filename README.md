# Analytical Innovations

Responsive multi-page website for Analytical Innovations, LLC, built with React, Vinext, TypeScript, and Cloudflare Workers.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

## Deployment

Pushes to `main` deploy through GitHub Actions. Add these repository secrets before the first deployment:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

The API token should be scoped to the intended Cloudflare account with the **Edit Cloudflare Workers** permission.
