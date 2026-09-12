# ScreenShelf 🍥

A clean, personal tracker for **anime and TV series**.

ScreenShelf is designed to stay simple: track series at the season level, keep your library locally on your device, and use TMDB for search and series metadata.

> Built because I wanted a tracker with the simplicity of a paper list and the metadata of TMDB — no account, no cloud, no episode-level noise.

## Features

- 📺 Separate **Series** and **Anime** libraries
- Five personal statuses for each library
- 🔍 TMDB-powered search
- 👀 Preview a series before adding it
- 📚 Season-level watched tracking
- 🎬 Episode information for reference (no episode-by-episode tracking)
- 🔤 Alphabetical library ordering
- 🔔 In-app notifications for new seasons/episodes
- 📴 Local-first library with offline access
- 🖼️ Cached artwork
- 💾 Import/export backups
- 🎨 Dark/light themes and accent customization
- 📱 Responsive layout
- 📲 Installable PWA

## Requirements

- Any modern web browser
- For local development: a static HTTP server such as Python, Node.js, or any other HTTP server
- No build step is required

## Run locally

Clone the repository and serve it over localhost:

```bash
git clone https://github.com/monochromatic-one/ScreenShelf.git
cd ScreenShelf
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Service workers require **localhost or HTTPS**. Opening `index.html` directly with `file://` will not enable the PWA service worker.

## Deploy with GitHub Pages

ScreenShelf is a static web app and can be hosted with GitHub Pages.

Keep these files together:

```text
index.html
manifest.json
service-worker.js
icons/
├── icon-192.png
└── icon-512.png
```

Enable GitHub Pages for the repository and open the generated HTTPS URL.

The app uses relative paths, so it can also be deployed under a project path such as:

```text
https://monochromatic-one.github.io/ScreenShelf/
```

## TMDB Setup

ScreenShelf uses **TMDB (The Movie Database)** for search and series metadata.

You need your own **free TMDB API key**.

Get a free one from [The Movie Database](https://www.themoviedb.org/settings/api) (create an account → Settings → API).

Then open:

**Settings → TMDB API Key → Test Connection**

The existing library remains available offline, but TMDB-powered search and refresh require an internet connection.

## Statuses

### Anime

- Watching ⛩️
- Planned 🍿
- Coming back? 🤷
- Finished ✅
- Dropped 🗑️

### Series

- Watching 🍿
- Planned 📋
- Returning 🔄
- Finished ✅
- Dropped 🗑️

Statuses are controlled manually by the user. TMDB information does not automatically change your personal status.

## Privacy & Data

ScreenShelf is **local-first**.

Your library, statuses, watched seasons, settings, notifications, and cached data are stored locally in the browser on your device.

There is no ScreenShelf account or cloud-sync system.

Your TMDB API key is entered through Settings and stored only on your device. It is never written into the source code and never included in exports.

## Backup

Because your tracking data is stored locally, regularly use:

**Settings → Export**

Keep the exported JSON backup somewhere safe.

If your browser data is cleared or you move to another device, use:

**Settings → Import**

to restore your library.

## Installing ScreenShelf

ScreenShelf is a Progressive Web App (PWA).

1. Open the deployed ScreenShelf website over **HTTPS**.
2. Use your browser's **Install / Add to Home Screen** option.
3. Launch ScreenShelf from your home screen or installed apps.
4. Your local library can continue to be accessed offline after the app shell has been cached.

## License

ScreenShelf is released under the **MIT License**.

See the `LICENSE` file for the full license text.
