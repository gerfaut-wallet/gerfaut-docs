# Gerfaut documentation

User guides for [Gerfaut](https://gerfaut-wallet.com), a watch-only bitcoin wallet. [Mintlify](https://mintlify.com) builds the site, which is meant to be served at [gerfaut-wallet.com/docs](https://gerfaut-wallet.com/docs).

## Status: public beta

Gerfaut is in public beta. The pages a newcomer reads first say so. Report a mistake in these pages in the [issues](https://github.com/gerfaut-wallet/gerfaut-docs/issues) here, and a problem with an app in that app's repository ([desktop](https://github.com/gerfaut-wallet/gerfaut-desktop/issues), [Android](https://github.com/gerfaut-wallet/gerfaut-mobile/issues)).

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

Deployment goes through the Mintlify GitHub App. Once the app is connected to this repository, each push to `main` starts a deployment, with nothing to build by hand.

## Layout

- `docs.json` holds the site configuration: branding, colors, fonts, and navigation.
- Each page is a single MDX file, sorted into one folder per section.
- `changelog/` restates the `CHANGELOG.md` files of the desktop and Android apps.
- `images/` holds the screenshots, in `desktop/` and `android/`.
- `videos/` holds the short clips that show one action each, sorted by section, in a desktop and an Android version.
- `style.css` restyles the callouts, the previous and next buttons, and the Android screenshots and clips.
- `logo/` and `favicon.svg` come from the Gerfaut brand kit.

## License

The text of this documentation is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International](LICENSE) license (CC BY-SA 4.0). The Gerfaut name and logo are not covered by it.
