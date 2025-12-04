// --- Minté Essence Webshop ---
// Producten met nieuwe, permanente CDN-foto's

const products = [
  { 
    id: 1, 
    name: "Mint Glow", 
    price: 74, 
    img: "https://www.w3schools.com/w3images/perfume.jpg" 
  },
  { 
    id: 2, 
    name: "Essence de Luxe", 
    price: 89, 
    img: "https://www.w3schools.com/w3images/perfume2.jpg" 
  },
  { 
    id: 3, 
    name: "Velvet Mist", 
    price: 69, 
    img: "https://www.w3schools.com/w3images/perfume3.jpg" 
  }
];

let cart = [];

// --- Producten tonen op de shop-pagina ---
window.onload = () => {
  const grid = document.getElementById("products");
  if (!grid) return;
  grid.innerHTML = products
    .map(
      p => `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="price">€${p.price}</div>
        <button class="btn-primary" onclick="addToCart(${p.id})">Toevoegen</button>
      </div>`
    )
    .join("");
};

// --- Item toevoegen aan winkelwagen ---
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// --- Winkelwagen opnieuw tekenen ---
function renderCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!list) return;

  list.innerHTML = cart
    .map(
      i => `
      <div class="cart-item">
        <span>${i.name} ×${i.qty}</span>
        <span>€${(i.price * i.qty).toFixed(2)}</span>
      </div>`
    )
    .join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalEl.textContent = "€" + total.toFixed(2);
}

// --- Afrekenen (demo) ---
function checkout() {
  if (cart.length === 0) {
    alert("Je winkelwagen is leeg.");
    return;
  }

  const items = cart.map(i => `${i.qty}× ${i.name}`).join(", ");
  alert(
    "🛍️ Demo-checkout\n\n" +
    "Je bestelling:\n" + items +
    "\n\nVolgende stap in productie:\n" +
    "- Koppel Mollie of Stripe voor betalingen\n" +
    "- Verstuur bestelling naar backend of database\n" +
    "- Mail bevestiging naar klant"
  );
}
