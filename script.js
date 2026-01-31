let cart = JSON.parse(localStorage.getItem("dz_cart")) || [];
let currency = "USD";
let seller = "";
let sellerPhone = "";

const rates = { USD:1, MXN:17, COP:4000, ARS:900 };

const sellers = {
  diogo: { name:"Dz Diogo", phone:"18294103676" },
  ozoria:{ name:"Dz Ozoria", phone:"18093185425" },
  david:{ name:"David", phone:"584262984228" }
};

function setSeller(key){
  seller = sellers[key].name;
  sellerPhone = sellers[key].phone;
}

function add(name, price){
  cart.push({name, price});
  save(); render();
  toast("✔ Producto agregado");
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  save(); render();
}

function save(){
  localStorage.setItem("dz_cart", JSON.stringify(cart));
}

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
        ${p.name} - ${p.price} USD
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
    invoice.innerHTML += `${i+1}. ${p.name} - ${p.price} USD<br>`;
  });

  document.getElementById("count").innerText = cart.length;
  invoice.innerHTML += `<hr>Total USD: ${total}<br>
  Total ${currency}: ${Math.round(total*rates[currency])}`;
}

function send(type){
  if(!cart.length || !sellerPhone){
    alert("Selecciona productos y vendedor");
    return;
  }

  const id = "DZ-" + Math.floor(10000 + Math.random()*90000);
  let total = cart.reduce((s,p)=>s+p.price,0);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\nPedido: *${id}*\nVendedor: *${seller}*\n\n`;
  cart.forEach((p,i)=> msg += `${i+1}. ${p.name} - ${p.price} USD\n`);
  msg += `\n💵 Total USD: ${total}`;

  window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(msg)}`);

  if(type === "paypal"){
    setTimeout(()=>{
      window.open("https://www.paypal.me/dzstore0817");
    },600);
  }
}

function toast(text){
  const t = document.getElementById("toast");
  t.innerText = text;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(()=>{});
}

render();
