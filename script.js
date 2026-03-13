/* ===========================
   iSelfStore — JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ───────────────────────────
  // 1. STICKY NAV ON SCROLL
  // ───────────────────────────
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ───────────────────────────
  // 2. MOBILE HAMBURGER MENU
  // ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ───────────────────────────
  // 3. SMOOTH SCROLL FOR NAV
  // ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ───────────────────────────
  // 4. SCROLL REVEAL ANIMATION
  // ───────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ───────────────────────────
  // 5. INTERACTIVE SCHEMATIC SITE MAP
  // ───────────────────────────
  const unitData = {
    red: {
      name: 'Red Storage Unit',
      detail: '226 sq ft · 2.4m × 5.46m × 3.46m',
      price: 'From £112.50/mo (50% off promo)',
      color: '#d63031',
      fullPrice: '£225/mo'
    },
    grey: {
      name: 'Grey Storage Unit',
      detail: '312 sq ft · 2.4m × 7.71m × 3.46m',
      price: 'From £129.50/mo (50% off promo)',
      color: '#636e72',
      fullPrice: '£259/mo'
    },
    blue: {
      name: 'Blue Storage Unit',
      detail: '355 sq ft · 2.4m × 9.94m × 3.46m',
      price: 'From £154.50/mo (50% off promo)',
      color: '#0984e3',
      fullPrice: '£309/mo'
    }
  };

  // Define the facility layout as percentages of the schematic container
  // Matching the actual site plan: 3 rows with matching colours
  const facilityUnits = [
    // === Top row (north side) ===
    // Grey units (left cluster)
    { type: 'grey', x: 14, y: 14, w: 7.5, h: 14 },
    { type: 'grey', x: 22.5, y: 14, w: 7.5, h: 14 },
    { type: 'grey', x: 31, y: 14, w: 7.5, h: 14 },

    // Red units (middle cluster)
    { type: 'red', x: 40, y: 14, w: 5.5, h: 14 },
    { type: 'red', x: 46.5, y: 14, w: 5.5, h: 14 },
    { type: 'red', x: 53, y: 14, w: 5.5, h: 14 },
    { type: 'red', x: 59.5, y: 14, w: 5.5, h: 14 },

    // Grey + Red (right cluster)
    { type: 'grey', x: 69, y: 14, w: 7.5, h: 14 },
    { type: 'red', x: 77.5, y: 14, w: 5.5, h: 14 },
    { type: 'red', x: 84, y: 14, w: 5.5, h: 14 },

    // === Middle row (centre — BLUE units) ===
    { type: 'blue', x: 12, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 19.5, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 27, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 34.5, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 42, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 49.5, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 57, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 64.5, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 72, y: 38, w: 6.5, h: 22 },
    { type: 'blue', x: 79.5, y: 38, w: 6.5, h: 22 },

    // === Right side vertical red units ===
    { type: 'red', x: 89, y: 30, w: 5.5, h: 9 },
    { type: 'red', x: 89, y: 40, w: 5.5, h: 9 },
    { type: 'red', x: 89, y: 50, w: 5.5, h: 9 },

    // === Bottom row (south side — red units) ===
    { type: 'red', x: 12, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 18.5, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 25, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 31.5, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 38, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 44.5, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 51, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 57.5, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 64, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 70.5, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 77, y: 72, w: 5.5, h: 12 },
    { type: 'red', x: 83.5, y: 72, w: 5.5, h: 12 },

    // Grey units (bottom-right)
    { type: 'grey', x: 89, y: 72, w: 7, h: 12 },
  ];

  const sitemapInner = document.getElementById('sitemap-inner');
  const tooltip = document.getElementById('map-tooltip');
  const tooltipDot = document.getElementById('tooltip-dot');
  const tooltipName = document.getElementById('tooltip-name');
  const tooltipDetail = document.getElementById('tooltip-detail');
  const tooltipPrice = document.getElementById('tooltip-price');

  // Create unit elements
  const allMapUnits = [];
  facilityUnits.forEach((unit, i) => {
    const el = document.createElement('div');
    el.className = `map-unit ${unit.type}`;
    el.dataset.unit = unit.type;
    el.style.left = unit.x + '%';
    el.style.top = unit.y + '%';
    el.style.width = unit.w + '%';
    el.style.height = unit.h + '%';
    el.setAttribute('data-index', i);
    sitemapInner.appendChild(el);
    allMapUnits.push(el);
  });

  // Tooltip handling
  allMapUnits.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const type = el.dataset.unit;
      const data = unitData[type];
      if (!data) return;

      tooltipDot.style.background = data.color;
      tooltipName.textContent = data.name;
      tooltipDetail.textContent = data.detail;
      tooltipPrice.textContent = data.price;
      tooltipPrice.style.color = data.color;

      tooltip.classList.add('visible');

      // Highlight same type
      allMapUnits.forEach(u => {
        if (u.dataset.unit === type) {
          u.style.opacity = '1';
          u.style.filter = 'brightness(1.2)';
        } else {
          u.style.opacity = '0.4';
        }
      });
    });

    el.addEventListener('mousemove', (e) => {
      let x = e.clientX + 16;
      let y = e.clientY - tooltip.offsetHeight - 8;

      // Keep within viewport
      if (x + tooltip.offsetWidth > window.innerWidth - 20) {
        x = e.clientX - tooltip.offsetWidth - 16;
      }
      if (y < 10) {
        y = e.clientY + 20;
      }

      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });

    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
      allMapUnits.forEach(u => {
        u.style.opacity = '';
        u.style.filter = '';
      });
    });

    el.addEventListener('click', () => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const navHeight = nav.offsetHeight;
        const targetPos = pricingSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // Legend highlights
  document.querySelectorAll('[data-legend]').forEach(legendItem => {
    legendItem.addEventListener('mouseenter', () => {
      const type = legendItem.dataset.legend;
      allMapUnits.forEach(u => {
        if (u.dataset.unit === type) {
          u.style.opacity = '1';
          u.style.filter = 'brightness(1.2)';
          u.style.transform = 'scale(1.05)';
        } else {
          u.style.opacity = '0.3';
        }
      });
    });
    legendItem.addEventListener('mouseleave', () => {
      allMapUnits.forEach(u => {
        u.style.opacity = '';
        u.style.filter = '';
        u.style.transform = '';
      });
    });
  });

  // ───────────────────────────
  // 6. CONTACT FORM VALIDATION
  // ───────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name');
      const phone = document.getElementById('contact-phone');
      const email = document.getElementById('contact-email');

      let valid = true;

      [name, phone, email].forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = '#d63031';
        valid = false;
      }
      if (!phone.value.trim()) {
        phone.style.borderColor = '#d63031';
        valid = false;
      }
      if (!email.value.trim() || !email.value.includes('@')) {
        email.style.borderColor = '#d63031';
        valid = false;
      }

      if (valid) {
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '✓ Enquiry Sent!';
        btn.style.background = '#00b894';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // ───────────────────────────
  // 7. COUNTER ANIMATION
  // ───────────────────────────
  const animateCounter = (el, target, suffix = '') => {
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current + suffix;
    }, 30);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statEls = entry.target.querySelectorAll('.stat-number');
        statEls.forEach(el => {
          const text = el.textContent.trim();
          if (text === '65') {
            animateCounter(el, 65);
          } else if (text === '3') {
            animateCounter(el, 3);
          }
          // '24/7' stays as-is
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) statsObserver.observe(aboutStats);

});
