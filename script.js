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
const catTrack = document.getElementById('catTrack');
if (grid || catTrack) {
  loadTrips()
    .then(trips => {
      if (grid) renderTrips(trips);
      if (catTrack) renderCategoryTrack(trips);
    })
    .catch(() => {
      if (grid) {
        grid.innerHTML = '<p style="text-align:center;color:#666;padding:40px;grid-column:1/-1">Could not load trips.</p>';
      }
    });
}

// ── CARE SECTION SLIDER ──────────────────────────────────────────────────────
const careSlider = document.querySelector('.care-img-slider');
if (careSlider) {
  const slidesContainer = careSlider.querySelector('.care-slides');
  const allSlides = careSlider.querySelectorAll('.care-slide');
  const prevButton = careSlider.querySelector('.slider-btn.prev');
  const nextButton = careSlider.querySelector('.slider-btn.next');
  let currentSlideIndex = 0;
  let slideIntervalId;

  const totalSlidesCount = allSlides.length;

  if (totalSlidesCount <= 1) {
    if (prevButton) prevButton.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
  } else {
    const goToSlide = (index) => {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      currentSlideIndex = index;
    };

    const showNextSlide = () => {
      goToSlide((currentSlideIndex + 1) % totalSlidesCount);
    };

    const startAutoSlider = () => {
      slideIntervalId = setInterval(showNextSlide, 4000); // Change slide every 4 seconds
    };

    const stopAutoSlider = () => clearInterval(slideIntervalId);

    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', () => goToSlide((currentSlideIndex - 1 + totalSlidesCount) % totalSlidesCount));

    careSlider.addEventListener('mouseenter', stopAutoSlider);
    careSlider.addEventListener('mouseleave', startAutoSlider);

    startAutoSlider();
  }
}
