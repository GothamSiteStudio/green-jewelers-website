// ===== Green Jewelers - Main JavaScript (Luxury Light Theme) =====

document.addEventListener('DOMContentLoaded', function () {

  // --- Respect reduced motion preference ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile Navigation Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Sparkle Particle Generator ---
  var sparkleContainer = document.querySelector('.sparkle-container');
  if (sparkleContainer && !prefersReducedMotion) {
    for (var i = 0; i < 25; i++) {
      var sparkle = document.createElement('span');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.setProperty('--delay', (Math.random() * 4) + 's');
      sparkle.style.setProperty('--duration', (4 + Math.random() * 4) + 's');
      var size = 2 + Math.random() * 3;
      sparkle.style.width = size + 'px';
      sparkle.style.height = size + 'px';
      sparkleContainer.appendChild(sparkle);
    }
  }

  // --- Scroll Reveal System ---
  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --- Image Reveal Animation (clip-path) ---
  var imgRevealElements = document.querySelectorAll('.img-reveal');
  if ('IntersectionObserver' in window && imgRevealElements.length > 0 && !prefersReducedMotion) {
    var imgRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          imgRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    imgRevealElements.forEach(function (el) {
      imgRevealObserver.observe(el);
    });
  }

  // --- Staggered Card Entrance ---
  var animateElements = document.querySelectorAll(
    '.value-card, .category-card, .step-card, .testimonial-card, .meeting-card, .about-value, .collection-item, .product-card'
  );
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(function (el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1) ' + (index % 4) * 0.12 + 's, transform 0.7s cubic-bezier(.22,1,.36,1) ' + (index % 4) * 0.12 + 's';
      cardObserver.observe(el);
    });
  }

  // --- Parallax Effect on Hero Image ---
  var parallaxImgs = document.querySelectorAll('.parallax-img');
  if (parallaxImgs.length > 0 && !prefersReducedMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          parallaxImgs.forEach(function (img) {
            var rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              var offset = (scrollY - img.offsetTop + window.innerHeight) * 0.08;
              img.style.transform = 'translateY(' + offset + 'px)';
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Counter Animation for Hero Stats ---
  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var text = el.textContent.trim();
    var match = text.match(/^(\d+)(.*)$/);
    if (!match) return;
    var target = parseInt(match[1], 10);
    var suffix = match[2] || '';
    var duration = 1800;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        faqItems.forEach(function (i) { i.classList.remove('active'); });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Form submission handler ---
  var consultationForm = document.getElementById('consultation-form');
  if (consultationForm) {
    consultationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = this.querySelector('.form-submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Thank You! We\'ll Be in Touch Soon.';
      submitBtn.disabled = true;
      submitBtn.style.background = 'var(--gold)';
      submitBtn.style.borderColor = 'var(--gold)';

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        consultationForm.reset();
      }, 4000);
    });
  }

  // --- Active nav link based on current page ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Collection / Product filter tabs ---
  var filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    var gridItems = document.querySelectorAll('.collection-item, .product-card');
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var filter = btn.getAttribute('data-filter');
        gridItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            item.style.opacity = '0';
            item.style.transform = 'translateY(16px)';
            requestAnimationFrame(function () {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- Magnetic hover effect on CTA buttons ---
  if (!prefersReducedMotion) {
    document.querySelectorAll('.hero-buttons .btn, .cta-buttons .btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

});