"use strict";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsSection = document.getElementById("search-results");
const welcome = document.getElementById("discovery-welcome");
const resultsGrid = document.getElementById("results-grid");
let destinationData;
let searchRevision = 0;

// One shared request; it works on GitHub Pages, including project subpaths.
const dataReady = fetch("./travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) throw new Error("Unable to load destination data");
    return response.json();
  })
  .then((data) => { destinationData = data; return true; })
  .catch(() => {
    document.getElementById("load-error").hidden = false;
    return false;
  });

function normalizeQuery(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function findRecommendations(rawQuery, data) {
  const query = normalizeQuery(rawQuery);
  if (!query) return { items: [], title: "Where would you like to go?", category: "empty" };
  const words = query.match(/[a-z]+/g) || [];
  if (words.some((word) => ["beach", "beaches"].includes(word))) return { items: data.beaches, title: "A little vitamin sea.", category: "beaches" };
  if (words.some((word) => ["temple", "temples"].includes(word))) return { items: data.temples, title: "Stories set in stone.", category: "temples" };
  if (words.some((word) => ["country", "countries"].includes(word))) {
    return { items: data.countries.map((country) => ({ ...country, type: "Country", location: country.region })), title: "A world of possibilities.", category: "countries" };
  }
  const countryMatches = data.countries.filter((country) => country.name.toLowerCase().includes(query));
  if (countryMatches.length) return { items: countryMatches.flatMap((country) => country.cities.map((city) => ({ ...city, location: country.name, type: "City" }))), title: "A new point of view.", category: "destinations" };
  const allPlaces = [...data.beaches, ...data.temples, ...data.countries.flatMap((country) => country.cities.map((city) => ({ ...city, location: country.name, type: "City" })))];
  return { items: allPlaces.filter((place) => `${place.name} ${place.location}`.toLowerCase().includes(query)), title: "Follow your curiosity.", category: "destinations" };
}

function makeCard(place) {
  const card = document.createElement("article");
  card.className = "destination-card";
  const image = document.createElement("img");
  image.src = place.imageUrl;
  image.alt = place.alt;
  image.width = 640;
  image.height = 420;
  image.decoding = "async";
  const content = document.createElement("div");
  content.className = "card-content";
  const category = document.createElement("p");
  category.className = "card-category";
  category.textContent = `${place.type} / ${place.location}`;
  const heading = document.createElement("h3");
  heading.textContent = place.name;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = place.description;
  const link = document.createElement("a");
  link.className = "destination-link";
  link.href = place.sourceUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Explore destination ↗";
  link.setAttribute("aria-label", `Explore ${place.name} on the official destination website (opens in a new tab)`);
  content.append(category, heading, description, link);
  card.append(image, content);
  return card;
}

async function runSearch(rawQuery) {
  const revision = ++searchRevision;
  const queryAtStart = normalizeQuery(rawQuery);
  if (!(await dataReady)) return;
  // A Clear click or a newer search cancels this pending result.
  if (revision !== searchRevision || normalizeQuery(searchInput.value) !== queryAtStart) return;
  const result = findRecommendations(rawQuery, destinationData);
  welcome.hidden = true;
  resultsSection.hidden = false;
  resultsGrid.replaceChildren();
  document.getElementById("results-title").textContent = result.title;
  document.getElementById("result-count").textContent = String(result.items.length).padStart(2, "0");
  const summary = document.getElementById("results-summary");
  if (!queryAtStart) summary.textContent = "Enter beach, temple, country, or a destination name to begin.";
  else if (!result.items.length) summary.textContent = `No destinations found for “${rawQuery.trim()}”. Try beach, temple, country, Japan or Australia.`;
  else summary.textContent = `${result.items.length} ${result.items.length === 1 ? "recommendation" : "recommendations"} for “${rawQuery.trim()}” · ${result.category === "countries" ? "Two countries, two different ways to explore." : "Find a place that feels like you."}`;
  resultsGrid.append(...result.items.map(makeCard));
  document.querySelector(".discovery-panel").classList.toggle("has-results", result.items.length > 0);
}

searchForm.addEventListener("submit", (event) => { event.preventDefault(); runSearch(searchInput.value); });
document.getElementById("clear-button").addEventListener("click", () => {
  searchRevision++;
  searchInput.value = "";
  resultsGrid.replaceChildren();
  resultsSection.hidden = true;
  welcome.hidden = false;
  document.querySelector(".discovery-panel").classList.remove("has-results");
  searchInput.focus();
});
document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.query;
    runSearch(searchInput.value);
  });
});
