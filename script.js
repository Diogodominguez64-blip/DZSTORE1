let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = "Dz Diogo";
let currency = "USD";
let last = localStorage.getItem("dz_last") || 0;

const rates = { USD: 1, MXN: 17, COP: 4000, ARS: 900 };

function add(name, price) {
  cart.push({ name, price });
  save();
  render();
}

function remove(i) {
  cart.splice(i, 1);
  save();
  render();
}

function save() {
  localStorage.setItem("dz_cart", JSON.stringify(cart));
}

function code() {
  return "DZ-" + Math.floor(10000 + Math.random() * 90000);
}

function render() {
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  items.innerHTML = "";
  invoice.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    items.innerHTML += `
      <div class="cart-item">
        ${i + 1}. ${item.name} - ${item.price} USD
        <button onclick="remove(${i})">✖</button>
      </div>`;
    invoice.innerHTML += `${i + 1}. ${item.name} - ${item.price} USD<br>`;
  });

  document.getElementById("count").innerText = cart.length;
  invoice.innerHTML += `<hr>Total USD: ${total}<br>Total ${currency}: ${Math.round(total * rates[currency])}`;
}

function send() {
  const now = Date.now();
  if (now - last < 30000) return alert("Espera 30 segundos");
  if (!cart.length) return alert("Carrito vacío");

  localStorage.setItem("dz_last", now);

  const id = code();
  const total = cart.reduce((s, i) => s + i.price, 0);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\nPedido: *${id}*\nVendedor: *${seller}*\n\n`;
  cart.forEach((i, x) => msg += `${x + 1}. ${i.name} - ${i.price} USD\n`);
  msg += `\n🌍 Moneda: ${currency}\n💱 Total local: ${Math.round(total * rates[currency])} ${currency}\n💵 Total USD: ${total} USD`;

  let phone = seller.includes("Ozoria") ? "18093185425" :
              seller.includes("David") ? "584262984228" : "18294103676";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

document.addEventListener("contextmenu", e => e.preventDefault());
render();
