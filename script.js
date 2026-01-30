let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = "";
let currency = "USD";

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

function add(name, price){
  cart.push({name,price});
  save();
  render();
  toast("✔ Producto agregado");
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  save();
  render();
}

function save(){
  localStorage.setItem("dz_cart",JSON.stringify(cart));
}

function render(){
  const items=document.getElementById("items");
  const invoice=document.getElementById("invoice");
  items.innerHTML="";
  invoice.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    items.innerHTML+=`
      <div class="cart-item">
        ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText=cart.length;
  invoice.innerHTML=`
    💵 Total USD: ${total}<br>
    🌍 Total ${currency}: ${Math.round(total*rates[currency])}
  `;
}

function pay(method){
  if(!cart.length) return alert("Carrito vacío");
  if(!seller) return alert("Selecciona un vendedor");

  const id = "DZ-" + Math.floor(Math.random()*99999);
  const total = cart.reduce((s,p)=>s+p.price,0);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `🆔 Pedido: *${id}*\n`;
  msg += `👤 Vendedor: *${seller}*\n`;
  msg += `💳 Método de pago: *${method === "paypal" ? "PayPal" : "Otros métodos"}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n💵 Total USD: ${total}`;
  msg += `\n🌍 Total ${currency}: ${Math.round(total*rates[currency])}`;

  // 📲 WhatsApp DZSTORE
  const phone = "18294103676";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");

  // 🅿️ Redirigir a PayPal si aplica
  if(method === "paypal"){
    const paypalEmail = "dzstore0817@gmail.com";
    const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&currency_code=USD&amount=${total}&item_name=DZSTORE+Pedido+${id}`;
    setTimeout(()=>window.open(url,"_blank"),800);
  }
}

function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s=document.getElementById("cart-sound");
  s.currentTime=0;
  s.play().catch(()=>{});
}

render();
