// VPM Spotlight Queue Management System

let contentData = [];
const MAX_ACTIVE_ITEMS = 3;
const HIGH_PRIORITY_TAG = 'high priority';

// Load content from JSON file
async function loadContent() {
  try {
    const response = await fetch('content-queue.json');
    if (!response.ok) {
      throw new Error('Failed to load content queue');
    }
    const data = await response.json();
    contentData = data.items || [];
    renderCards();
  } catch (error) {
    console.error('Error loading content:', error);
    // Fallback: show error message
    document.getElementById('spotlight-cards').innerHTML = 
      '<p style="color: var(--muted-foreground);">Unable to load content. Please check the content-queue.json file.</p>';
  }
}

// Get active items (tagged with "high priority")
function getActiveItems() {
  return contentData
    .filter(item => item.tags && item.tags.includes(HIGH_PRIORITY_TAG))
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, MAX_ACTIVE_ITEMS);
}

// Render cards to the DOM
function renderCards() {
  const container = document.getElementById('spotlight-cards');
  if (!container) {
    // Container doesn't exist (e.g., on admin page)
    return;
  }

  const activeItems = getActiveItems();

  // Clear container
  container.innerHTML = '';

  if (activeItems.length === 0) {
    container.innerHTML = '<p style="color: var(--muted-foreground); padding: 2rem;">No content items are currently active. Add items with the "high priority" tag to display them.</p>';
    return;
  }

  // Create and append cards
  activeItems.forEach((item, index) => {
    const card = createCardElement(item, index);
    container.appendChild(card);
  });
}

// Create a card element
function createCardElement(item, index) {
  const card = document.createElement('div');
  card.className = 'spotlight-card';
  card.setAttribute('data-id', item.id);

  const link = document.createElement('a');
  link.href = item.link || '#';
  link.className = 'spotlight-card-link';
  link.setAttribute('aria-label', `Read more about ${item.title}`);

  const image = document.createElement('img');
  image.src = item.picture || '';
  image.alt = item.title || 'Content image';
  image.className = 'spotlight-card-image';
  image.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'spotlight-card-content';

  const title = document.createElement('h3');
  title.className = 'spotlight-card-title';
  title.textContent = item.title || '';

  const subtitle = document.createElement('p');
  subtitle.className = 'spotlight-card-subtitle';
  subtitle.textContent = item.subtitle || '';

  const description = document.createElement('p');
  description.className = 'spotlight-card-description';
  description.textContent = item.description || '';

  content.appendChild(title);
  content.appendChild(subtitle);
  content.appendChild(description);

  link.appendChild(image);
  link.appendChild(content);
  card.appendChild(link);

  return card;
}

// Add new item to queue
function addItemToQueue(item) {
  // Generate ID if not provided
  if (!item.id) {
    item.id = Date.now().toString();
  }

  // Initialize tags array if not present
  if (!item.tags) {
    item.tags = [];
  }

  // Add dateAdded if not present
  if (!item.dateAdded) {
    item.dateAdded = new Date().toISOString();
  }

  // Add to contentData
  contentData.push(item);

  // If tagging as high priority, manage the queue
  if (item.tags.includes(HIGH_PRIORITY_TAG)) {
    manageHighPriorityQueue(item.id);
  }

  return item;
}

// Manage high priority queue (ensure only 3 items)
function manageHighPriorityQueue(newItemId) {
  const highPriorityItems = contentData
    .filter(item => item.tags && item.tags.includes(HIGH_PRIORITY_TAG))
    .sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); // Oldest first

  // If we have more than MAX_ACTIVE_ITEMS, remove tag from oldest
  if (highPriorityItems.length > MAX_ACTIVE_ITEMS) {
    const oldestItem = highPriorityItems[0];
    if (oldestItem.id !== newItemId) {
      // Remove high priority tag from oldest item
      oldestItem.tags = oldestItem.tags.filter(tag => tag !== HIGH_PRIORITY_TAG);
      
      // Animate the card out
      const cardToRemove = document.querySelector(`[data-id="${oldestItem.id}"]`);
      if (cardToRemove) {
        cardToRemove.classList.add('slide-out');
        setTimeout(() => {
          renderCards();
        }, 500);
        return;
      }
    }
  }

  // Re-render cards with animation
  renderCardsWithAnimation();
}

// Toggle high priority tag on an item
function toggleHighPriorityTag(itemId) {
  const item = contentData.find(i => i.id === itemId);
  if (!item) return false;

  if (!item.tags) {
    item.tags = [];
  }

  const hasTag = item.tags.includes(HIGH_PRIORITY_TAG);

  if (hasTag) {
    // Remove tag
    item.tags = item.tags.filter(tag => tag !== HIGH_PRIORITY_TAG);
  } else {
    // Add tag
    item.tags.push(HIGH_PRIORITY_TAG);
    manageHighPriorityQueue(itemId);
  }

  renderCardsWithAnimation();
  return !hasTag;
}

// Render cards with animation
function renderCardsWithAnimation() {
  const container = document.getElementById('spotlight-cards');
  if (!container) {
    // If container doesn't exist (e.g., on admin page), just return
    return;
  }

  const existingCards = container.querySelectorAll('.spotlight-card');
  const activeItems = getActiveItems();
  const existingIds = Array.from(existingCards).map(card => card.getAttribute('data-id'));
  const newIds = activeItems.map(item => item.id);

  // Find cards that need to be removed
  const cardsToRemove = existingIds.filter(id => !newIds.includes(id));
  
  // Find items that need to be added
  const itemsToAdd = activeItems.filter(item => !existingIds.includes(item.id));

  // If no changes, just render normally
  if (cardsToRemove.length === 0 && itemsToAdd.length === 0) {
    renderCards();
    return;
  }

  // Animate out cards that are being removed
  cardsToRemove.forEach(id => {
    const card = container.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.classList.add('slide-out');
    }
  });

  // After animation, re-render
  setTimeout(() => {
    renderCards();
    
    // Animate in new cards
    setTimeout(() => {
      itemsToAdd.forEach(item => {
        const card = container.querySelector(`[data-id="${item.id}"]`);
        if (card) {
          card.classList.add('slide-in');
        }
      });
    }, 50);
  }, 500);
}

// Save content to JSON (for admin interface)
async function saveContent() {
  // Note: This requires a backend endpoint in a real application
  // For now, we'll just log the data structure
  console.log('Content to save:', JSON.stringify({ items: contentData }, null, 2));
  alert('In a production environment, this would save to content-queue.json. For now, copy the JSON from the console.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
});

// Export functions for admin interface
if (typeof window !== 'undefined') {
  window.SpotlightQueue = {
    loadContent,
    addItemToQueue,
    toggleHighPriorityTag,
    getActiveItems: () => getActiveItems(),
    getAllItems: () => contentData,
    saveContent,
    setContentData: (data) => {
      contentData = data;
      renderCards();
    }
  };
}

