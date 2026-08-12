/**
 * Load trips from the API (when server is running) or trips-data.json (static fallback).
 */
async function loadTrips() {
  if (window.location.protocol !== 'file:') {
    try {
      const res = await fetch('/api/trips');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (_) {
      // API unavailable — fall through to JSON file
    }
  }

  const jsonUrl = new URL('trips-data.json', window.location.href);
  const res = await fetch(jsonUrl);
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

function tripCardHtml(t) {
  const hero = (t.heroImage || '').replace(/'/g, '%27');
  const name = t.name || 'Trip';
  const badge = t.badge || '';
  const location = t.location || '';
  const rating = t.rating || '';
  const duration = t.duration || '';
  const travelers = t.travelers || '';
  const price = t.price || '';
  const id = t.id || '';

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
