/* ============================================ */
/* EARLY CHILDHOOD COMMUNITY PARTNERS PAGE */
/* JavaScript for CodePen */
/* ============================================ */

// Simple initialization
console.log('VPM Early Childhood Community Partners page loaded');

// Optional: Add smooth scroll behavior for any future anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Count and log statistics
    const partnerCards = document.querySelectorAll('.ecp-partner-card');
    const storyCards = document.querySelectorAll('.ecp-story-card');
    const teamCards = document.querySelectorAll('.ecp-team-card');
    
    console.log(`Page Statistics:
    - ${partnerCards.length} Community Partners
    - ${storyCards.length} Community Stories
    - ${teamCards.length} Team Members
    `);
    
    // Optional: Add click handlers for story cards (for future video integration)
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Story card clicked:', this.querySelector('.ecp-story-title').textContent);
            // Future: Add video modal or redirect to video page
        });
    });
});

// Optional: Lazy load images for better performance
// Uncomment if you want to add lazy loading
/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}
*/
