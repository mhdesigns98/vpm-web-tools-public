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

    const navLinks = Array.from(root.querySelectorAll('.nav-link'));
    const sections = Array.from(root.querySelectorAll('.impact-section[id]'));

    if (navLinks.length === 0 || sections.length === 0) {
      return;
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
      };

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

    // Set initial active state
    if (sections[0]) {
      setActive(sections[0].id);
    }

    // Debug logging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (window.console) {
        console.log('VPM Impact Component initialized', {
          sections: sections.length,
          navLinks: navLinks.length,
          letterDetails: letterDetails.length
        });
      }
    }
  }
})();
