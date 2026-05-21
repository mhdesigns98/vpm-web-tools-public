// VPM Colors
const VPM_COLORS = {
  darkBlue: "#003865",
  lightBlue: "#6CACE4",
  yellow: "#E0E721",
  red: "#EE2737",
  black: "#101820",
  gray: "#B2B4B2",
};

// State management
let isDark = false;
let copiedId = null;
let expandedSections = new Set();

// Banner data
const banners = [
  {
    id: "alert",
    title: "Simple Text Alert Banner",
    description: "Dismissible alert with accessible close button",
    embedCode: `<!-- Simple Text Alert Banner - VPM Brand -->
<div role="alert" aria-live="polite" id="alert-banner" style="background-color: #ffffff; color: #101820; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.5; border-top: 3px solid #EE2737;">
  <p style="margin: 0; flex: 1;">
    <strong>Important:</strong> Our offices will be closed on Monday for the holiday. Regular hours resume Tuesday.
  </p>
  <button onclick="document.getElementById('alert-banner').style.display='none'" aria-label="Close alert" style="background: transparent; border: none; color: #101820; font-size: 24px; cursor: pointer; padding: 0 8px; margin-left: 16px; line-height: 1;">
    ×
  </button>
</div>
<script>
  (function() {
    const banner = document.getElementById('alert-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
      banner.style.color = isDark ? '#ffffff' : '#101820';
      banner.querySelector('button').style.color = isDark ? '#ffffff' : '#101820';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "cta",
    title: "CTA Banner with Button",
    description: "Call-to-action banner with prominent button",
    embedCode: `<!-- CTA Banner with Button - VPM Brand -->
<div role="banner" style="background-color: #003865; color: #ffffff; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.5;" id="cta-banner">
  <p style="margin: 0; flex: 1; min-width: 200px;">
    <strong>Support quality journalism.</strong> Your donation helps us continue our mission.
  </p>
  <a href="https://example.com/donate" style="background-color: #EE2737; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; white-space: nowrap; display: inline-block; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
    Donate Now
  </a>
</div>
<script>
  (function() {
    const banner = document.getElementById('cta-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#051328' : '#003865';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "email-signup",
    title: "Email Newsletter Signup Banner",
    description: "Inline email capture form with validation",
    embedCode: `<!-- Email Newsletter Signup Banner - VPM Brand -->
<div role="region" aria-label="Newsletter signup" style="background: linear-gradient(135deg, #003865 0%, #6CACE4 100%); color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="email-banner">
  <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 250px;">
      <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Stay Informed</h3>
      <p style="margin: 0; font-size: 14px; opacity: 0.9;">Get our weekly newsletter delivered to your inbox.</p>
    </div>
    <form onsubmit="alert('Form submitted!'); return false;" style="display: flex; gap: 8px; flex: 1; min-width: 300px; max-width: 400px;">
      <input type="email" required placeholder="Enter your email" aria-label="Email address" style="flex: 1; padding: 10px 16px; border: none; border-radius: 4px; font-size: 14px; outline: none; background: #ffffff; color: #101820;">
      <button type="submit" style="background-color: #EE2737; color: #ffffff; padding: 10px 24px; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
        Subscribe
      </button>
    </form>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('email-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.background = isDark 
        ? 'linear-gradient(135deg, #051328 0%, #1a4a5e 100%)'
        : 'linear-gradient(135deg, #003865 0%, #6CACE4 100%)';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "urgent",
    title: "Urgent Alert with Icon",
    description: "High-visibility alert for critical messages",
    embedCode: `<!-- Urgent Alert with Icon - VPM Brand -->
<div role="alert" aria-live="assertive" style="background-color: #EE2737; color: #ffffff; padding: 12px 20px; display: flex; align-items: center; gap: 12px; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.5; border-left: 4px solid #CC1D29;">
  <svg aria-hidden="true" style="width: 24px; height: 24px; flex-shrink: 0;" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
  <p style="margin: 0; flex: 1;">
    <strong>Weather Alert:</strong> Severe thunderstorm warning in effect until 8 PM. Seek shelter immediately.
  </p>
</div>`,
  },
  {
    id: "countdown",
    title: "Event Countdown Banner",
    description: "Live countdown timer for upcoming events",
    embedCode: `<!-- Event Countdown Banner - VPM Brand -->
<div role="banner" style="background-color: #003865; color: #ffffff; padding: 16px 20px; font-family: system-ui, -apple-system, sans-serif;" id="countdown-banner">
  <div style="max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 200px;">
      <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700;">Annual Fundraising Gala</h3>
      <p style="margin: 0; font-size: 13px; opacity: 0.8;">Join us for an evening of celebration</p>
    </div>
    <div id="countdown-timer" style="display: flex; gap: 16px; align-items: center;">
      <div style="text-align: center;">
        <div id="days" style="font-size: 28px; font-weight: 700; line-height: 1;">00</div>
        <div style="font-size: 11px; opacity: 0.7; text-transform: uppercase; margin-top: 2px;">Days</div>
      </div>
      <div style="font-size: 24px; opacity: 0.5;">:</div>
      <div style="text-align: center;">
        <div id="hours" style="font-size: 28px; font-weight: 700; line-height: 1;">00</div>
        <div style="font-size: 11px; opacity: 0.7; text-transform: uppercase; margin-top: 2px;">Hours</div>
      </div>
      <div style="font-size: 24px; opacity: 0.5;">:</div>
      <div style="text-align: center;">
        <div id="minutes" style="font-size: 28px; font-weight: 700; line-height: 1;">00</div>
        <div style="font-size: 11px; opacity: 0.7; text-transform: uppercase; margin-top: 2px;">Min</div>
      </div>
      <div style="font-size: 24px; opacity: 0.5;">:</div>
      <div style="text-align: center;">
        <div id="seconds" style="font-size: 28px; font-weight: 700; line-height: 1;">00</div>
        <div style="font-size: 11px; opacity: 0.7; text-transform: uppercase; margin-top: 2px;">Sec</div>
      </div>
    </div>
    <a href="https://example.com/register" style="background-color: #EE2737; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; white-space: nowrap; display: inline-block; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
      Register Now
    </a>
  </div>
</div>
<script>
(function() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  const banner = document.getElementById('countdown-banner');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
  
  function applyTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (banner) banner.style.backgroundColor = isDark ? '#051328' : '#003865';
  }
  
  updateCountdown();
  applyTheme();
  setInterval(updateCountdown, 1000);
  
  const observer = new MutationObserver(applyTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})();
</script>`,
  },
  {
    id: "multi-line",
    title: "Multi-Line Information Banner",
    description: "Rich content banner with multiple text sections",
    embedCode: `<!-- Multi-Line Information Banner - VPM Brand -->
<div role="region" aria-label="Important information" style="background-color: #f5f5f5; color: #101820; padding: 20px; border-left: 4px solid #003865; font-family: system-ui, -apple-system, sans-serif; border-top: 1px solid #E0E721; border-bottom: 1px solid #E0E721;" id="multi-line-banner">
  <div style="max-width: 1000px; margin: 0 auto;">
    <div style="display: flex; align-items: start; gap: 16px;">
      <svg style="width: 28px; height: 28px; flex-shrink: 0; color: #003865; margin-top: 2px;" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
      </svg>
      <div style="flex: 1;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #003865;">Programming Schedule Update</h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.6; color: #333;">
          We're making changes to our broadcast schedule starting next month. Your favorite shows will air at new times to better serve our community.
        </p>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #333;">
          <strong>What's changing:</strong> Morning Edition moves to 5 AM, All Things Considered shifts to 4 PM, and we're adding a new local news hour at 6 PM.
        </p>
        <div style="margin-top: 12px;">
          <a href="https://example.com/schedule" style="color: #003865; font-size: 14px; font-weight: 600; text-decoration: underline;">View Full Schedule →</a>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('multi-line-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#1a1a1a' : '#f5f5f5';
      banner.style.color = isDark ? '#ffffff' : '#101820';
      banner.style.borderTopColor = isDark ? '#E0E721' : '#E0E721';
      banner.style.borderBottomColor = isDark ? '#E0E721' : '#E0E721';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "social-proof",
    title: "Social Proof Banner",
    description: "Build trust with statistics and testimonials",
    embedCode: `<!-- Social Proof Banner - VPM Brand -->
<div role="banner" style="background: linear-gradient(to right, #003865, #6CACE4); color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="social-proof-banner">
  <div style="max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 24px; text-align: center;">
    <div style="flex: 1; min-width: 150px;">
      <div style="font-size: 36px; font-weight: 700; line-height: 1;">250K+</div>
      <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">Weekly Listeners</div>
    </div>
    <div style="flex: 1; min-width: 150px;">
      <div style="font-size: 36px; font-weight: 700; line-height: 1;">50+</div>
      <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">Years Serving</div>
    </div>
    <div style="flex: 1; min-width: 150px;">
      <div style="font-size: 36px; font-weight: 700; line-height: 1;">15K+</div>
      <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">Active Members</div>
    </div>
    <div style="flex: 1; min-width: 200px;">
      <a href="https://example.com/join" style="background-color: #EE2737; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
        Join Our Community
      </a>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('social-proof-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.background = isDark 
        ? 'linear-gradient(to right, #051328, #1a4a5e)'
        : 'linear-gradient(to right, #003865, #6CACE4)';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "event-registration",
    title: "Event Registration Banner",
    description: "Date, time, location, capacity, and register button",
    embedCode: `<!-- Event Registration Banner - VPM Brand -->
<div role="banner" style="background: linear-gradient(135deg, #003865 0%, #6CACE4 100%); color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="event-reg-banner">
  <div style="max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
    <div style="flex: 1; min-width: 300px;">
      <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">Virtual Town Hall: Education & Community</h3>
      <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px; line-height: 1.5;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="font-weight: 600;">📅 October 15, 2025</span>
          <span>•</span>
          <span>7:00 PM - 8:30 PM ET</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="font-weight: 600;">📍 Online via Zoom</span>
          <span>•</span>
          <span>Limited to 500 participants</span>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="https://example.com/register" style="background-color: #EE2737; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
        Register Now
      </a>
      <a href="https://example.com/learn-more" style="background-color: transparent; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; border: 2px solid #ffffff; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
        Learn More
      </a>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('event-reg-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.background = isDark 
        ? 'linear-gradient(135deg, #051328 0%, #1a4a5e 100%)'
        : 'linear-gradient(135deg, #003865 0%, #6CACE4 100%)';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "live-broadcast",
    title: "Live Broadcast Banner",
    description: "'Now Live' badge with countdown timer and streaming options",
    embedCode: `<!-- Live Broadcast Banner - VPM Brand -->
<div role="banner" aria-live="polite" style="background: linear-gradient(90deg, #EE2737 0%, #CC1D29 100%); color: #ffffff; padding: 16px 20px; font-family: system-ui, -apple-system, sans-serif; animation: pulse 2s infinite;" id="live-broadcast-banner">
  <div style="max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="width: 12px; height: 12px; background-color: #fca5a5; border-radius: 50%; animation: blink 1s infinite;"></div>
      <div>
        <div style="font-size: 16px; font-weight: 700;">LIVE NOW</div>
        <div style="font-size: 13px; opacity: 0.9;">Evening News Broadcast with Special Report</div>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <a href="https://example.com/youtube" style="background-color: #EE2737; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 13px; border: 1px solid rgba(255,255,255,0.3); transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
        YouTube
      </a>
      <a href="https://example.com/facebook" style="background-color: transparent; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 13px; border: 1px solid rgba(255,255,255,0.5); transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
        Facebook
      </a>
      <a href="https://example.com/website" style="background-color: transparent; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 13px; border: 1px solid rgba(255,255,255,0.5); transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
        Website
      </a>
    </div>
  </div>
</div>
<style>
  @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: inset 0 0 0 rgba(238, 39, 55, 0.5); }
    50% { box-shadow: inset 0 0 10px rgba(238, 39, 55, 0.3); }
  }
</style>`,
  },
  {
    id: "documentary-release",
    title: "Documentary/Special Release",
    description: "Featured image, title, description, and 'Watch Now' options",
    embedCode: `<!-- Documentary Release Banner - VPM Brand -->
<div role="banner" style="background-color: #003865; color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="doc-banner">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px;">
    <div style="flex: 0 0 300px; height: 180px; background: linear-gradient(135deg, #6CACE4, #003865); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #B2B4B2;">
      [Documentary Image 16:9]
    </div>
    <div style="flex: 1; min-width: 300px;">
      <div style="display: inline-block; background-color: #E0E721; color: #101820; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">
        New Release
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; line-height: 1.3;">The Untold Stories: Virginia's Hidden History</h3>
      <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #B2B4B2;">
        An intimate look at the lives and struggles of ordinary Virginians who shaped our state. Now streaming on VPM+
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="https://example.com/watch" style="background-color: #EE2737; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; white-space: nowrap; display: inline-block; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
          Watch Now
        </a>
        <a href="https://example.com/details" style="background-color: transparent; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; border: 1px solid #E0E721; white-space: nowrap; display: inline-block; transition: all 0.2s;" onmouseover="this.style.borderColor='#EE2737'; this.style.color='#EE2737';" onmouseout="this.style.borderColor='#E0E721'; this.style.color='#ffffff';">
          Learn More
        </a>
      </div>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('doc-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#051328' : '#003865';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "series-announcement",
    title: "Series/Season Announcement",
    description: "Show title, season number, premiere date, and highlights",
    embedCode: `<!-- Series Announcement Banner - VPM Brand -->
<div role="banner" style="background: linear-gradient(to right, #003865, #6CACE4); color: #ffffff; padding: 24px 20px; font-family: system-ui, -apple-system, sans-serif;" id="series-banner">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
      <div style="flex: 1; min-width: 250px;">
        <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; margin-bottom: 8px; font-weight: 600;">New Season Coming</div>
        <h3 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; line-height: 1.2;">Commonwealth Chronicles</h3>
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 12px;">
          <div>
            <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase;">Season</div>
            <div style="font-size: 24px; font-weight: 700;">4</div>
          </div>
          <div style="width: 1px; height: 40px; background-color: rgba(255,255,255,0.2);"></div>
          <div>
            <div style="font-size: 12px; opacity: 0.8; text-transform: uppercase;">Premieres</div>
            <div style="font-size: 18px; font-weight: 700;">January 6</div>
          </div>
        </div>
        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #B2B4B2;">
          Join us as we explore the people, places, and moments that define Virginia. 8 new episodes, one story per week.
        </p>
        <a href="https://example.com/subscribe" style="background-color: #EE2737; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-block; white-space: nowrap; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
          Subscribe
        </a>
      </div>
      <div style="flex: 0 0 180px; height: 240px; background: linear-gradient(135deg, #6CACE4, #003865); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #B2B4B2;">
        [Season 4 Artwork]
      </div>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('series-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.background = isDark 
        ? 'linear-gradient(to right, #051328, #1a3a4d)'
        : 'linear-gradient(to right, #003865, #6CACE4)';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "festival-showcase",
    title: "Festival/Multi-Event Showcase",
    description: "Multiple events listed with dates and quick filters",
    embedCode: `<!-- Festival Showcase Banner - VPM Brand -->
<div role="banner" style="background-color: #003865; color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="festival-banner">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h3 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Virginia Arts Festival 2025</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
      <div style="background-color: #051328; padding: 16px; border-radius: 8px; border-left: 4px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 4px;">March 15</div>
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Jazz Under the Stars</div>
        <div style="font-size: 13px; color: #6CACE4; margin-bottom: 8px;">Capital Lawn, 8 PM</div>
        <a href="https://example.com/event1" style="color: #E0E721; text-decoration: none; font-weight: 600; font-size: 13px;">Get Tickets →</a>
      </div>
      <div style="background-color: #051328; padding: 16px; border-radius: 8px; border-left: 4px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 4px;">March 22</div>
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Theater & Performance Night</div>
        <div style="font-size: 13px; color: #6CACE4; margin-bottom: 8px;">Performing Arts Center, 7 PM</div>
        <a href="https://example.com/event2" style="color: #E0E721; text-decoration: none; font-weight: 600; font-size: 13px;">Get Tickets →</a>
      </div>
      <div style="background-color: #051328; padding: 16px; border-radius: 8px; border-left: 4px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 4px;">April 5</div>
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Documentary Premiere & Talk</div>
        <div style="font-size: 13px; color: #6CACE4; margin-bottom: 8px;">The Depot, 6 PM</div>
        <a href="https://example.com/event3" style="color: #E0E721; text-decoration: none; font-weight: 600; font-size: 13px;">Get Tickets →</a>
      </div>
    </div>
    <div style="margin-top: 16px; text-align: center;">
      <a href="https://example.com/festival" style="color: #E0E721; text-decoration: none; font-weight: 600; font-size: 14px;">View Full Schedule →</a>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('festival-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#051328' : '#003865';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
  {
    id: "vip-access",
    title: "VIP/Early Access Banner",
    description: "Exclusive offer for members with countdown and unlock mechanics",
    embedCode: `<!-- VIP Early Access Banner - VPM Brand -->
<div role="banner" style="background: linear-gradient(135deg, #003865 0%, #051328 100%); color: #ffffff; padding: 24px 20px; font-family: system-ui, -apple-system, sans-serif; border-top: 3px solid #E0E721; border-bottom: 3px solid #E0E721;" id="vip-banner">
  <div style="max-width: 1000px; margin: 0 auto;">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
      <div style="flex: 1; min-width: 280px;">
        <div style="display: inline-block; background-color: #E0E721; color: #101820; padding: 6px 14px; border-radius: 4px; font-size: 12px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase;">
          ✓ VIP Members Only
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700;">Get Early Access to Fundraising Gala Tickets</h3>
        <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #B2B4B2;">
          VIP members get 48-hour early access to purchase tickets before public sale. Plus complimentary cocktail hour.
        </p>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: #B2B4B2;">
          <span style="font-weight: 600;">Access expires in:</span>
          <span id="vip-countdown" style="font-weight: 700; color: #E0E721;">48:00:00</span>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <a href="https://example.com/buy-tickets" style="background-color: #EE2737; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; white-space: nowrap; text-align: center; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#CC1D29'" onmouseout="this.style.backgroundColor='#EE2737'">
          Buy Tickets Now
        </a>
        <a href="https://example.com/vip-info" style="background-color: transparent; color: #E0E721; padding: 10px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; border: 1px solid #E0E721; white-space: nowrap; text-align: center; transition: all 0.2s;" onmouseover="this.style.borderColor='#EE2737'; this.style.color='#EE2737';" onmouseout="this.style.borderColor='#E0E721'; this.style.color='#E0E721';">
          Not a Member?
        </a>
      </div>
    </div>
  </div>
</div>
<script>
(function() {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 48);
  const banner = document.getElementById('vip-banner');
  
  function updateVIPCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const elem = document.getElementById('vip-countdown');
    if (elem) elem.textContent = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }
  
  function applyTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (banner) banner.style.background = isDark 
      ? 'linear-gradient(135deg, #051328 0%, #0a0f1a 100%)'
      : 'linear-gradient(135deg, #003865 0%, #051328 100%)';
  }
  
  updateVIPCountdown();
  applyTheme();
  setInterval(updateVIPCountdown, 1000);
  
  const observer = new MutationObserver(applyTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})();
</script>`,
  },
  {
    id: "show-schedule",
    title: "Show Schedule Grid",
    description: "Calendar-style grid showing upcoming shows with dates and times",
    embedCode: `<!-- Show Schedule Grid Banner - VPM Brand -->
<div role="banner" style="background-color: #003865; color: #ffffff; padding: 20px; font-family: system-ui, -apple-system, sans-serif;" id="schedule-banner">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h3 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700;">This Week's Schedule</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Monday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Morning Edition</div>
          <div style="font-size: 12px; color: #6CACE4;">5:00 - 9:00 AM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">All Things Considered</div>
          <div style="font-size: 12px; color: #6CACE4;">4:00 - 6:30 PM</div>
        </div>
      </div>
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Tuesday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Commonwealth Chronicles</div>
          <div style="font-size: 12px; color: #6CACE4;">7:00 - 8:00 PM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Late Night Jazz</div>
          <div style="font-size: 12px; color: #6CACE4;">10:00 PM - 12:00 AM</div>
        </div>
      </div>
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Wednesday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Fresh Air</div>
          <div style="font-size: 12px; color: #6CACE4;">6:00 - 7:00 PM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Science Today</div>
          <div style="font-size: 12px; color: #6CACE4;">8:00 - 9:00 PM</div>
        </div>
      </div>
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Thursday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Documentary Hour</div>
          <div style="font-size: 12px; color: #6CACE4;">7:00 - 8:00 PM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Arts Spotlight</div>
          <div style="font-size: 12px; color: #6CACE4;">9:00 - 10:00 PM</div>
        </div>
      </div>
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Friday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Weekend Preview</div>
          <div style="font-size: 12px; color: #6CACE4;">5:00 - 6:00 PM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Live Session</div>
          <div style="font-size: 12px; color: #6CACE4;">8:00 - 9:00 PM</div>
        </div>
      </div>
      <div style="background-color: #051328; padding: 14px; border-radius: 6px; border-top: 3px solid #E0E721;">
        <div style="font-size: 12px; text-transform: uppercase; color: #B2B4B2; margin-bottom: 6px; font-weight: 600;">Saturday</div>
        <div style="margin-bottom: 10px;">
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Weekend Edition</div>
          <div style="font-size: 12px; color: #6CACE4;">9:00 - 12:00 PM</div>
        </div>
        <div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 2px;">Folk Music Friday</div>
          <div style="font-size: 12px; color: #6CACE4;">7:00 - 9:00 PM</div>
        </div>
      </div>
    </div>
    <div style="margin-top: 16px; text-align: center;">
      <a href="https://example.com/full-schedule" style="color: #E0E721; text-decoration: none; font-weight: 600; font-size: 14px;">View Full Schedule →</a>
    </div>
  </div>
</div>
<script>
  (function() {
    const banner = document.getElementById('schedule-banner');
    if (!banner) return;
    function applyTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      banner.style.backgroundColor = isDark ? '#051328' : '#003865';
    }
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();
</script>`,
  },
];

// Initialize theme
function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  const shouldBeDark = savedTheme === "dark" || (savedTheme === null && prefersDark);
  isDark = shouldBeDark;
  
  if (shouldBeDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  updateThemeIcon();
}

// Toggle theme
function toggleTheme() {
  isDark = !isDark;
  
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
  
  // Update aria-label
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  }
  
  // Re-render banners to update preview labels
  renderBanners();
}

// Update theme icon
function updateThemeIcon() {
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");
  
  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.add("hidden");
      sunIcon.classList.remove("hidden");
    } else {
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
    }
  }
}

// Copy to clipboard
async function copyToClipboard(code, id) {
  try {
    await navigator.clipboard.writeText(code);
    copiedId = id;
    updateCopyButton(id);
    setTimeout(() => {
      copiedId = null;
      updateCopyButton(id);
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

// Update copy button state
function updateCopyButton(id) {
  const button = document.querySelector(`[data-copy-id="${id}"]`);
  if (!button) return;
  
  if (copiedId === id) {
    button.innerHTML = `
      <svg class="check-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
      </svg>
      Copied!
    `;
  } else {
    button.innerHTML = `
      <svg class="copy-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
      </svg>
      Copy Code
    `;
  }
}

// Toggle section
function toggleSection(id) {
  if (expandedSections.has(id)) {
    expandedSections.delete(id);
  } else {
    expandedSections.add(id);
  }
  renderBanners();
}

// Render banners
function renderBanners() {
  const container = document.getElementById("banners-container");
  if (!container) return;
  
  container.innerHTML = banners.map(banner => {
    const isExpanded = expandedSections.has(banner.id);
    const isCopied = copiedId === banner.id;
    
    return `
      <div class="card banner-card">
        <div class="banner-header">
          <h3 class="banner-title">${escapeHtml(banner.title)}</h3>
          <p class="banner-description">${escapeHtml(banner.description)}</p>
        </div>
        
        <div class="preview-section">
          <div class="preview-label">
            Live Preview (${isDark ? "Dark" : "Light"} Mode)
          </div>
          <div class="preview-container">
            <div class="preview-content" data-banner-preview="${banner.id}"></div>
          </div>
        </div>
        
        <div class="embed-section">
          <button 
            class="btn btn-outline btn-sm embed-toggle-btn" 
            data-toggle-id="${banner.id}"
            aria-expanded="${isExpanded}"
          >
            <span>${isExpanded ? "Hide" : "Show"} Embed Code</span>
            <svg class="chevron-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
              ${isExpanded 
                ? '<path d="M5 12l5-5 5 5"/>' 
                : '<path d="M5 8l5 5 5-5"/>'}
            </svg>
          </button>
          
          ${isExpanded ? `
            <div class="embed-code-container">
              <div class="embed-code-header">
                <span class="embed-code-label">Copy & Paste Code</span>
                <button 
                  class="btn btn-secondary btn-sm" 
                  data-copy-id="${banner.id}"
                >
                  ${isCopied 
                    ? '<svg class="check-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> Copied!'
                    : '<svg class="copy-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/></svg> Copy Code'}
                </button>
              </div>
              <pre class="embed-code-pre"><code class="embed-code-code">${escapeHtml(banner.embedCode)}</code></pre>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // Render banner previews
  banners.forEach(banner => {
    const previewEl = document.querySelector(`[data-banner-preview="${banner.id}"]`);
    if (previewEl) {
      previewEl.innerHTML = banner.embedCode;
    }
  });
  
  // Attach event listeners using event delegation
  attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
  // Toggle buttons
  document.querySelectorAll('[data-toggle-id]').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-toggle-id');
      toggleSection(id);
    });
  });
  
  // Copy buttons
  document.querySelectorAll('[data-copy-id]').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-copy-id');
      const banner = banners.find(b => b.id === id);
      if (banner) {
        copyToClipboard(banner.embedCode, id);
      }
    });
  });
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderBanners();
  
  // Theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  }
});

