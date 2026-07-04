# Bean & Brew — Coffee Shop Website

A clean, responsive, static website for a coffee shop.

## Pages

- **`index.html`** — Home: hero, highlights, story, and opening hours.
- **`menu.html`** — Full menu (espresso, brewed & cold, tea, bakery).
- **`contact.html`** — Contact details, a validated message form, and a map.

## Structure

```
.
├── index.html
├── menu.html
├── contact.html
├── css/
│   └── style.css
└── js/
    └── main.js      # mobile nav + contact form validation
```

## Running locally

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- Fonts (Fraunces + Inter) load from Google Fonts; the map uses an OpenStreetMap embed.
- The contact form validates on the client and shows a confirmation. To actually deliver
  messages, wire the form up to a backend or a form service (e.g. Formspree) in `js/main.js`.
- Replace the placeholder name, address, phone, email, and hours with your own details.
