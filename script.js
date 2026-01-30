let cart = JSON.parse(localStorage.getItem("cart")) || [];
let seller = "Dz Diogo";
let currency = "USD";

const rates = {
  USD: 1,
  MXN: 17,
  COP: 4000,
  ARS: 900
};

function addToCart(name, price) {
  cart.push({ name, price });
  save();
  render();
}

function removeItem(index) {
  cart.splice(index, 1);
  save();
  render();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function setSeller(v) {
  seller = v;
}

function changeCurrency(c) {
  currency = c;
  render();
}

function render() {
  const items = document.getElementById("cart-items");
  const count = document.getElementById("count");
  const totalLocal = document.getElementById("total-local");
  const totalUSD = document.getElementById("total-usd");
  const currencyLabel = document.getElementById("currency-label");

  items.innerHTML = "";
  let usdTotal = 0;

  cart.forEach((item, i) => {
    usdTotal += item.price;
    items.innerHTML += `
      <div class="cart-item">
        <span>${i + 1}. ${item.name}</span>
        <strong>${item.price} USD</strong>
        <button onclick="removeItem(${i})">✖</button>
      </div>
    `;
  });

  count.innerText = cart.length;
  totalUSD.innerText = usdTotal;
  totalLocal.innerText = Math.round(usdTotal * rates[currency]) + " " + currency;
  currencyLabel.innerText = currency;
}

function generateOrderCode() {
  return "DZ-" + Math.floor(10000 + Math.random() * 90000);
}

function sendOrder() {
  if (!cart.length) {
    alert("El carrito está vacío");
    return;
  }

  const orderCode = generateOrderCode();
  const usdTotal = cart.reduce((s, i) => s + i.price, 0);
  const localTotal = Math.round(usdTotal * rates[currency]);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${orderCode}*\n`;
  msg += `Vendedor: *${seller}*\n\n`;

  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name} - ${item.price} USD\n`;
  });

  msg += `\n🌍 Moneda: ${currency}`;
  msg += `\n💱 Total local: ${localTotal} ${currency}`;
  msg += `\n💵 Total USD: ${usdTotal} USD`;

  const phone =
    seller.includes("Ozoria") ? "18093185425" :
    seller.includes("David") ? "584262984228" :
    "18294103676";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

render();
