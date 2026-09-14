# ScreenShelf 🍥

A personal tracker for anime and TV series, powered by TMDB.

ScreenShelf tracks series at the **season level** rather than
episode-by-episode. The current private version uses Firebase
Authentication and Cloud Firestore for account-based syncing, while
Firestore's persistent local cache provides offline access to previously
loaded personal data.

> Built because I wanted a simple tracker for keeping up with series
> without turning it into an episode-management app.

## Features

-   📺 Separate **Series** and **Anime** libraries
-   🏷️ Five personal statuses for each library
-   🔎 TMDB-powered search and preview before adding
-   🎬 Season-level watched tracking
-   ⏱️ Approximate watched-time calculation from watched seasons
-   ⭐ Personal ratings
-   🔔 In-app notifications for new seasons and episodes
-   👥 Friends with unique Friend Codes and read-only shared libraries
-   🔒 Firebase Authentication with Google and email/password sign-in
-   ☁️ Firestore cloud syncing across signed-in devices
-   💾 Persistent local Firestore cache for personal offline use
-   🖼️ Profile pictures stored as compressed JPEG data URLs in Firestore
-   📦 Import/export backups
-   🔤 A--Z, Recently Added, and Recently Updated sorting
-   🎨 Dark/light themes and accent customization
-   📱 Responsive layout
-   📲 Installable PWA

## Data and privacy

The current private version uses Firebase:

-   **Firebase Authentication** handles sign-in.
-   **Cloud Firestore** stores the user's private library,
    profile/settings, notifications, and Friends relationships.
-   Accepted Friends can read only the owner's Anime/Series library
    documents; those libraries are read-only to Friends.
-   Private profile data, TMDB API keys, settings, and notifications are
    not exposed to Friends.
-   Friend discovery uses a unique Friend Code rather than email.
-   Firestore persistent local caching allows previously loaded personal
    data to remain available offline.
-   Firebase Storage is **not** used. Profile pictures are compressed in
    the browser and stored as JPEG data URLs in Firestore.

The Firebase web configuration in `index.html` is client-side Firebase
configuration, not an admin credential. The TMDB API key is stored in
the owner's private Firestore profile data.

## Requirements

-   Any modern web browser
-   Internet connection for Firebase sign-in, cloud sync, Friends, and
    TMDB requests
-   No build step is required for the application itself

## Run locally

Clone the repository and serve it over a local HTTP server:

``` bash
git clone https://github.com/monochromatic-one/ScreenShelf.git
cd ScreenShelf
python3 -m http.server 8000
```

Then open:

``` text
http://localhost:8000
```

A local HTTP server is recommended instead of opening `index.html`
directly because the application uses ES modules, Firebase, and
PWA/service-worker features.

## Repository structure

``` text
ScreenShelf/
├── index.html
├── manifest.json
├── service-worker.js
├── firebase.json
├── firestore.rules
├── icon-192.png
├── icon-512.png
├── README.md
└── LICENSE
```

## Firebase

The application expects the Firebase project configuration embedded in
`index.html` and uses:

-   Firebase Authentication
-   Cloud Firestore
-   Firestore persistent local cache

The Firestore security rules are stored in `firestore.rules`.

For the private version, the Firebase project and its security rules
should be treated as part of the application's backend configuration.

## PWA

ScreenShelf is an installable Progressive Web App.

The service worker caches the application shell and the Firebase SDK
modules required by the application. The app-shell cache is versioned so
releases can invalidate older cached shells.

For a production PWA, serve ScreenShelf over HTTPS.

## License

MIT License. See [LICENSE](./LICENSE).
