<h1 align="center">🚀 web-extension-starter</h1>
<p align="center">Web Extension starter to build "Write Once Run on Any Browser" extension</p>
<div align="center">
  <a href="https://github.com/abhijithvijayan/web-extension-starter/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/abhijithvijayan/web-extension-starter.svg" alt="LICENSE" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20web-extension-starter%21%20by%20%40_abhijithv%0A%0AWeb%20Extension%20starter%20to%20build%20%22Write%20Once%20Run%20on%20Any%20Browser%22%20extension.%20https%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fweb-extension-starter%0A%0A%23javascript%20%23react%20%23typescript%20%23sass%20%23webextension%20%23chrome%20%23firefox%20%23opera">
     <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" alt="TWEET" />
  </a>
</div>
<h3 align="center">🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p align="center">
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p align="center">
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

❤️ it? ⭐️ it on [GitHub](https://github.com/abhijithvijayan/web-extension-starter) or [Tweet](https://twitter.com/intent/tweet?text=Check%20out%20web-extension-starter%21%20by%20%40_abhijithv%0A%0AWeb%20Extension%20starter%20to%20build%20%22Write%20Once%20Run%20on%20Any%20Browser%22%20extension.%20https%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fweb-extension-starter%0A%0A%23javascript%20%23react%20%23typescript%20%23sass%20%23webextension%20%23chrome%20%23firefox%20%23opera) about it.

## Features

- Cross Browser Support (Web-Extensions API)
- Browser Tailored Manifest generation
- Vite for fast builds and HMR
- Automatic build on code changes
- Auto packs browser specific build files
- SASS/SCSS styling with CSS Modules
- TypeScript by default
- ES6 modules support
- React 19 with automatic JSX runtime
- ESLint 9 flat config with Prettier

## Tech Stack

- **Bundler**: [Vite](https://vitejs.dev/) 7
- **UI**: [React](https://react.dev/) 19
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.9
- **Styling**: SCSS with CSS Modules
- **Linting**: ESLint 9 (flat config) + Prettier
- **Manifest**: [vite-plugin-wext-manifest](https://github.com/abhijithvijayan/vite-plugin-wext-manifest)

## Browser Support

This starter uses **Manifest V3** for all browsers.

| [![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) | [![Brave](https://raw.githubusercontent.com/alrra/browser-logos/master/src/brave/brave_48x48.png)](/) |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 88+ (Jan 2021)                                                                                | 109+ (Jan 2023)                                                                                  | 74+ (Chromium-based)                                                                       | 88+ (Chromium-based)                                                                    | Latest (Chromium-based)                                                                    |

> **Note**: Firefox 109+ is required for Manifest V3 support with ES modules in background scripts.
>
> Need to support older Firefox versions? See [Firefox MV2 Guide](docs/FIREFOX_MV2.md) for using Manifest V2 with Firefox.

## Used by extensions in production that has over 100,000+ users.

- [daily.dev](https://daily.dev) - [daily.dev extension](https://r.daily.dev/get)
- [Jiffy Reader](https://chrome.google.com/webstore/detail/jiffy-reader/lljedihjnnjjefafchaljkhbpfhfkdic)
- [kutt-extension](https://chrome.google.com/webstore/detail/kutt/pklakpjfiegjacoppcodencchehlfnpd)
- [doubanIMDb](https://chrome.google.com/webstore/detail/doubanimdb/nfibbjnhkbjlgjaojglmmibdjicidini)

## Use this template

Create a new directory and run

```
curl -fsSL https://github.com/abhijithvijayan/web-extension-starter/archive/react-typescript-vite.tar.gz | tar -xz --strip-components=1
```

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org) 20 or later installed.

Then run the following:

```bash
# Install dependencies
npm install

# Start development server
npm run dev:chrome    # For Chrome
npm run dev:firefox   # For Firefox

# Build for production
npm run build:chrome  # Build Chrome extension
npm run build:firefox # Build Firefox addon
npm run build         # Build for all browsers
```

## Project Structure

```
source/
├── Background/        # Service worker (Chrome MV3) / Background script (Firefox)
├── ContentScript/     # Content scripts (injected into web pages)
├── Popup/             # Extension popup UI
├── Options/           # Options page UI
├── components/        # Shared React components
├── styles/            # Global styles and variables
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── public/            # Static assets (icons, etc.)
└── manifest.json      # Extension manifest template
```

## Development

### Loading the Extension

#### Chrome

1. Navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extension/chrome` directory

#### Firefox

1. Navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select `extension/firefox/manifest.json`

### Content Scripts

Content scripts are automatically bundled as IIFE (Immediately Invoked Function Expression) to ensure compatibility with the browser's content script execution environment, which doesn't support ES modules.

### Browser-Specific Manifest

The manifest uses vendor prefixes to generate browser-specific configurations:

```json
{
  "__chrome__name": "My Chrome Extension",
  "__firefox__name": "My Firefox Addon",
  "__chrome|firefox__description": "Works on both!"
}
```

See [vite-plugin-wext-manifest](https://github.com/abhijithvijayan/vite-plugin-wext-manifest) for more details.

## Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev:chrome`  | Start dev server for Chrome            |
| `npm run dev:firefox` | Start dev server for Firefox           |
| `npm run build:chrome`| Build production Chrome extension      |
| `npm run build:firefox`| Build production Firefox addon        |
| `npm run build`       | Build for all browsers                 |
| `npm run lint`        | Run ESLint                             |
| `npm run lint:fix`    | Run ESLint with auto-fix               |

## Linting & TypeScript Config

- Shared ESLint & Prettier Configuration - [`@abhijithvijayan/eslint-config`](https://www.npmjs.com/package/@abhijithvijayan/eslint-config)
- Shared TypeScript Configuration - [`@abhijithvijayan/tsconfig`](https://www.npmjs.com/package/@abhijithvijayan/tsconfig)

## Bugs

Please file an issue [here](https://github.com/abhijithvijayan/web-extension-starter/issues/new) for bugs, missing documentation, or unexpected behavior.

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
