document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.getElementById('foodForm');
    const formModal = document.getElementById('formModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const listingsContainer = document.getElementById('listingsContainer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    let currentFilter = 'All';
    let searchQuery = '';

    // 1. Core Render Function with Combined Search & Category Filtering
    function renderListings() {
        if (!listingsContainer) return;
        let listings = JSON.parse(localStorage.getItem('foodListings')) || [];
        
        // Filter by Category and Search Query simultaneously
        const filteredListings = listings.filter(item => {
            const matchesCategory = currentFilter === 'All' || item.category.toLowerCase() === currentFilter.toLowerCase();
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) || item.location.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        listingsContainer.innerHTML = '';

        if (filteredListings.length === 0) {
            listingsContainer.innerHTML = `<div class="empty-state">No matching surplus food found. Check back soon!</div>`;
            return;
        }

        filteredListings.forEach(item => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <div>
                    <h3>${item.title}</h3>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                </div>
                <button class="claim-btn" data-id="${item.id}">Claim / Remove</button>
            `;
            listingsContainer.appendChild(card);
        });
    }

    // 2. Delete Listing Helper
    function deleteListing(id) {
        let listings = JSON.parse(localStorage.getItem('foodListings')) || [];
        listings = listings.filter(item => item.id !== id);
        localStorage.setItem('foodListings', JSON.stringify(listings));
        renderListings();
    }

    // 3. Event Delegation for Delete / Claim Buttons
    if (listingsContainer) {
        listingsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('claim-btn')) {
                const id = Number(e.target.getAttribute('data-id'));
                deleteListing(id);
            }
        });
    }

    // 4. Initial Render
    renderListings();

    // 5. Live Search Event Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderListings();
        });
    }

    // 6. Modal Open/Close Controls
    if (openModalBtn && formModal) {
        openModalBtn.addEventListener('click', () => formModal.classList.add('active'));
    }
    if (closeModalBtn && formModal) {
        closeModalBtn.addEventListener('click', () => formModal.classList.remove('active'));
    }

    // 7. Category Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-category');
            renderListings();
        });
    });

    // 8. Form Submission Handler
    if (foodForm) {
        foodForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newItem = {
                id: Date.now(),
                title: document.getElementById('titleInput').value,
                quantity: document.getElementById('quantityInput').value,
                location: document.getElementById('locationInput').value,
                category: document.getElementById('categoryInput').value.trim()
            };

            let listings = JSON.parse(localStorage.getItem('foodListings')) || [];
            listings.push(newItem);
            localStorage.setItem('foodListings', JSON.stringify(listings));

            renderListings();
            formModal.classList.remove('active');
            foodForm.reset();
        });
    }
});