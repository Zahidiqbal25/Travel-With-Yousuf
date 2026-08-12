const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadTrip(tripId) {
  if (window.location.protocol !== 'file:') {
    try {
      const res = await fetch(`/api/trips/${tripId}`);
      if (res.ok) return res.json();
    } catch (_) {}
  }

  const trips = await loadTrips();
  const trip = trips.find(t => t.id === tripId);
  if (!trip) throw new Error('Trip not found');
  return trip;
}

loadTrip(id)
  .then(trip => renderTrip(trip))
  .catch(() => {
    document.querySelector('.trip-body').innerHTML =
      '<p style="padding:60px 40px;font-size:18px;color:#6b7280;">Trip not found. <a href="index.html" style="color:#1a6b3c;font-weight:600;">Go back home</a></p>';
  });

function renderTrip(trip) {
  document.title = trip.name + ' | Travel With Yousuf';
  document.getElementById('breadcrumbName').textContent = trip.name;

  document.getElementById('tripHero').style.backgroundImage = `url('${trip.heroImage}')`;
  document.getElementById('tripTitle').textContent = trip.title;

  document.getElementById('galleryImg1').src = trip.images[0];
  document.getElementById('galleryImg1').alt = trip.name;
  document.getElementById('galleryImg2').src = trip.images[1];
  document.getElementById('galleryImg2').alt = trip.name;
  document.getElementById('galleryImg3').src = trip.images[2];
  document.getElementById('galleryImg3').alt = trip.name;

  document.getElementById('tripName').textContent = trip.name;
  document.getElementById('tripDescription').textContent = trip.description;

  document.getElementById('planDays').innerHTML = trip.days.map(d => `
    <div class="plan-day">
      <h4>${d.day}</h4>
      <p>${d.detail}</p>
    </div>
  `).join('');

  document.getElementById('included').innerHTML = trip.included.map(i => `<li>${i}</li>`).join('');
  document.getElementById('excluded').innerHTML = trip.excluded.map(i => `<li>${i}</li>`).join('');

  document.getElementById('sidebarPrice').textContent = trip.price;

  const meta = [
    { icon: '🕐', label: 'Duration',       value: trip.duration },
    { icon: '👥', label: 'Package type',   value: trip.type },
    { icon: '📍', label: 'Location',       value: trip.location },
    { icon: '🏷️', label: 'Category',       value: trip.category },
    { icon: '👤', label: 'Max group size', value: trip.groupSize },
    { icon: '🎂', label: 'Min age',        value: trip.minAge },
    { icon: '🗺️', label: 'Destinations',   value: trip.destinations },
  ];
  document.getElementById('sidebarMeta').innerHTML = meta.map(m => `
    <div class="meta-item">
      <div class="meta-icon">${m.icon}</div>
      <div class="meta-text">
        <strong>${m.label}</strong>
        <span>${m.value}</span>
      </div>
    </div>
  `).join('');
}
