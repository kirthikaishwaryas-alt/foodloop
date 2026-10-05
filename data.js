// data.js - TEMPORARY test version (Member 3's real file will replace this)
// Implements the agreed functions: getListings, addListing, claimListing, getStats, seedDemoData

const STORAGE_KEY = "foodloop_listings";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function getListings(filters) {
  const f = filters || {};
  let list = readAll();
  if (f.category && f.category !== "All" && f.category !== "") {
    list = list.filter((x) => x.category === f.category);
  }
  if (f.availableOnly) {
    list = list.filter((x) => x.status === "available");
  }
  return list;
}

function addListing(item) {
  const list = readAll();
  list.push(item);
  writeAll(list);
  return item;
}

function claimListing(id) {
  const list = readAll().map((x) =>
    String(x.id) === String(id) ? { ...x, status: "claimed" } : x
  );
  writeAll(list);
}

function getStats() {
  const list = readAll();
  const claimed = list.filter((x) => x.status === "claimed").length;
  return { total: list.length, claimed: claimed, available: list.length - claimed };
}

function seedDemoData() {
  const now = new Date().toISOString();
  writeAll([
    { id: "d1", title: "Veg Biryani", quantity: 10, location: "T Nagar", category: "Cooked", status: "available", createdAt: now },
    { id: "d2", title: "Bread Packets", quantity: 25, location: "Adyar", category: "Bakery", status: "available", createdAt: now },
    { id: "d3", title: "Fresh Tomatoes", quantity: 15, location: "Anna Nagar", category: "Fresh Produce", status: "available", createdAt: now },
  ]);
}