# Using Manifest V2 for Firefox

By default, this starter uses **Manifest V3** for all browsers. However, if you need to support older Firefox versions (< 109) or prefer MV2 for Firefox, follow this guide.

## Why Use MV2 for Firefox?

- **Older Firefox support**: Firefox 109+ is required for MV3
- **Extended support**: Mozilla has not announced a deprecation date for MV2
- **API differences**: Some APIs work differently between MV2 and MV3

## Required Changes

### 1. Update `source/manifest.json`

Replace the unified manifest with browser-specific versions:

```json
{
  "__chrome__manifest_version": 3,
  "__firefox__manifest_version": 2,
  "name": "Sample WebExtension",
  "version": "0.0.0",

  "icons": {
    "16": "assets/icons/favicon-16.png",
    "32": "assets/icons/favicon-32.png",
    "48": "assets/icons/favicon-48.png",
    "128": "assets/icons/favicon-128.png"
  },
  "description": "Sample description",
  "homepage_url": "https://github.com/abhijithvijayan/web-extension-starter",
  "short_name": "Sample Name",

  "__chrome__permissions": [
    "activeTab",
    "storage"
  ],

  "__chrome__optional_permissions": [],

  "__chrome__host_permissions": [],

  "__chrome__optional_host_permissions": [
    "http://*/*",
    "https://*/*"
  ],

  "__firefox__permissions": [
    "activeTab",
    "storage",
    "http://*/*",
    "https://*/*"
  ],

  "__chrome__content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self';"
  },
  "__firefox__content_security_policy": "script-src 'self'; object-src 'self'",

  "__chrome|firefox__author": "abhijithvijayan",

  "__firefox__applications": {
    "gecko": {
      "id": "{754FB1AD-CC3B-4856-B6A0-7786F8CA9D17}"
    }
  },

  "__chrome__minimum_chrome_version": "88",

  "__chrome__action": {
    "default_popup": "Popup/popup.html",
    "default_icon": {
      "16": "assets/icons/favicon-16.png",
      "32": "assets/icons/favicon-32.png",
      "48": "assets/icons/favicon-48.png",
      "128": "assets/icons/favicon-128.png"
    },
    "default_title": "tiny title"
  },

  "__firefox__browser_action": {
    "default_popup": "Popup/popup.html",
    "default_icon": {
      "16": "assets/icons/favicon-16.png",
      "32": "assets/icons/favicon-32.png",
      "48": "assets/icons/favicon-48.png",
      "128": "assets/icons/favicon-128.png"
    },
    "default_title": "tiny title",
    "browser_style": false
  },

  "__chrome__options_page": "Options/options.html",
  "options_ui": {
    "page": "Options/options.html",
    "open_in_tab": true
  },

  "background": {
    "__chrome__service_worker": "assets/js/background.bundle.js",
    "__chrome__type": "module",
    "__firefox__scripts": [
      "assets/js/background.bundle.js"
    ]
  },

  "content_scripts": [
    {
      "run_at": "document_start",
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "css": [],
      "js": [
        "assets/js/contentScript.bundle.js"
      ]
    }
  ],

  "__firefox__web_accessible_resources": [
    "assets/*"
  ],

  "__chrome__web_accessible_resources": [
    {
      "resources": ["assets/*"],
      "matches": ["http://*/*", "https://*/*"]
    }
  ]
}
```

### 2. Update `vite.config.ts`

Firefox MV2 background scripts don't support ES modules. Update the `buildIIFEScripts` plugin to also build the background script as IIFE for Firefox:

```typescript
// Build scripts as IIFE (no ES module imports)
// Content scripts can't use ES modules when injected via manifest
buildIIFEScripts({
  scripts: [
    {
      name: 'contentScript',
      entry: path.resolve(sourcePath, 'ContentScript/index.ts'),
    },
    // Firefox MV2 background scripts don't support ES modules
    ...(targetBrowser === 'firefox'
      ? [
          {
            name: 'background',
            entry: path.resolve(sourcePath, 'Background/index.ts'),
          },
        ]
      : []),
  ],
  outDir: getOutDir(),
  isDevelopment,
}),
```

Also update the rollup input to exclude background for Firefox (since it's built as IIFE):

```typescript
rollupOptions: {
  input: {
    popup: path.resolve(sourcePath, 'Popup/popup.html'),
    options: path.resolve(sourcePath, 'Options/options.html'),
    // Background script: Chrome MV3 uses ES modules (service worker)
    // Firefox MV2 is built separately as IIFE via buildIIFEScripts plugin
    ...(targetBrowser !== 'firefox'
      ? { background: path.resolve(sourcePath, 'Background/index.ts') }
      : {}),
  },
  // ... rest of config
}
```

## Key Differences: MV2 vs MV3

| Feature | MV2 (Firefox) | MV3 (Chrome/Firefox) |
|---------|---------------|----------------------|
| Background | `background.scripts` | `background.service_worker` (Chrome) / `background.scripts` with `type: module` (Firefox) |
| Action | `browser_action` | `action` |
| Host permissions | In `permissions` array | Separate `host_permissions` array |
| Web accessible resources | String array | Object array with `resources` and `matches` |
| CSP | String | Object with `extension_pages` |
| ES modules in background | Not supported | Supported |

## Browser Support with MV2

When using MV2 for Firefox:

| Browser | Version | Manifest |
|---------|---------|----------|
| Chrome | 88+ | MV3 |
| Firefox | 48+ | MV2 |
| Edge | 88+ | MV3 |
| Opera | 74+ | MV3 |

## Notes

- The `webextension-polyfill` library handles API differences between browsers
- Content scripts work the same way in both MV2 and MV3 (IIFE format)
- Test thoroughly on both browsers when using mixed manifest versions
