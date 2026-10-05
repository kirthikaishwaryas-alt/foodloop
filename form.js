// form.js - Member 2 (Frontend Forms & Actions)
// Depends on: #formModal, #openFormBtn, #listings (Member 1's index.html)
// Calls: addListing, claimListing, getListings (Member 3), renderListings (Member 1), renderStats (Member 4)

(function () {
  const CATEGORIES = ["Cooked", "Packaged", "Fresh Produce", "Bakery"];

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("formModal");
    const openBtn = document.getElementById("openFormBtn");
    const listings = document.getElementById("listings");
    if (!modal || !openBtn || !listings) {
      console.error("form.js: missing #formModal, #openFormBtn or #listings in index.html");
      return;
    }

    // ---------- Build the form inside #formModal ----------
    modal.innerHTML = `
      <div class="modal-content" style="background:#fff;padding:20px;border-radius:10px;width:90%;max-width:400px;position:relative;">
        <button type="button" id="closeFormBtn" aria-label="Close" style="position:absolute;top:8px;right:12px;border:none;background:none;font-size:22px;cursor:pointer;">&times;</button>
        <h2>Post Surplus Food</h2>
        <form id="foodForm" novalidate>
          <label>Title<br><input type="text" id="foodTitle" placeholder="e.g. Veg Biryani"></label><br><br>
          <label>Quantity<br><input type="number" id="foodQty" min="1" placeholder="e.g. 10"></label><br><br>
          <label>Pickup Location<br><input type="text" id="foodLocation" placeholder="e.g. T Nagar, Chennai"></label><br><br>
          <label>Category<br>
            <select id="foodCategory">
              <option value="">-- Select category --</option>
              ${CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join("")}
            </select>
          </label>
          <p id="formError" style="color:#c0392b;min-height:1.2em;margin:10px 0;"></p>
          <button type="submit">Post</button>
          <button type="button" id="cancelFormBtn">Cancel</button>
        </form>
      </div>`;
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";

    const form = document.getElementById("foodForm");
    const errorEl = document.getElementById("formError");

    // ---------- Open / close ----------
    function openModal() {
      errorEl.textContent = "";
      modal.style.display = "flex";
      document.getElementById("foodTitle").focus();
    }
    function closeModal() {
      modal.style.display = "none";
      form.reset();
      errorEl.textContent = "";
    }
    openBtn.addEventListener("click", openModal);
    document.getElementById("closeFormBtn").addEventListener("click", closeModal);
    document.getElementById("cancelFormBtn").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(); // click on dark background
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display !== "none") closeModal();
    });

    // ---------- Refresh UI after any change ----------
    function refreshUI() {
      renderListings(getListings({}));
      if (typeof renderStats === "function") renderStats();
    }

    // ---------- Validation ----------
    function validate(values) {
      if (!values.title) return "Please enter the food title.";
      if (!values.location) return "Please enter the pickup location.";
      if (values.quantityRaw === "") return "Please enter the quantity.";
      const qty = Number(values.quantityRaw);
      if (isNaN(qty)) return "Quantity must be a number.";
      if (qty <= 0) return "Quantity must be greater than 0.";
      if (!values.category) return "Please select a category.";
      return "";
    }

    // ---------- Submit ----------
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = {
        title: document.getElementById("foodTitle").value.trim(),
        quantityRaw: document.getElementById("foodQty").value.trim(),
        location: document.getElementById("foodLocation").value.trim(),
        category: document.getElementById("foodCategory").value,
      };

      const error = validate(values);
      if (error) {
        errorEl.textContent = error;
        return;
      }

      const item = {
        id: "f" + Date.now() + Math.floor(Math.random() * 1000),
        title: values.title,
        quantity: Number(values.quantityRaw),
        location: values.location,
        category: values.category,
        status: "available",
        createdAt: new Date().toISOString(),
      };

      addListing(item);
      closeModal();
      refreshUI();
      showToast("Food posted successfully!");
    });

    // ---------- Claim button (event delegation) ----------
    listings.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-id]");
      if (!btn || btn.disabled) return;

      const id = btn.dataset.id;
      const item = getListings({}).find((x) => String(x.id) === String(id));
      if (!item || item.status === "claimed") return; // guards double / rapid clicks

      btn.disabled = true; // block rapid clicks until re-render
      claimListing(id);
      refreshUI();
      showToast("Item claimed. Please pick it up at " + item.location);
    });

    // ---------- Small toast message ----------
    function showToast(msg) {
      const t = document.createElement("div");
      t.textContent = msg;
      t.style.cssText =
        "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2e7d32;color:#fff;padding:10px 18px;border-radius:8px;z-index:2000;box-shadow:0 2px 8px rgba(0,0,0,.3);";
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 3000);
    }
  });
})();
