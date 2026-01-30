let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let seller = "Dz Diogo";
let currency = "USD";
let last = localStorage.getItem("dz_last") || 0;

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

function add(name, price){
  cart.push({name,price});
  save(); render();
  toast(`✔ ${name} agregado`);
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  save(); render();
}

function save(){
  localStorage.setItem("dz_cart",JSON.stringify(cart));
}

function render(){
  const items=document.getElementById("items");
  const invoice=document.getElementById("invoice");
  items.innerHTML=""; invoice.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    items.innerHTML+=`
      <div class="cart-item">
        ${i+1}. ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
    invoice.innerHTML+=`${i+1}. ${p.name} - ${p.price} USD<br>`;
  });

  document.getElementById("count").innerText=cart.length;
  invoice.innerHTML+=`<hr>
  💵 Total USD: ${total}<br>
  🌍 Total ${currency}: ${Math.round(total*rates[currency])}`;
}

function send(){
  if(!cart.length) return alert("Carrito vacío");
  const id="DZ-"+Math.floor(Math.random()*99999);
  let total=cart.reduce((s,p)=>s+p.price,0);

  let msg=`🧾 *TICKET DZSTORE OFICIAL*\nPedido: *${id}*\nVendedor: *${seller}*\n\n`;
  cart.forEach((p,i)=>msg+=`${i+1}. ${p.name} - ${p.price} USD\n`);
  msg+=`\n🌍 Moneda: ${currency}\n💱 Total local: ${Math.round(total*rates[currency])}\n💵 Total USD: ${total}`;

  let phone=seller.includes("Ozoria")?"18093185425":
            seller.includes("David")?"584262984228":"18294103676";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
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
