# GAS Vue Template

A modern Vue 3 single-page application template for building UIs inside **Google Apps Script** (GAS). Deploy as a web app, sidebar, or modal dialog within Google Workspace applications like Sheets and Docs.

---

## Features

- **Three deployment modes** — web app (`doGet`), sidebar (`showSidebar`), and modal dialog (`showDialog`)
- **Frontend-to-backend communication** — Promise-based wrapper around `google.script.run` for clean async server calls
- **Local development mocks** — dev mocks automatically activate when running outside GAS so you can work with `npm run dev` without deploying
- **Dynamic configuration** — app settings loaded from GAS Script Properties on startup
- **Global state management** — centralized stores with [Pinia](https://pinia.vuejs.org/); a starter `useAppStore` (loading state) is included as a reference pattern
- **Toast notifications** — success, error, warning, and info toasts via Buefy
- **Single-file output** — entire app (JS, CSS, HTML) bundled into one HTML file for GAS compatibility
- **Hash-based routing** — required for GAS's fixed-URL environment; uses Vue Router with `createWebHashHistory`

---

## Tech Stack

| Layer         | Library / Tool                  |
| ------------- | ------------------------------- |
| Framework     | Vue 3.5 (Composition API)       |
| Routing       | Vue Router 5                    |
| State         | Pinia 3                         |
| UI Components | Buefy 3 + Bulma 1               |
| Build         | Vite 8 + vite-plugin-singlefile |
| Backend       | Google Apps Script (V8 runtime) |
| Deployment    | Clasp                           |
| Formatting    | Prettier                        |

---

## Project Structure

```
gas/                        # GAS server-side files (also Vite output dir)
├── Code.js                 # doGet(), showSidebar(), showDialog(), getServerData()
├── Config.js               # getConfig() reads from Script Properties
└── appsscript.json         # GAS project manifest

src/                        # Vue frontend source
├── main.js                 # App entry — mounts Vue, provides global state
├── App.vue                 # Root component — navbar, router-view, loading overlay
├── router/
│   └── index.js            # Hash history router (/ and /about)
├── views/
│   ├── HomeView.vue        # Home page with server call demo
│   └── AboutView.vue       # Project info and deployment instructions
├── stores/
│   └── app.js              # useAppStore — loading, config, configLoaded (Pinia)
├── composables/
│   └── useNotify.js        # Buefy toast helpers
└── utils/
    └── gas.js              # serverCall() + dev mocks

index.html                  # HTML entry point
vite.config.js              # Vite config — outputs to ./gas, single-file bundle
.clasp.json                 # Clasp project ID and root dir
```

---

## Getting Started

### Prerequisites

- Node.js
- [Clasp](https://github.com/google/clasp) installed and authenticated (`clasp login`)
- A Google Apps Script project

### Install

```bash
npx degit voxatik/gas-vue-template {Your Project Name} && npm install
```

### Configure Clasp

Update `.clasp.json` with your GAS script ID:

```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "rootDir": "./gas"
}
```

### Local Development

```bash
npm run dev
```

Runs a Vite dev server. Server calls automatically use dev mocks (defined in `src/utils/gas.js`) since `google.script.run` is not available outside GAS.

---

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start local dev server with hot reload       |
| `npm run build`        | Build Vue app to `./gas/index.html`          |
| `npm run push`         | Build and push files to GAS via Clasp        |
| `npm run deploy`       | Build, push, and create a new GAS deployment |
| `npm run pull`         | Pull current GAS files via Clasp             |
| `npm run format`       | Format all files with Prettier               |
| `npm run format:check` | Check formatting without writing             |

---

## Backend API

The GAS server exposes these callable functions:

| Function          | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `doGet()`         | Web app entry point — serves the built HTML                  |
| `showSidebar()`   | Renders the app in a Sheets/Docs sidebar                     |
| `showDialog()`    | Opens the app as an 800×600 modal dialog                     |
| `getServerData()` | Example data endpoint called from HomeView                   |
| `getConfig()`     | Returns app config from Script Properties (`APP_NAME`, etc.) |

### Calling Server Functions

Use `serverCall()` from `src/utils/gas.js`:

```js
import { serverCall } from '@/utils/gas'

const data = await serverCall('getServerData')
```

This wraps `google.script.run` in a Promise and falls back to dev mocks automatically.

---

## Adding Dev Mocks

When running locally, `google` is undefined. Add mocks for new server functions in `src/utils/gas.js`:

```js
const devMocks = {
  getServerData: () => ({ message: 'Hello from mock!' }),
  myNewFunction: arg => ({ result: arg }),
}
```

---

## State Management (Pinia)

Stores live in `src/stores/`. The included `useAppStore` is a minimal reference:

```js
// src/stores/app.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { serverCall } from '@/utils/gas'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const config = ref(null)
  const configLoaded = ref(false)

  function setLoading(value) { loading.value = value }

  async function loadConfig() {
    config.value = await serverCall('getConfig')
    configLoaded.value = true
  }

  return { loading, config, configLoaded, setLoading, loadConfig }
})
```

Use it in any component or composable:

```js
import { useAppStore } from '@/stores/app'

const app = useAppStore()
app.setLoading(true)
const data = await serverCall('getServerData')
app.setLoading(false)
```

Add new stores by creating additional files in `src/stores/` following the same setup-function pattern.

---

## Configuration via Script Properties

Set properties in GAS under **Project Settings > Script Properties**:

| Property   | Description                              |
| ---------- | ---------------------------------------- |
| `APP_NAME` | Displayed in the navbar as the app title |

---

## Deployment

```bash
npm run deploy
```

This builds the Vue app, pushes all files to GAS, and creates a new versioned deployment. After deploying, share the web app URL or trigger `showSidebar()` / `showDialog()` from a menu item or Apps Script trigger.

---

## Code Style

Prettier is configured with: no semicolons, single quotes, trailing commas (ES5), 100-character line width, 2-space indentation. Use Buefy components in **PascalCase** (e.g. `<BButton>`, not `<b-button>`).
