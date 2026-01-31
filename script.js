// ================= CONFIG =================
let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = "";
let currency = "USD";
let last = localStorage.getItem("dz_last") || 0;

const rates = {
  USD: 1,
  MXN: 17,
  COP: 4000,
  ARS: 900
};

// ================= CARRITO =================
function add(name, price) {
  cart.push({ name, price });
  save();
  render();
  toast(`✔ ${name} agregado`);
  playSound();
}

function removeItem(index) {
  cart.splice(index, 1);
  save();
  render();
}

function save() {
  localStorage.setItem("dz_cart", JSON.stringify(cart));
}

// ================= RENDER =================
function render() {
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");

  items.innerHTML = "";
  invoice.innerHTML = "";

  let total = 0;

  cart.forEach((p, i) => {
    total += p.price;

    items.innerHTML += `
      <div class="cart-item">
        ${i + 1}. ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>
    `;

    invoice.innerHTML += `${i + 1}. ${p.name} - ${p.price} USD<br>`;
  });

  document.getElementById("count").innerText = cart.length;

  invoice.innerHTML += `
    <hr>
    🌍 Moneda: ${currency}<br>
    💱 Total local: ${Math.round(total * rates[currency])} ${currency}<br>
    💵 Total USD: ${total} USD
  `;
}

// ================= PAGO =================
function pay(method) {
  if (!cart.length) {
    alert("Carrito vacío");
    return;
  }

  if (!seller) {
    alert("Selecciona un vendedor");
    return;
  }

  const now = Date.now();
  if (now - last < 30000) {
    alert("Espera 30 segundos para enviar otro pedido");
    return;
  }

  localStorage.setItem("dz_last", now);

  const id = "DZ-" + Math.floor(10000 + Math.random() * 90000);
  const total = cart.reduce((s, p) => s + p.price, 0);

  const paymentText =
    method === "paypal" ? "PayPal" : "Otros métodos de pago";

  // ===== TICKET =====
  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${id}*\n`;
  msg += `Vendedor: *${seller}*\n`;
  msg += `Método de pago: *${paymentText}*\n\n`;

  cart.forEach((p, i) => {
    msg += `${i + 1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n🌍 Moneda: ${currency}`;
  msg += `\n💱 Total local: ${Math.round(total * rates[currency])} ${currency}`;
  msg += `\n💵 Total USD: ${total} USD`;

  msg += `\n\n━━━━━━━━━━━━━━━`;
  msg += `\n🙏 *Gracias por tu compra*`;
  msg += `\n*${seller}* te atenderá en breve.`;
  msg += `\nDZSTORE OFICIAL ✅`;

  // ===== NÚMEROS =====
  let phone =
    seller === "Dz Ozoria"
      ? "18093185425"
      : seller === "David"
      ? "584262984228"
      : "18294103676"; // Dz Diogo

  // ===== WHATSAPP =====
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  // ===== PAYPAL =====
  if (method === "paypal") {
    setTimeout(() => {
      window.open(
        `https://www.paypal.com/paypalme/dzstore0817/${total}`,
        "_blank"
      );
    }, 1200);
  }
}

// ================= TOAST =================
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}

// ================= SONIDO =================
function playSound() {
  const s = document.getElementById("cart-sound");
  if (!s) return;
  s.currentTime = 0;
  s.play().catch(() => {});
}

// ================= INIT =================
render();
document.addEventListener("contextmenu", e => e.preventDefault());
