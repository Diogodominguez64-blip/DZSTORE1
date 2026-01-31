let cart = [];

const rates = {
  USD:1,
  MXN:17,
  COP:4000,
  PEN:3.7,
  ARS:900
};

const phones = {
  Diogo:"18294103676",
  Ozoria:"18093185425",
  David:"584262984228"
};

function addProduct(name, plan, price){
  cart.push({name, plan, price});
  render();
  toast("Producto agregado");
  playSound();
  document.getElementById("items").scrollIntoView({behavior:"smooth"});
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
        ${p.name} (${p.plan}) - ${p.price} USD
        <button onclick="cart.splice(${i},1);render()">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText=cart.length;

  const cur=document.getElementById("currency").value;
  invoice.innerHTML=`
    🧾 FACTURA<br>
    Productos: ${cart.length}<br>
    Total USD: ${total}<br>
    Total ${cur}: ${Math.round(total*rates[cur])}
  `;
}

function pay(method){
  if(!cart.length) return alert("Carrito vacío");

  const seller=document.getElementById("seller").value;
  const cur=document.getElementById("currency").value;
  const phone=phones[seller];
  const time=new Date().toLocaleString();

  let total=cart.reduce((s,p)=>s+p.price,0);

  let msg=`🧾 *TICKET DZSTORE*\nVendedor: ${seller}\nHora: ${time}\nMétodo: ${method}\n\n`;
  cart.forEach((p,i)=>msg+=`${i+1}. ${p.name} (${p.plan}) - ${p.price} USD\n`);
  msg+=`\n💵 Total USD: ${total}\n🌍 Total ${cur}: ${Math.round(total*rates[cur])}\n\nGracias por tu compra 💚`;

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
