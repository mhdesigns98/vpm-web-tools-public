(function() {
  'use strict';

  // Find all instances of the component on the page
  const components = document.querySelectorAll('.vpm-impact-component');
  
  if (components.length === 0) {
    if (window.console && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      console.warn('VPM Impact Component: No .vpm-impact-component found on page');
    }
    return;
  }

  // Initialize each component instance
  components.forEach(function(root) {
    initializeComponent(root);
  });

  function initializeComponent(root) {
    const smoothScrollTo = function(element) {
      if ('scrollBehavior' in document.documentElement.style) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 600;
        let start = null;

        const easeInOutCubic = function(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = function(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutCubic(progress);
          window.scrollTo(0, startPosition + distance * ease);
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };

    const nav = root.querySelector('.impact-nav');
    const navLinks = Array.from(root.querySelectorAll('.nav-link'));
    const sections = Array.from(root.querySelectorAll('.impact-section[id]'));

    if (navLinks.length === 0 || sections.length === 0) {
      return;
    }

    // Enhanced sticky nav detection
    if (nav) {
      const navObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.intersectionRatio < 1) {
              nav.classList.add('is-stuck');
            } else {
              nav.classList.remove('is-stuck');
            }
          });
        },
        {
          threshold: [1],
          rootMargin: '0px 0px 0px 0px'
        }
      );
      
      // Create a sentinel element to detect when nav becomes stuck
      const sentinel = document.createElement('div');
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0';
      sentinel.style.height = '1px';
      sentinel.style.width = '1px';
      sentinel.style.pointerEvents = 'none';
      root.insertBefore(sentinel, nav);
      
      navObserver.observe(sentinel);
    }

    const setActive = function(id) {
      navLinks.forEach(function(a) {
        const isActive = a.getAttribute('href') === '#' + id;
        a.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    // Handle nav link clicks
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        // Find target within this component instance
        const target = root.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        smoothScrollTo(target);
        setActive(href.slice(1));
        
        // Update URL without scrolling (for shareability)
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      });
    });

    // Intersection Observer for active nav state
    const observer = new IntersectionObserver(
      function(entries) {
        const visible = entries
          .filter(function(e) { return e.isIntersecting; })
          .sort(function(a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: [0.08, 0.15, 0.25, 0.4],
      }
    );

    sections.forEach(function(s) {
      observer.observe(s);
    });

    // Letter details/summary functionality
    const letterDetails = Array.from(root.querySelectorAll('.letter-details'));
    
    letterDetails.forEach(function(details) {
      const summary = details.querySelector('.readmore');
      if (!summary) return;

      const closedText = 'Read full letter';
      const openText = 'Collapse letter';
      
      const updateSummaryText = function() {
        const isOpen = details.hasAttribute('open');
        summary.textContent = isOpen ? openText : closedText;
        summary.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };

      // Set initial state
      summary.setAttribute('aria-expanded', 'false');
      summary.setAttribute('role', 'button');
      summary.setAttribute('aria-controls', details.id || 'letter-details-' + Math.random().toString(36).substr(2, 9));
      
      if (!details.id) {
        details.id = summary.getAttribute('aria-controls');
      }

      details.addEventListener('toggle', updateSummaryText);

      summary.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (details.hasAttribute('open')) {
            details.removeAttribute('open');
          } else {
            details.setAttribute('open', '');
          }
        }
      });
    });

    // Handle hash on page load
    if (window.location.hash) {
      const target = root.querySelector(window.location.hash);
      if (target) {
        // Small delay to ensure page is loaded
        setTimeout(function() {
          smoothScrollTo(target);
          setActive(window.location.hash.slice(1));
        }, 100);
      }
    }

    // Set initial active state
    if (sections[0]) {
      setActive(sections[0].id);
    }

    // Image loading enhancement - add loaded class when images load
    const images = root.querySelectorAll('img');
    images.forEach(function(img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
        img.addEventListener('error', function() {
          img.classList.add('error');
          // Add alt text as fallback if image fails
          if (img.alt && !img.parentElement.querySelector('.image-error')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'image-error';
            errorMsg.textContent = img.alt;
            errorMsg.style.padding = '1rem';
            errorMsg.style.background = 'rgba(0,0,0,0.05)';
            errorMsg.style.borderRadius = '4px';
            errorMsg.style.fontSize = '0.875rem';
            errorMsg.style.color = 'var(--text-secondary)';
            img.parentElement.appendChild(errorMsg);
          }
        });
      }
    });

    // Debug logging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (window.console) {
        console.log('VPM Impact Component initialized', {
          sections: sections.length,
          navLinks: navLinks.length,
          letterDetails: letterDetails.length,
          images: images.length
        });
      }
    }
  }
})();
