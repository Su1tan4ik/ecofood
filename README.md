# 🌱 EcoFood Share

> An open-source platform that helps cafés, shops, and individuals share surplus food with people in need — reducing food waste, one meal at a time.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-purple.svg)](CODE_OF_CONDUCT.md)

🔗 **Live demo:** [su1tan4ik.github.io/ecofood](https://su1tan4ik.github.io/ecofood/)

---

## 🌍 The Problem

Every year, **1.3 billion tonnes** of food are thrown away worldwide — that's a third of everything humanity produces. Meanwhile, hundreds of millions go hungry. If food waste were a country, it would be the **third-largest CO₂ emitter** after China and the US.

**EcoFood Share** is a small attempt to fix this — locally, transparently, and without bureaucracy.

## ✨ Features

- 📋 **Live listings feed** — browse surplus food shared by cafés, shops, and neighbors with category filters and instant search
- 🃏 **Detailed item cards** — click any listing to see full info: portions, location, pickup window, allergens, notes
- 📝 **Share form** — publish your own surplus in 30 seconds. Saves to `localStorage` so listings persist across reloads
- 🗺️ **Interactive city map** — SVG-based map with hover tooltips, animated pins, and live indicators
- 📊 **Impact dashboard** — animated counters showing portions saved, CO₂ avoided, water and energy preserved
- 🎫 **Reservation flow** — claim a listing with toast confirmations
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🎨 **Editorial design** — Fraunces + Bricolage Grotesque typography, paper-grain texture, warm earthy palette
- ♿ **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript. No build step required.

## 🖼️ Preview

```
┌──────────────────────────────────────────────────┐
│  EcoFood Share — Share food. Save the planet.   │
├──────────────────────────────────────────────────┤
│  [48,312 portions]  [1,893 kg CO₂]  [312 cafés] │
├──────────────────────────────────────────────────┤
│  🥖 Fresh bread        🍝 Pasta carbonara       │
│  Bakery «Kolosok»      Café Veranda             │
│  4 portions · until    6 portions · until       │
│  21:00          [→]    19:30           [→]     │
└──────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Try it online
Open the [live demo](https://su1tan4ik.github.io/ecofood/) — no installation needed.

### Run locally

```bash
# Clone the repository
git clone https://github.com/Su1tan4ik/ecofood.git
cd ecofood

# Option 1 — open directly
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows

# Option 2 — serve with Python
python3 -m http.server 8000
# then open http://localhost:8000

# Option 3 — serve with npx
npx serve .
```

## 📁 Project Structure

```
ecofood/
├── index.html              # Production build — single file, deployed to GitHub Pages
├── src/                    # Development sources (separated for easier editing)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .github/
│   ├── dependabot.yml
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

## 🎨 Customization

All design tokens live in CSS custom properties at the top of `index.html` (or `src/styles.css`). Change them and the entire interface re-themes:

```css
:root {
  --moss-deep:  #0E2419;  /* primary green   */
  --terracotta: #D7572C;  /* accent          */
  --cream:      #F4EDE0;  /* background      */
  --amber:      #E8A434;  /* highlights      */
  --paper:      #FAF6EC;  /* card surface    */
}
```

## 🛣️ Roadmap

- [ ] Real backend (Supabase / Firebase)
- [ ] User authentication and profiles
- [ ] Real maps integration (Leaflet / Mapbox)
- [ ] In-app chat between donor and recipient
- [ ] Push notifications for nearby listings
- [ ] Photo uploads
- [ ] i18n (English / Kazakh / Russian)
- [ ] PWA with offline support
- [ ] Accessibility audit (WCAG 2.1 AA)

## 🤝 Contributing

Contributions are very welcome — whether it's a bug fix, a new feature, a translation, or just a typo. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

**Good first issues** are tagged `good first issue` — perfect if it's your first open-source contribution.

## 👥 Contributors

Thanks to everyone who has helped build EcoFood Share. See the [contributors graph](../../graphs/contributors).

## 📜 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for full text.

You're free to fork, modify, and deploy your own instance in your city. If you do — let us know, we'd love to hear about it.

## 💚 Acknowledgments

- Inspired by [OLIO](https://olioapp.com), [Too Good To Go](https://toogoodtogo.com), and the broader food-rescue community
- Typography by [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque)
- Icons hand-drawn as inline SVG

---

<sub>Made with care for a less wasteful world. 🌱</sub>
