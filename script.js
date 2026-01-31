let cart = [];

const rates = {
  USD: 1,
  MXN: 17,
  COP: 3900,
  PEN: 3.7,
  ARS: 900
};

function addToCart(name){
  const card = event.target.closest('.card');
  const select = card.querySelector('.plan');
  const price = parseFloat(select.value);
  const label = select.selectedOptions[0].dataset.label;

  cart.push({ name, label, price });

  showToast();
  renderCart();
  document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
}

function renderCart(){
  const box = document.getElementById("cart");
  box.innerHTML = "";

  let total = 0;

  cart.forEach((p, i) => {
    total += p.price;
    box.innerHTML += `
      <div class="cart-item">
        <span>📦 ${p.name} — ${p.label}</span>
        <span>${p.price.toFixed(2)} USD</span>
        <button onclick="removeItem(${i})">✖</button>
      </div>
    `;
  });

  updateTotal(total);
}

function removeItem(i){
  cart.splice(i, 1);
  renderCart();
}

function updateTotal(usd){
  const cur = document.getElementById("currency").value;
  let text = `💰 Total: ${usd.toFixed(2)} USD`;

  if(cur !== "USD"){
    text += ` | ${(usd * rates[cur]).toFixed(0)} ${cur}`;
  }

  document.getElementById("total").innerText = text;
}

document.getElementById("currency").addEventListener("change", () => {
  let sum = cart.reduce((a, b) => a + b.price, 0);
  updateTotal(sum);
});

function sendTicket(){
  if(!cart.length){
    alert("Carrito vacío");
    return;
  }

  const sellerValue = document.getElementById("seller").value;
  if(!sellerValue){
    alert("Selecciona un vendedor");
    return;
  }

  const [sellerName, phone] = sellerValue.split("|");

  const order = Math.floor(Math.random() * 90000) + 10000;
  const time = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  let msg = 
`DZ STORE — FACTURA
ORDEN: #DZ-${order}
HORA: ${time}

PRODUCTOS:
`;

  cart.forEach(p => {
    msg += `- ${p.name} ${p.label} — ${p.price.toFixed(2)} USD\n`;
  });

  msg += `
METODO DE PAGO: OTROS
VENDEDOR: ${sellerName}

${sellerName} te atenderá en breves.
Gracias por tu compra.
`;

  // Abrir WhatsApp directo
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");

  // Limpiar carrito
  cart = [];
  renderCart();
}

function showToast(){
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1500);
}
