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
- 👥 Private Friends with permanent Friend Codes and read-only shared libraries
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

## Firestore security rules

Friends requires the Firestore rules included in [`firestore.rules`](./firestore.rules). Deploy them to the same Firebase project used by the app before publishing this update:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules --project screenshelf
```

`firebase.json` already points the Firebase CLI at the rules file. The rules keep private `users/{uid}` profile documents and notifications owner-only, allow exact (not listable) Friend Code lookups, and grant accepted friends read-only access only to anime and series library documents.

## Friends

Open **Settings → Friends** to find your permanent eight-character Friend Code, send a request, manage pending requests, and remove friends. Friend Codes use uppercase letters and numbers without `0`, `O`, `1`, or `I`.

A library becomes visible only after the recipient accepts a request. Friends can view each other's Series and Anime lists, statuses, season-complete marks, and ratings in a read-only view. They cannot see emails, TMDB API keys, private settings, or notifications.

Friends requires an internet connection. Your personal library remains available through the existing offline cache.

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

Your library, statuses, watched seasons, settings, notifications, and cached data are stored in your authenticated ScreenShelf Firestore account, with Firestore's persistent browser cache supporting offline access.

Your TMDB API key is entered through Settings and stored only in your private profile. It is never written into the source code and never included in exports.

Friends use a separate minimal public profile document containing only a display name and profile picture. Accepted friends can read your Series and Anime library documents; pending requests and strangers cannot. Friends never receive access to your private profile document, TMDB API key, settings, or notifications.

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
