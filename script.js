let cart = [];
let seller = "";
let currency = "USD";
let paymentMethod = "";

const rates = {
  USD: 1,
  MXN: 17,
  COP: 4000,
  ARS: 900
};

const sellerPhones = {
  "Dz Diogo": "18294103676",
  "Dz Ozoria": "18093185425",
  "David": "584262984228"
};

function add(product){
  cart.push(product);
  render();
  toast(`✔ ${product.name} (${product.plan}) agregado`);
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  render();
}

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
      </div>
    `;
  });

  document.getElementById("count").innerText = cart.length;

  let totalLocal = Math.round(totalUSD * rates[currency]);

  invoice.innerHTML = `
    🧾 <b>Resumen</b><br>
    👤 Vendedor: ${seller || "-"}<br>
    💳 Método de pago: ${paymentMethod || "-"}<br><br>
    💵 Total USD: ${totalUSD}<br>
    🌍 Total ${currency}: ${totalLocal}
  `;
}

function pay(method){
  if(!cart.length){
    alert("Carrito vacío");
    return;
  }

  if(!seller){
    alert("Selecciona un vendedor");
    return;
  }

  paymentMethod = method === "paypal" ? "PayPal" : "Otro método de pago";
  render();

  sendTicket();

  if(method === "paypal"){
    setTimeout(()=>{
      window.open(
        "https://www.paypal.com/paypalme/dzstore0817",
        "_blank"
      );
    }, 800);
  }
}

function sendTicket(){
  const phone = sellerPhones[seller];
  let totalUSD = cart.reduce((s,p)=>s+p.price,0);
  let totalLocal = Math.round(totalUSD * rates[currency]);
  let orderId = "DZ-" + Math.floor(Math.random()*99999);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${orderId}*\n`;
  msg += `Vendedor: *${seller}*\n`;
  msg += `Método de pago: *${paymentMethod}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.plan} (${p.price} USD)\n`;
  });

  msg += `\n💵 Total USD: ${totalUSD}`;
  msg += `\n🌍 Total ${currency}: ${totalLocal}`;
  msg += `\n\n✅ Gracias por tu compra.\nUn vendedor se pondrá en contacto contigo en breve.`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

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
