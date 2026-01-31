let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let sellerKey = "";
let sellerName = "";
let currency = "USD";

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

// NÚMEROS DE VENDEDORES (BIEN SEPARADOS)
const sellers = {
  diogo: { name:"Dz Diogo", phone:"18294103676" },
  ozoria:{ name:"Dz Ozoria", phone:"18093185425" },
  david:{ name:"David", phone:"584262984228" }
};

// PAYPAL
const PAYPAL_EMAIL = "dzstore0817@gmail.com";

// ================= AGREGAR PRODUCTO =================
function add(name, price){
  cart.push({name,price});
  save();
  render();
  toast(`✔ ${name} agregado`);
  playSound();
}

// ================= ELIMINAR =================
function removeItem(i){
  cart.splice(i,1);
  save();
  render();
}

// ================= VENDEDOR =================
function selectSeller(key){
  sellerKey = key;
  sellerName = sellers[key].name;
}

// ================= STORAGE =================
function save(){
  localStorage.setItem("dz_cart",JSON.stringify(cart));
}

// ================= RENDER =================
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
  });

  document.getElementById("count").innerText = cart.length;

  if(cart.length){
    invoice.innerHTML = `
      <strong>Resumen:</strong><br>
      Productos: ${cart.length}<br>
      Total USD: ${total}<br>
      Total ${currency}: ${Math.round(total*rates[currency])}
    `;
  }
}

// ================= PAGOS =================
function pay(method){
  if(!cart.length) return alert("Carrito vacío");
  if(!sellerKey) return alert("Selecciona un vendedor");

  const seller = sellers[sellerKey];
  const id = "DZ-" + Math.floor(10000 + Math.random()*90000);
  const total = cart.reduce((s,p)=>s+p.price,0);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${id}*\n`;
  msg += `Vendedor: *${seller.name}*\n`;
  msg += `Método de pago: *${method === "paypal" ? "PayPal" : "Otro método"}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n💵 Total USD: ${total}`;
  msg += `\n🌍 Total ${currency}: ${Math.round(total*rates[currency])}`;

  // ENVIAR A WHATSAPP
  const wa = `https://wa.me/${seller.phone}?text=${encodeURIComponent(msg)}`;
  window.open(wa,"_blank");

  // SI ES PAYPAL → REDIRIGE
  if(method === "paypal"){
    setTimeout(()=>{
      const paypalLink =
        `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick` +
        `&business=${PAYPAL_EMAIL}` +
        `&item_name=DZSTORE Pedido ${id}` +
        `&amount=${total}` +
        `&currency_code=USD`;

      window.open(paypalLink,"_blank");
    }, 1200);
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

render();
