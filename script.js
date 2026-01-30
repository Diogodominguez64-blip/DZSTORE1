let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currency = "USD";
let seller = "Diogo";

const rates = {
  USD: 1,
  COP: 4000,
  MXN: 17,
  ARS: 900
};

function addToCart(name, price) {
  cart.push({ name, price });
  save();
  render();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeCurrency(cur) {
  currency = cur;
  render();
}

function setSeller(s) {
  seller = s;
}

function render() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("count");

  items.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    items.innerHTML += `<div>${item.name} - ${(item.price * rates[currency]).toFixed(0)} ${currency}</div>`;
  });

  totalEl.innerText = (total * rates[currency]).toFixed(0) + " " + currency;
  countEl.innerText = cart.length;
}

function sendOrder() {
  if (!cart.length) return alert("Carrito vacío");

  let msg = `🧾 PEDIDO DZSTORE\n\n`;
  cart.forEach(i => msg += `• ${i.name} - ${i.price} USD\n`);
  msg += `\nTotal: ${cart.reduce((a,b)=>a+b.price,0)} USD`;

  let phone =
    seller === "Ozoria" ? "18093185425" :
    seller === "David" ? "584262984228" :
    "18294103676";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

render();
