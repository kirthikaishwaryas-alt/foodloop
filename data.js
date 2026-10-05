// --- MEMBER 3: BACKEND & DATA STORAGE ---

const STORAGE_KEY = "foodloop_items";

// Internal helper to load items from localStorage safely
function loadItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Internal helper to save items to localStorage safely
function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// 1. Returns an array of listings based on category and availability filters[span_2](start_span)[span_2](end_span)
function getListings({ category, availableOnly } = {}) {
    let items = loadItems();

    // Filter by category if provided and not "All"
    if (category && category !== "All") {
        items = items.filter(item => item.category === category);
    }

    // Filter by availability if requested
    if (availableOnly) {
        items = items.filter(item => item.status === "available");
    }

    // Sort newest first
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// 2. Saves a new listing and returns it[span_3](start_span)[span_3](end_span)
function addListing(item) {
    const items = loadItems();
    
    const newItem = {
        ...item,
        id: Date.now().toString(),
        status: "available",
        createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    saveItems(items);
    return newItem;
}

// 3. Sets an item's status to "claimed[span_4](start_span)"[span_4](end_span)
function claimListing(id) {
    let items = loadItems();
    let updated = false;

    items = items.map(item => {
        if (item.id === id) {
            if (item.status === "claimed") {
                return item; // Already claimed
            }
            item.status = "claimed";
            updated = true;
        }
        return item;
    });

    if (updated) {
        saveItems(items);
        return true;
    }
    return false;
}

// 4. Returns statistics object: { total, claimed, available }[span_5](start_span)[span_5](end_span)
function getStats() {
    const items = loadItems();
    const total = items.length;
    const claimed = items.filter(item => item.status === "claimed").length;
    const available = items.filter(item => item.status === "available").length;

    return { total, claimed, available };
}

// 5. Fills sample/demo items into storage[span_6](start_span)[span_6](end_span)
function seedDemoData() {
    const items = loadItems();
    if (items.length > 0) return; // Don't overwrite if data already exists

    const demoItems = [
        { title: "Fresh Bakery Bread", quantity: "10 loaves", location: "Cafeteria Block B", category: "Bakery" },
        { title: "Veg Fried Rice", quantity: "15 packets", location: "Hostel Mess", category: "Cooked" },
        { title: "Apples & Bananas", quantity: "5 kg", location: "Main Gate Stall", category: "Fresh Produce" }
    ];

    demoItems.forEach(item => addListing(item));
}