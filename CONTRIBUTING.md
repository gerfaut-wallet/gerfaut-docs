# Contributing to the Gerfaut documentation

Thank you for helping make these guides better. Every page is an MDX file in this repository, and [Mintlify](https://mintlify.com) builds the site from them.

## Preview your changes

Install the Mintlify CLI (Node.js 20.17 or newer), then run the dev server from the repository root:

```bash
npm i -g mint
mint dev
```

The preview runs at `http://localhost:3000` and reloads as you edit.

Before you open a pull request, check the project:

```bash
mint validate
mint broken-links
```

## Propose a change

1. Open an issue first for anything beyond a typo or a broken link, so that the change is agreed before you write it.
2. Fork the repository and create a branch from `main`.
3. Edit the page, or add a new one and list it under `navigation` in `docs.json`.
4. Open a pull request with a short description of what changed and why.

Everything public happens in English: issues, pull requests and pages. Write in the voice of the existing pages: second person, present tense, one task per section, and the exact labels the apps show.

Security vulnerabilities in the apps are never reported through issues or pull requests: write to info@pandul.fr instead.

## License of contributions

By submitting a contribution, you agree that it is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International](LICENSE) license, like the rest of this documentation.
