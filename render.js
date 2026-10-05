function renderListings(list) {
  const container = document.getElementById('listings');
  container.innerHTML = ''; 

  if (!list || list.length === 0) {
    container.innerHTML = '<p>No food available right now.</p>';
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = food-card ${item.status};
    
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <span class="badge category">${item.category}</span>
      <span class="badge status">${item.status}</span>
      ${item.status === 'available' ? <button class="claim-btn" data-id="${item.id}">Claim</button> : ''}
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