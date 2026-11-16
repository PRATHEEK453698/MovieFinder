# MovieFinder 🎬

MovieFinder is a movie, TV series, and anime discovery platform designed to bring entertainment discovery, title information, search, and AI-assisted insights together in one place.

**Live Website:** https://pratheek453698.github.io/MovieFinder/

## ✨ Features

### 🎥 Movies & TV Shows
- Discover movies and TV series.
- Search for titles.
- Explore title information and available metadata.
- Browse genres and recommendations.
- Explore cast and trailers where available.
- View TV seasons and episodes.

### 🎌 Anime Discovery
- Discover anime titles using the AniList API.
- Explore anime-specific information.
- View studio information.
- Explore source material, demographics, and themes.
- View popularity and favourites information.
- Explore available character information.

Anime information is handled separately from movie and TV metadata because the two content categories use different data structures.

### 🤖 AI-Powered Features
- Gemini API integration.
- AI-assisted title insights.
- Spoiler-conscious plot overviews.
- AI-assisted recommendations.

### 🔍 Discovery & Personalization
- Search and autocomplete.
- Genre-based discovery.
- Recommendations.
- Watchlist and favourites.
- Additional discovery and browsing features.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Frontend structure |
| CSS | Styling and responsive design |
| JavaScript | Frontend functionality |
| Python / Flask | Backend |
| TMDB API | Movie and TV metadata |
| AniList API | Anime metadata |
| Google Gemini API | AI-assisted features |
| MongoDB Atlas | Database |
| GitHub Pages | Frontend hosting |
| Render | Backend hosting |

## ⚙️ How It Works

1. Users explore movies, TV shows, or anime through the interface.
2. Movie and TV information is retrieved through TMDB.
3. Anime information is retrieved through AniList.
4. The Flask backend handles server-side functionality and integrations.
5. Gemini provides AI-assisted insights and recommendations.
6. MongoDB Atlas stores application data where required.

## 🔐 API Configuration

MovieFinder integrates with external APIs:

- TMDB API
- AniList API
- Google Gemini API

API credentials and database connection strings must be kept private.

Never commit actual API keys, passwords, or database credentials to a public repository.

For your own deployment, configure credentials through the appropriate backend environment variables or deployment secrets.

## 🚀 Deployment

The frontend is hosted using GitHub Pages, with the backend deployed separately.

**Live Website:** https://pratheek453698.github.io/MovieFinder/

## 🔮 Future Improvements

- Direct anime streaming links.
- Anime episode-watch links.
- Further improvements to mobile responsiveness.
- Additional discovery and personalization features.

*Anime streaming and episode links are planned enhancements and are not currently implemented.*

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) — Movie and TV metadata.
- [AniList](https://anilist.co/) — Anime metadata.
- [Google Gemini](https://ai.google.dev/) — AI-assisted features.

---

**MovieFinder** — Explore movies, discover series, and dive into anime. 🍿
