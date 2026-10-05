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

// 1. Returns an array of listings based on filters (Still a stub for Phase 3, we will fill this next)
function getListings({ category, availableOnly } = {}) {
    // Coming in Phase 3
}

// 2. Saves a new listing and returns it[span_2](start_span)[span_2](end_span)
function addListing(item) {
    const items = loadItems();
    
    // Attach unique ID, default status, and creation timestamp[span_3](start_span)[span_3](end_span)
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

// 3. Sets an item's status to "claimed" (Still a stub for Phase 3)
function claimListing(id) {
    // Coming in Phase 3
}

// 4. Returns statistics object: { total, claimed, available } (Still a stub for Phase 3)
function getStats() {
    // Coming in Phase 3
}

// 5. Fills sample/demo items into storage (Still a stub for Phase 3)
function seedDemoData() {
    // Coming in Phase 3
}