// dashboard.js - Handles top summary statistics

function updateDashboardStats() {
    const listings = getListings(); // Pulls current data from your backend

    // Calculate stats
    const totalListings = listings.length;
    const availableCount = listings.filter(item => item.status === 'available').length;
    const claimedCount = listings.filter(item => item.status === 'claimed').length;

    // Find the stats container in index.html
    const statsContainer = document.getElementById('stats');
    
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-box">
                <h4>Total Surplus</h4>
                <p>${totalListings}</p>
            </div>
            <div class="stat-box">
                <h4>Available Now</h4>
                <p>${availableCount}</p>
            </div>
            <div class="stat-box">
                <h4>Claimed</h4>
                <p>${claimedCount}</p>
            </div>
        `;
    }
}