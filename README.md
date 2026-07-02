# Balanz Login Autofill

Enables standard password manager autofill on the Balanz login page.

## Install

- [Chrome Web Store](https://chromewebstore.google.com/detail/balanz-login-autofill/cbdbbpfbhjpcoblmbgihbepnajofmeai)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/balanz-login-autofill/)

## Motivation

Balanz's login markup gets in the way of standard password manager behavior in two places:

- the username field is missing standard username autocomplete semantics
- the password field is marked as `autocomplete="new-password"`, so password managers treat it like an account-creation field and offer password generation instead of filling the saved password

This extension keeps the page shaped like a normal sign-in flow for standard password managers:

- username input: `autocomplete="username"`
- password input: `autocomplete="current-password"`

It injects only on `https://clientes.balanz.com/auth/login*`.

## Development

```sh
npm install
npm run check
npm run lint:firefox
npm run build:firefox
npm run build:chrome
```

Browser-specific source manifests live in `manifests/`. Build outputs are written to `dist/{browser}/` with `manifest.json` at the root because browsers load unpacked extensions from a directory whose root contains the manifest.

## Local Testing

### Firefox

1. Run `npm run build:firefox`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click `Load Temporary Add-on...`.
4. Select `dist/firefox/manifest.json`.
5. Open `https://clientes.balanz.com/auth/login`.

Firefox temporary add-ons stay installed until they are removed or Firefox restarts.

### Chrome

1. Run `npm run build:chrome`.
2. Open `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select `dist/chrome`.
6. Open `https://clientes.balanz.com/auth/login`.

## Store Distribution

### Firefox Add-ons

For public distribution through Mozilla Add-ons:

1. Run `npm run package:firefox`.
2. Upload `artifacts/balanz-login-autofill-firefox.zip` through the AMO Developer Hub.
3. Complete the listing, review, and distribution fields.
4. Submit the extension for review.

### Chrome Web Store

1. Run `npm run package:chrome`.
2. Upload `artifacts/balanz-login-autofill-chrome.zip` through the Chrome Web Store Developer Dashboard.
3. Complete the store listing, privacy, and distribution fields.
4. Submit the extension for review.
