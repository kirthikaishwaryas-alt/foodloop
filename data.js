// Sample data storage functions for FoodLoop

function seedDemoData() {
    const sampleListings = [
        {
            id: '1',
            title: 'Fresh Vegetable Box',
            quantity: '5 kg',
            location: 'Downtown Community Center',
            category: 'Fresh Produce',
            status: 'available'
        },
        {
            id: '2',
            title: 'Surplus Bakery Bread',
            quantity: '10 loaves',
            location: 'Corner Bakery',
            category: 'Bakery',
            status: 'available'
        }
    ];
    localStorage.setItem('foodListings', JSON.stringify(sampleListings));
    console.log('Demo data seeded successfully!');
}

function getListings() {
    const data = localStorage.getItem('foodListings');
    return data ? JSON.parse(data) : [];
}
// Add a new food listing
function addListing(listingData) {
    const listings = getListings();
    const newEntry = {
        id: Date.now().toString(), // Generates a unique ID based on timestamp
        title: listingData.title,
        quantity: listingData.quantity,
        location: listingData.location,
        category: listingData.category,
        status: 'available'
    };
    
    listings.push(newEntry);
    localStorage.setItem('foodListings', JSON.stringify(listings));
    console.log('New listing added successfully!');
    return newEntry;
}

// Claim an existing food listing by its ID
function claimListing(id) {
    const listings = getListings();
    const updatedListings = listings.map(item => {
        if (item.id === id) {
            return { ...item, status: 'claimed' };
        }
        return item;
    });

    localStorage.setItem('foodListings', JSON.stringify(updatedListings));
    console.log(`Listing with ID ${id} has been claimed!`);
}