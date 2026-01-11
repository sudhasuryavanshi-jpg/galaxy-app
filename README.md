# Our Solar System — Interactive Demo

Simple, beautiful single-page demo that visualizes the Sun and the eight planets with orbit animations and a side panel to show details.

Usage
- Open `index.html` in a browser (double-click or use a local server).

Features
- Animated orbits with CSS
- Click or hover a planet to see details
- Pause/Play motion button
- Keyboard arrow navigation between planets

Development
- No build step required. For local development, you can run a simple static server e.g.:

```powershell
# From the repository root
python -m http.server 8000
# or using Node
npx http-server -c-1
```

Then visit `http://localhost:8000` in your browser.

Files
- `index.html` — main markup
- `styles.css` — visuals and layout
- `script.js` — planet data + interactivity

License
MIT — feel free to adapt for demos or learning.
