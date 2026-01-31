let cart = [];

const PAYPAL_EMAIL = "dzstore0817@gmail.com";
const WHATSAPP_NUMBER = "5350000000"; // CAMBIA ESTE NÚMERO

function add(name, plan, price) {
  cart.push({ name, plan, price });
  playSound();
  toast("Producto agregado");
  render();
}

function render() {
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  items.innerHTML = "";

  let total = 0;
  cart.forEach((p, i) => {
    total += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${p.name} – ${p.plan} (${p.price} USD)
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText = cart.length;
  invoice.innerHTML = `<strong>Total:</strong> ${total} USD`;
}

function removeItem(i) {
  cart.splice(i, 1);
  render();
}

function pay(method) {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let total = cart.reduce((s, p) => s + p.price, 0);
  let text = "🧾 *NUEVO PEDIDO DZSTORE*%0A%0A";

  cart.forEach(p => {
    text += `• ${p.name} (${p.plan}) - ${p.price} USD%0A`;
  });

  text += `%0A💵 Total: ${total} USD`;
  text += `%0A💳 Método: ${method === "paypal" ? "PayPal" : "Otro método"}`;

  // WhatsApp
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

  // PayPal
  if (method === "paypal") {
    window.open(
      `https://www.paypal.com/paypalme/${PAYPAL_EMAIL}/${total}`,
      "_blank"
    );
  }
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1500);
}

function playSound() {
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(() => {});
}
