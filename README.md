# TravelBloom — Travel Recommendation Website

A responsive, accessible travel discovery website built with HTML, CSS and vanilla JavaScript for the JavaScript Programming Essentials final project.

**Live website:** https://Mikosh001.github.io/travel-recommendation/

## Pages

- Home: `index.html` — introduction, navigation, category shortcuts and search.
- About Us: `about.html` — project information, mission, team and contributor guidance.
- Contact Us: `contact.html` — contact details and a validated email form.
- Credits: `credits.html` — photography and destination references.

## Search

Enter `beach` / `beaches`, `temple` / `temples`, or `country` / `countries`. Searches ignore case and surrounding whitespace. Each category returns two recommendations with photographs. Country search displays Japan and Australia. Searching `Japan` or `Australia` displays two cities in that country. Place-name searches such as `Tokyo`, `Kyoto`, `Sydney`, `Melbourne`, `Angkor` or `Copacabana` are also supported.

Use Search or press Enter. Clear empties the search box and resets the results. Unrecognized and empty queries show helpful messages. Data loads from the local `travel_recommendation_api.json` file with `fetch()`.

## Contact form

The form validates the name, email and message, then opens the visitor's configured email app with an encoded draft addressed to `berdibekmejirbek08@gmail.com`. The visitor reviews and sends the email there. The static site does not claim to send messages directly or store submitted information.

## Run locally

Serve this directory over HTTP, for example:

```sh
python -m http.server 8000
```

Then open http://localhost:8000/ . Opening the HTML file with `file://` may prevent `fetch()` from reading the JSON data.

## Deploy on GitHub Pages

Publish the files at the repository root. In Settings → Pages choose **Deploy from a branch**, **main**, **/ (root)**, then Save. The `.nojekyll` file makes this a plain static deployment. No dependencies, API keys, backend or build command are required.

## Project files

`index.html`, `about.html`, `contact.html`, `credits.html`, `style.css`, `travel_recommendation.js`, `contact.js`, `travel_recommendation_api.json`, `.nojekyll`, and `assets/`.

The code uses semantic HTML, visible keyboard focus, associated form labels, live result feedback, meaningful image descriptions and responsive layouts. Respect the image licenses and credits in `credits.html` when reusing the project.
