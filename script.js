// Immediate image error & load listeners (kept early so inline onerror/onload
// attributes in the HTML always have these functions available)
function handleHeroImageFallback(img) {
  if (!img) return;
  img.classList.add('is-hidden');
  const fallback = document.getElementById('hero-fallback-ui');
  if (fallback) fallback.classList.add('active');
}

function handleTransFallback(img, fallbackId) {
  if (!img) return;
  img.classList.add('is-hidden');
  const fallback = document.getElementById(fallbackId);
  if (fallback) fallback.classList.add('active');
}

function handleCertLoad(level) {
  const img = document.getElementById('cert' + level + '-img');
  const plate = document.getElementById('cert' + level + '-display-plate');
  if (img) img.classList.remove('is-hidden');
  if (plate) plate.classList.add('is-hidden');
}

function handleCertError(level) {
  const img = document.getElementById('cert' + level + '-img');
  const plate = document.getElementById('cert' + level + '-display-plate');
  if (img) img.classList.add('is-hidden');
  if (plate) plate.classList.remove('is-hidden');
}

// Copyright Year
document.getElementById('year-label').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scrollspy Highlight with IntersectionObserver
const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
const sections = document.querySelectorAll('section[id]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        if (link.getAttribute('data-section') === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, {
  root: null,
  rootMargin: '-20% 0px -55% 0px',
  threshold: 0
});

sections.forEach(sec => spyObserver.observe(sec));

// Smooth Anchor Scroll with Fixed Header Offset
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const headerHeight = 76;
      const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: pos,
        behavior: 'smooth'
      });
    }
  });
});

// Lightbox Functionality
function openLightbox(targetKey) {
  const modal = document.getElementById('lightbox');
  const heading = document.getElementById('lightbox-heading');
  const container = document.getElementById('lightbox-container');

  if (targetKey === 'cert1') {
    heading.textContent = 'Team Boss Fitness Academy - Master Trainer Level 1';
    const img = document.getElementById('cert1-img');
    if (img && !img.classList.contains('is-hidden') && img.src) {
      container.innerHTML = `<img src="${img.src}" alt="Master Trainer Level 1 Certificate" />`;
    } else {
      container.innerHTML = document.getElementById('cert1-display-plate').outerHTML;
    }
  } else if (targetKey === 'cert2') {
    heading.textContent = 'Team Boss Fitness Academy - Master Trainer Level 2';
    const img = document.getElementById('cert2-img');
    if (img && !img.classList.contains('is-hidden') && img.src) {
      container.innerHTML = `<img src="${img.src}" alt="Master Trainer Level 2 Certificate" />`;
    } else {
      container.innerHTML = document.getElementById('cert2-display-plate').outerHTML;
    }
  } else if (targetKey === 'santhosh') {
    heading.textContent = 'Santhosh: March 2023 to Sept 2023 Transformation';
    const img = document.getElementById('santhosh-img');
    const src = (img && !img.classList.contains('is-hidden') && img.src) ? img.src : 'images/Santhosh-Transformation.jpg';
    container.innerHTML = `<img src="${src}" alt="Santhosh Transformation" />`;
  } else if (targetKey === 'kodeeswaran') {
    heading.textContent = 'Kodeeswaran: 83 kg to 63.20 kg Transformation';
    const img = document.getElementById('kodeeswaran-img');
    const src = (img && !img.classList.contains('is-hidden') && img.src) ? img.src : 'images/Kodeeswaran-Transformation.jpg';
    container.innerHTML = `<img src="${src}" alt="Kodeeswaran Transformation" />`;
  } else if (targetKey === 'coach') {
    heading.textContent = 'Coach Jeyaprakash Murugan - Personal Transformation';
    const beforeImg = document.getElementById('coach-before-img');
    const afterImg = document.getElementById('coach-after-img');
    const beforeSrc = (beforeImg && !beforeImg.classList.contains('is-hidden') && beforeImg.src) ? beforeImg.src : 'images/Jp-before.jpg';
    const afterSrc = (afterImg && !afterImg.classList.contains('is-hidden') && afterImg.src) ? afterImg.src : 'images/Jp-after.jpg';
    container.innerHTML = `
      <div class="lightbox-dual-grid">
        <div class="lightbox-photo-card">
          <span class="lightbox-tag-before">BEFORE</span>
          <img src="${beforeSrc}" alt="Jeyaprakash Before" />
        </div>
        <div class="lightbox-photo-card">
          <span class="lightbox-tag-after">AFTER</span>
          <img src="${afterSrc}" alt="Jeyaprakash After" />
        </div>
      </div>`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
