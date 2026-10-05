function renderListings(list) {
  const container = document.getElementById('listings');
  container.innerHTML = ''; 

  if (!list || list.length === 0) {
    container.innerHTML = '<p>No food available right now.</p>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = "food-card" + item.status;
    
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <span class="badge category">${item.category}</span>
      <span class="badge status">${item.status}</span>
      ${item.status === 'available' ? '<button class="claim-btn" data-id="${item.id}">Claim</button>' : ''}
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof getListings === 'function') {
    renderListings(getListings({}));
  }

  const categoryFilter = document.getElementById('categoryFilter');
  const availableCheck = document.getElementById('availableOnlyCheck');

  function handleFilterChange() {
    if (typeof getListings === 'function') {
      const category = categoryFilter.value;
      const availableOnly = availableCheck.checked;
      renderListings(getListings({ category, availableOnly }));
    }
  }

  if (categoryFilter && availableCheck) {
    categoryFilter.addEventListener('change', handleFilterChange);
    availableCheck.addEventListener('change', handleFilterChange);
  }
});
function refreshUI() {
    const listings = getListings(); // Pulls fresh data from your backend (data.js)
    renderListings(listings);       // Draws the cards onto the webpage (Member 1's function)
}
// Automatically load and render listings when the page opens
document.addEventListener('DOMContentLoaded', () => {
    refreshUI();
});
// Listen for clicks on the listings container or document
document.addEventListener('click', (e) => {
    // Check if the clicked element has the 'claim-btn' class
    if (e.target.classList.contains('claim-btn')) {
        const id = e.target.getAttribute('data-id');
        
        // 1. Call your backend function from data.js to update the status to 'claimed'
        claimListing(id);
        
        // 2. Refresh the UI so the card instantly updates its badge/button status
        refreshUI();
    }
});
function refreshUI() {
    const listings = getListings(); // Pulls fresh data from backend
    
    renderListings(listings);       // 1. Updates Member 1's food grid UI
    updateDashboardStats();         // 2. Updates Member 4's dashboard stats cards
}