let cart = [];

const sellers = {
  "Dz Diogo": "18294103676",
  "Dz Ozoria": "18093185425",
  "David": "584262984228"
};

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

function add(name, price){
  cart.push({name, price});
  render();
  toast(`✔ ${name} agregado`);
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  render();
}

function render(){
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  const currency = document.getElementById("currency").value;

  items.innerHTML = "";
  invoice.innerHTML = "";

  let total = 0;

  cart.forEach((p,i)=>{
    total += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText = cart.length;

  invoice.innerHTML = `
    💵 Total USD: ${total}<br>
    🌍 Total ${currency}: ${Math.round(total * rates[currency])}
  `;
}

function pay(method){
  const sellerName = document.getElementById("seller").value;
  if(!sellerName) return alert("Selecciona un vendedor");
  if(!cart.length) return alert("Carrito vacío");

  const phone = sellers[sellerName];
  const currency = document.getElementById("currency").value;

  let total = cart.reduce((s,p)=>s+p.price,0);
  let id = "DZ-" + Math.floor(Math.random()*99999);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${id}*\n`;
  msg += `Vendedor: *${sellerName}*\n`;
  msg += `Método de pago: *${method.toUpperCase()}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n💵 Total USD: ${total}`;
  msg += `\n🌍 Total ${currency}: ${Math.round(total*rates[currency])}`;
  msg += `\n\nGracias por tu compra ❤️\n${sellerName} te atenderá en breve.`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

  if(method === "paypal"){
    window.open("https://www.paypal.me/dzstore0817","_blank");
  }
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
