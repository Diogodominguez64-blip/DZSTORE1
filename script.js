let cart = [];

const rates = {
  USD: 1,
  MXN: 17,
  COP: 3900,
  PEN: 3.7,
  ARS: 900
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado correctamente");
});

function addToCart(product, selectId) {
  const select = document.getElementById(selectId);
  if (!select) {
    alert("Error: selector no encontrado");
    return;
  }

  const [plan, price] = select.value.split("|");

  cart.push({
    product,
    plan,
    price: parseFloat(price)
  });

  renderCart();
  showToast();

  document.getElementById("ticket")
    .scrollIntoView({ behavior: "smooth" });
}

function renderCart() {
  const cartBox = document.getElementById("cart");
  cartBox.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `✔ ${item.product} - ${item.plan} (${item.price} USD)`;
    cartBox.appendChild(div);
  });

  updateTotals();
}

function updateTotals() {
  let total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById("totalUsd").innerText =
    `Total: ${total} USD`;

  const currency = document.getElementById("currency").value;
  if (currency !== "USD") {
    const converted = (total * rates[currency]).toFixed(2);
    document.getElementById("totalLocal").innerText =
      `Equivalente en ${currency}: ${converted}`;
  } else {
    document.getElementById("totalLocal").innerText = "";
  }
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

function sendTicket() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const seller = document.getElementById("seller").value;
  const currency = document.getElementById("currency").value;
  const time = new Date().toLocaleString();

  let total = cart.reduce((s, i) => s + i.price, 0);

  let msg = `🧾 FACTURA DZSTORE\n\n`;
  cart.forEach(i => {
    msg += `• ${i.product} - ${i.plan}: ${i.price} USD\n`;
  });

  msg += `\nTotal: ${total} USD`;

  if (currency !== "USD") {
    msg += `\nEquivalente en ${currency}: ${(total * rates[currency]).toFixed(2)}`;
  }

  msg += `\n\nVendedor: ${seller}`;
  msg += `\nHora: ${time}`;
  msg += `\n\nGracias por tu compra. ${seller} te atenderá en breves.`;

  window.open(
    `https://wa.me/18294103676?text=${encodeURIComponent(msg)}`
  );
}
