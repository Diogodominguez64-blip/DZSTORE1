// ====== ESTADO GLOBAL ======
let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = localStorage.getItem("dz_seller") || "Dz Diogo";
let currency = localStorage.getItem("dz_currency") || "USD";

// ====== TASAS ======
const rates = {
  USD: 1,
  MXN: 17,
  COP: 4000,
  ARS: 900
};

// ====== UTILIDADES ======
function saveState() {
  localStorage.setItem("dz_cart", JSON.stringify(cart));
  localStorage.setItem("dz_seller", seller);
  localStorage.setItem("dz_currency", currency);
}

function generateOrderCode() {
  return "DZ-" + Math.floor(10000 + Math.random() * 90000);
}

// ====== CARRITO ======
function addToCart(name, price) {
  cart.push({ name, price });
  saveState();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveState();
  renderCart();
}

function clearCart() {
  cart = [];
  saveState();
  renderCart();
}

// ====== SELECTORES ======
function setSeller(value) {
  seller = value;
  saveState();
}

function changeCurrency(value) {
  currency = value;
  saveState();
  renderCart();
}

// ====== RENDER ======
function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const countEl = document.getElementById("count");
  const totalUsdEl = document.getElementById("total-usd");
  const totalLocalEl = document.getElementById("total-local");
  const currencyLabelEl = document.getElementById("currency-label");

  if (!itemsEl) return;

  itemsEl.innerHTML = "";
  let totalUSD = 0;

  cart.forEach((item, index) => {
    totalUSD += item.price;

    itemsEl.innerHTML += `
      <div class="cart-item">
        <span>${index + 1}. ${item.name}</span>
        <strong>${item.price} USD</strong>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  countEl.textContent = cart.length;
  totalUsdEl.textContent = totalUSD;
  totalLocalEl.textContent = Math.round(totalUSD * rates[currency]) + " " + currency;
  currencyLabelEl.textContent = currency;
}

// ====== WHATSAPP ======
function sendOrder() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const orderCode = generateOrderCode();
  const totalUSD = cart.reduce((sum, i) => sum + i.price, 0);
  const totalLocal = Math.round(totalUSD * rates[currency]);

  let message = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  message += `Pedido: *${orderCode}*\n`;
  message += `Vendedor: *${seller}*\n\n`;

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - ${item.price} USD\n`;
  });

  message += `\n🌍 Moneda: ${currency}`;
  message += `\n💱 Total local: ${totalLocal} ${currency}`;
  message += `\n💵 Total USD: ${totalUSD} USD`;

  let phone = "18294103676"; // Dz Diogo
  if (seller === "Dz Ozoria") phone = "18093185425";
  if (seller === "David") phone = "584262984228";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// ====== INIT ======
window.addEventListener("load", () => {
  // restaurar selects
  const sellerSelect = document.querySelector("select[onchange*='setSeller']");
  const currencySelect = document.querySelector("select[onchange*='changeCurrency']");

  if (sellerSelect) sellerSelect.value = seller;
  if (currencySelect) currencySelect.value = currency;

  renderCart();
});
