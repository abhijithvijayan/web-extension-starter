# Encora Tools

This extension adds additional features to the Encora website. It is built on the [abhijithvijayan/web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) package.

## Get started

Ensure you have

-   [Node.js](https://nodejs.org) 10 or later installed
-   [Yarn](https://yarnpkg.com) v1 or v2 installed

Then run the following:

-   `yarn install` to install dependencies.
-   `yarn run dev:chrome` to start the development server for chrome extension
-   `yarn run dev:firefox` to start the development server for firefox addon
-   `yarn run dev:opera` to start the development server for opera extension
-   `yarn run build:chrome` to build chrome extension
-   `yarn run build:firefox` to build firefox addon
-   `yarn run build:opera` to build opera extension
-   `yarn run build` builds and packs extensions all at once to extension/ directory

### Development

-   `yarn install` to install dependencies.
-   To watch file changes in development

    -   Chrome
        -   `yarn run dev:chrome`
    -   Firefox
        -   `yarn run dev:firefox`
    -   Opera
        -   `yarn run dev:opera`

-   **Load extension in browser**

-   ### Chrome

    -   Go to the browser address bar and type `chrome://extensions`
    -   Check the `Developer Mode` button to enable it.
    -   Click on the `Load Unpacked Extension…` button.
    -   Select your browsers folder in `extension/`.

-   ### Firefox

    -   Load the Add-on via `about:debugging` as temporary Add-on.
    -   Choose the `manifest.json` file in the extracted directory

-   ### Opera

    -   Load the extension via `opera:extensions`
    -   Check the `Developer Mode` and load as unpacked from extension’s extracted directory.

### Production

-   `yarn run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.

## License

MIT © [Musical Bean](https://musicalbean.carrd.co)
