class VpmFundingCta extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, Arial, sans-serif;
        }
        /* VPM Brand Colors and Variables */
        :host {
          --vpm-navy-blue: #003865;
          --vpm-light-blue: #6CACE4;
          --vpm-black: #101820;
          --vpm-gray: #B2B4B2;
          --vpm-red: #EE2737;
          --vpm-font-size-base: 1rem;
          --vpm-font-size-lg: 1.25rem;
          --vpm-font-size-xl: 1.5rem;
          --vpm-font-size-2xl: 2.25rem;
          --vpm-font-size-3xl: 2.75rem;
          --vpm-line-height-tight: 1.2;
          --vpm-line-height-normal: 1.5;
          --vpm-line-height-relaxed: 1.75;
          --vpm-space-xs: 0.25rem;
          --vpm-space-sm: 0.5rem;
          --vpm-space-md: 1rem;
          --vpm-space-lg: 1.5rem;
          --vpm-space-xl: 2rem;
          --vpm-space-2xl: 3rem;
          --vpm-space-3xl: 4rem;
        }
        .vpm-funding-cta {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--vpm-navy-blue);
          color: #fff;
          position: relative;
          overflow: hidden;
          border-radius: 0;
          box-shadow: none;
        }
        .vpm-funding-cta::before {
          display: none;
        }
        .vpm-funding-cta-container {
          position: relative;
          z-index: 2;
          padding: var(--vpm-space-2xl) var(--vpm-space-xl);
        }
        .vpm-funding-cta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--vpm-space-xl);
          align-items: center;
        }
        .vpm-funding-cta-content {
          text-align: center;
        }
        .vpm-funding-cta-title {
          font-family: inherit;
          font-weight: 700;
          font-size: var(--vpm-font-size-2xl);
          line-height: var(--vpm-line-height-tight);
          margin-bottom: var(--vpm-space-md);
          color: #fff;
        }
        .vpm-funding-cta-subtitle {
          font-family: inherit;
          font-weight: 600;
          font-size: var(--vpm-font-size-lg);
          line-height: var(--vpm-line-height-normal);
          margin-bottom: var(--vpm-space-lg);
          color: #b2b4b2;
        }
        .vpm-funding-cta-description {
          font-family: inherit;
          font-size: var(--vpm-font-size-base);
          line-height: var(--vpm-line-height-relaxed);
          margin-bottom: var(--vpm-space-xl);
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .vpm-funding-video-container {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 0;
          overflow: hidden;
          box-shadow: none;
        }
        .vpm-funding-video-wrapper {
          padding: 56.25% 0 0 0;
          position: relative;
        }
        .vpm-funding-video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .vpm-funding-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: var(--vpm-space-md);
          align-items: center;
          margin-top: var(--vpm-space-xl);
        }
        .vpm-funding-btn {
          display: inline-block;
          padding: 0.85rem 2.5rem;
          border-radius: 0;
          font-family: inherit;
          font-weight: 700;
          font-size: 1.125rem;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
          letter-spacing: 0.04em;
          border: none;
          min-width: 200px;
          background: #003865;
          color: #fff;
          text-transform: uppercase;
          box-shadow: none;
        }
        .vpm-funding-btn:hover,
        .vpm-funding-btn:focus {
          background: #205b91;
          color: #fff;
          text-decoration: none;
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        .vpm-funding-btn-secondary {
          background: #003865;
          color: #fff;
          border: none;
        }
        @media (min-width: 768px) {
          .vpm-funding-cta-container {
            padding: var(--vpm-space-3xl) var(--vpm-space-2xl);
          }
          .vpm-funding-cta-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--vpm-space-2xl);
          }
          .vpm-funding-cta-content {
            text-align: left;
          }
          .vpm-funding-cta-title {
            font-size: var(--vpm-font-size-3xl);
          }
          .vpm-funding-cta-subtitle {
            font-size: var(--vpm-font-size-xl);
          }
          .vpm-funding-cta-description {
            font-size: var(--vpm-font-size-lg);
            margin-left: 0;
            margin-right: 0;
          }
          .vpm-funding-cta-buttons {
            flex-direction: row;
            justify-content: flex-start;
          }
        }
        @media (min-width: 1024px) {
          .vpm-funding-cta-container {
            padding: 5rem 3rem;
          }
          .vpm-funding-cta-grid {
            gap: var(--vpm-space-3xl);
          }
          .vpm-funding-cta-title {
            font-size: 3.25rem;
          }
          .vpm-funding-cta-subtitle {
            font-size: 2rem;
          }
          .vpm-funding-cta-description {
            font-size: 1.35rem;
          }
        }
        @media (min-width: 1280px) {
          .vpm-funding-cta-title {
            font-size: 3.5rem;
          }
        }
        @media (max-width: 767px) {
          .vpm-funding-cta-content {
            text-align: center;
          }
        }
      </style>
      <section class="vpm-funding-cta" role="banner" aria-labelledby="funding-cta-title">
        <div class="vpm-funding-cta-container">
          <div class="vpm-funding-cta-grid">
            <div class="vpm-funding-cta-content">
              <h1 id="funding-cta-title" class="vpm-funding-cta-title">
                Understanding Public Media Funding
              </h1>
              <p class="vpm-funding-cta-subtitle">
                How Your Support Makes a Difference
              </p>
              <p class="vpm-funding-cta-description">
                While VPM is primarily sustained through community support, annual federal funding distributed through the Corporation for Public Broadcasting (CPB) provides the foundation that enables our entire system to deliver the shows you love, trusted news, educational resources, and emergency information when communities need it most. Watch this fun video to learn how it all works!
              </p>
              <div class="vpm-funding-cta-buttons">
                <a href="#support" class="vpm-funding-btn vpm-funding-btn-primary" aria-label="Make a donation to VPM">
                  Support VPM Today
                </a>
                <a href="#article" class="vpm-funding-btn vpm-funding-btn-secondary" aria-label="Read article about federal funding for public media">
                  Learn More About Federal Funding
                </a>
              </div>
            </div>
            <div class="vpm-funding-video-container">
              <div class="vpm-funding-video-wrapper">
                <iframe 
                  src="https://player.vimeo.com/video/1094035901?badge=0&autopause=0&player_id=0&app_id=58479" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  title="CPB Funding Explainer VPM"
                  loading="lazy"
                  id="vpm-funding-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    `;
  }
  connectedCallback() {
    // Load Vimeo API if not already present
    if (!window.Vimeo) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.onload = () => this.initVimeo();
      document.head.appendChild(script);
    } else {
      this.initVimeo();
    }
  }
  initVimeo() {
    const iframe = this.shadowRoot.getElementById('vpm-funding-iframe');
    if (iframe && window.Vimeo && typeof window.Vimeo.Player === 'function') {
      const player = new window.Vimeo.Player(iframe);
      player.on('play', function() {});
      player.on('ended', function() {});
    }
  }
}
customElements.define('vpm-funding-cta', VpmFundingCta); 