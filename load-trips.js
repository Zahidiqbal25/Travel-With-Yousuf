/**
 * Load trips from the API (when server is running) or trips-data.json (static fallback).
 */
async function loadTrips() {
  if (window.location.protocol !== 'file:') {
    try {
      const res = await fetch('/api/trips', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (_) {
      // API unavailable — fall through to JSON file
    }
  }

  const jsonUrl = new URL('trips-data.json', window.location.href);
  const res = await fetch(jsonUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(
      window.location.protocol === 'file:'
        ? 'Open the site via the server: run npm start, then visit http://localhost:3000'
        : 'Could not load trips-data.json'
    );
  }

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid trips data');
  return data;
}

function esc(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;');
}

function tripCardHtml(t) {
  const hero = esc(t.heroImage || '');
  const name = esc(t.name || 'Trip');
  const badge = esc(t.badge || '');
  const location = esc(t.location || '');
  const rating = esc(t.rating || '');
  const duration = esc(t.duration || '');
  const travelers = esc(t.travelers || '');
  const price = esc(t.price || '');
  const id = esc(t.id || '');

  return `
    <div class="trip-card">
      <div class="trip-img" style="background-image:url('${hero}')">
        <span class="trip-badge">${badge}</span>
      </div>
      <div class="trip-info">
        <div class="trip-meta"><span>📍 ${location}</span><span class="rating">${rating}★</span></div>
        <p>${duration} &nbsp;|&nbsp; ${travelers}</p>
        <div class="trip-price">Starts from <strong>${price}</strong> / per person</div>
        <a href="trip.html?id=${id}" class="btn-sm">View trip</a>
      </div>
    </div>`;
}

function catCardHtml(t) {
  const hero = esc(t.heroImage || '');
  const name = esc(t.name || 'Trip');
  const id = esc(t.id || '');
  const img = hero
    ? `<img src="${hero}" alt="${name}" />`
    : `<div class="cat-card-placeholder"></div>`;

  return `
    <a class="cat-card" href="trip.html?id=${id}">
      ${img}
      <span>${name}</span>
    </a>`;
}

function renderCategoryTrack(trips) {
  const track = document.getElementById('catTrack');
  if (!track) return;
  const validTrips = trips.filter(t => t.id && t.name);
  if (!validTrips.length) {
    track.innerHTML = '';
    return;
  }
  const cards = validTrips.map(catCardHtml).join('');
  track.innerHTML = cards + cards;
}
