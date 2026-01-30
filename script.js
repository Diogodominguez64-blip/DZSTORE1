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
  invoice.innerHTML=`💵 Total USD: ${total}<br>
  🌍 Total ${currency}: ${Math.round(total*rates[currency])}`;
}

function payPaypal(){
  if(!cart.length) return alert("Carrito vacío");
  const total = cart.reduce((s,p)=>s+p.price,0);
  const paypalEmail = "TU_CORREO_PAYPAL@gmail.com";
  const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&currency_code=USD&amount=${total}&item_name=DZSTORE+Pedido`;
  window.open(url,"_blank");
}

function payWhatsapp(){
  window.open("https://wa.me/18294103676","_blank");
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
