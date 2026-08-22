# Gerfaut documentation

User guides for [Gerfaut](https://gerfaut-wallet.com), a watch-only Bitcoin wallet. [Mintlify](https://mintlify.com) builds the site and serves it at [gerfaut-wallet.com/docs](https://gerfaut-wallet.com/docs).

## Preview locally

Install the Mintlify CLI (Node.js 20.17 or newer), then run the dev server from the repository root:

```bash
npm i -g mint
mint dev
```

The preview runs at `http://localhost:3000`.

Before opening a pull request, check the project:

```bash
mint validate
mint broken-links
```

## How it deploys

Every push to `main` triggers a deployment through the Mintlify GitHub App. There is no build step to run by hand.

## Layout

- `docs.json` holds the site configuration: branding, colors, fonts, and navigation.
- Each page is a single MDX file, sorted into one folder per section.
- `logo/` and `favicon.svg` come from the Gerfaut brand kit.
