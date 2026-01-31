// ================== CONFIG ==================
const PAYPAL_EMAIL = "dzstore0817@gmail.com";

const sellers = {
  "Dz Diogo": { name: "Dz Diogo", phone: "18294103676" },
  "Dz Ozoria": { name: "Dz Ozoria", phone: "18093185425" },
  "David": { name: "David", phone: "584262984228" }
};

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

// ================== STATE ==================
let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = "";
let currency = "USD";

// ================== CART ==================
function add(name, price){
  cart.push({name,price});
  save();
  render();
  toast(`✔ ${name} agregado`);
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  save();
  render();
}

function save(){
  localStorage.setItem("dz_cart", JSON.stringify(cart));
}

// ================== RENDER ==================
function render(){
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");

  items.innerHTML = "";
  invoice.innerHTML = "";

  let total = 0;

  cart.forEach((p,i)=>{
    total += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${i+1}. ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
    invoice.innerHTML += `${i+1}. ${p.name} - ${p.price} USD<br>`;
  });

  document.getElementById("count").innerText = cart.length;

  invoice.innerHTML += `
    <hr>
    💵 Total USD: ${total}<br>
    🌍 Total ${currency}: ${Math.round(total * rates[currency])}
  `;
}

// ================== PAGO ==================
function pay(method){
  if(cart.length === 0) return alert("Carrito vacío");
  if(!seller) return alert("Selecciona un vendedor");

  const s = sellers[seller];
  if(!s) return alert("Vendedor inválido");

  const id = "DZ-" + Math.floor(10000 + Math.random()*90000);
  const total = cart.reduce((a,b)=>a + b.price, 0);

  const methodText = method === "paypal"
    ? "PayPal"
    : "Otro método de pago";

  // ===== TICKET =====
  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${id}*\n`;
  msg += `Vendedor: *${s.name}*\n`;
  msg += `Método de pago: *${methodText}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n💵 Total USD: ${total}`;
  msg += `\n🌍 Total ${currency}: ${Math.round(total * rates[currency])}`;

  // ===== WHATSAPP =====
  const wa = `https://wa.me/${s.phone}?text=${encodeURIComponent(msg)}`;
  window.open(wa, "_blank");

  // ===== PAYPAL SOLO SI ES PAYPAL =====
  if(method === "paypal"){
    setTimeout(()=>{
      const paypal =
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick` +
        `&business=${PAYPAL_EMAIL}` +
        `&item_name=DZSTORE Pedido ${id}` +
        `&amount=${total}` +
        `&currency_code=USD`;
      window.open(paypal, "_blank");
    }, 1200);
  }
}

// ================== UI ==================
function toast(msg){
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(()=>{});
}

// ================== INIT ==================
render();
