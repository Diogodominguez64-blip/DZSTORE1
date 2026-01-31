let cart = [];
let seller = "";
let currency = "USD";

const rates = {
  USD: 1,
  MXN: 17,
  COP: 3900,
  ARS: 900
};

const sellerPhones = {
  "Dz Diogo": "593999999999",
  "Dz Ozoria": "593888888888",
  "David": "593777777777"
};

// ================= AGREGAR PRODUCTO =================
function add(product){
  cart.push(product);
  render();
  toast(`✔ ${product.name} (${product.plan}) agregado`);
  playSound();
}

// ================= ELIMINAR =================
function removeItem(i){
  cart.splice(i,1);
  render();
}

// ================= RENDER =================
function render(){
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  items.innerHTML = "";
  invoice.innerHTML = "";

  let totalUSD = 0;

  cart.forEach((p,i)=>{
    totalUSD += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${p.name} - ${p.plan} (${p.price} USD)
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  const converted = (totalUSD * rates[currency]).toFixed(2);

  document.getElementById("count").innerText = cart.length;
  invoice.innerHTML = `
    <strong>Total:</strong> ${converted} ${currency}
  `;
}

// ================= PAGO =================
function pay(method){
  if(cart.length === 0){
    alert("❌ El carrito está vacío");
    return;
  }

  if(!seller){
    alert("❌ Selecciona un vendedor");
    return;
  }

  const phone = sellerPhones[seller];
  let totalUSD = cart.reduce((s,p)=>s+p.price,0);
  const converted = (totalUSD * rates[currency]).toFixed(2);

  let ticket = `🧾 *NUEVO PEDIDO DZSTORE*\n\n`;
  cart.forEach(p=>{
    ticket += `• ${p.name} - ${p.plan} (${p.price} USD)\n`;
  });

  ticket += `
----------------------
💰 Total: ${converted} ${currency}
💳 Método de pago: ${method === "paypal" ? "PayPal" : "Otro método"}
👤 Vendedor: ${seller}

Gracias por tu compra 💚
En breve ${seller} te atenderá.
`;

  // WhatsApp
  const wa = `https://wa.me/${phone}?text=${encodeURIComponent(ticket)}`;
  window.open(wa, "_blank");

  // PayPal redirect
  if(method === "paypal"){
    setTimeout(()=>{
      window.open(
        `https://www.paypal.com/paypalme/dzstore0817/${totalUSD}`,
        "_blank"
      );
    }, 800);
  }
}

// ================= TOAST =================
function toast(msg){
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

// ================= SONIDO =================
function playSound(){
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(()=>{});
}
