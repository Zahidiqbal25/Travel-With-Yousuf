// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.boxShadow =
    window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,.12)' : '0 1px 8px rgba(0,0,0,.08)';
});

// ── TRIPS GRID ────────────────────────────────────────────────────────────────
function renderTrips(trips) {
  const grid = document.getElementById('trips-grid');
  if (!grid) return;
  if (!trips.length) {
    grid.innerHTML = '<p style="text-align:center;color:#666;padding:40px;grid-column:1/-1">No trips available right now.</p>';
    return;
  }
  grid.innerHTML = trips.map(tripCardHtml).join('');
}

const grid = document.getElementById('trips-grid');
if (grid) {
  loadTrips()
    .then(trips => renderTrips(trips))
    .catch(() => {
      grid.innerHTML = '<p style="text-align:center;color:#666;padding:40px;grid-column:1/-1">Could not load trips.</p>';
    });
}
