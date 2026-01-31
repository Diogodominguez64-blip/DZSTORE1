let cart = [];
const rates = { MXN:17, COP:3900, PEN:3.7, ARS:900 };

function addToCart(name){
  const card = event.target.closest('.card');
  const select = card.querySelector('.plan');
  const price = parseFloat(select.value);
  const label = select.selectedOptions[0].dataset.label;

  cart.push({name, label, price});
  showToast();
  renderCart();
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  const box = document.getElementById("cart");
  box.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    box.innerHTML+=`📦 ${p.name} — ${p.label} (${p.price} USD)
    <button onclick="removeItem(${i})">❌</button><br>`;
  });

  updateTotal(total);
}

function removeItem(i){
  cart.splice(i,1);
  renderCart();
}

function updateTotal(usd){
  const cur = document.getElementById("currency").value;
  let text = `💰 Total: ${usd.toFixed(2)} USD`;
  if(cur!=="USD"){
    text += ` | ${ (usd*rates[cur]).toFixed(0) } ${cur}`;
  }
  document.getElementById("total").innerText=text;
}

document.getElementById("currency").addEventListener("change",()=>{
  let sum = cart.reduce((a,b)=>a+b.price,0);
  updateTotal(sum);
});

function sendTicket(){
  if(!cart.length) return alert("Carrito vacío");
  const seller = document.getElementById("seller").value;
  if(!seller) return alert("Selecciona vendedor");

  const [name, phone] = seller.split("|");
  const order = Math.floor(Math.random()*90000)+10000;
  const time = new Date().toLocaleTimeString();

  let msg = `🧾 DZ STORE — FACTURA\n`;
  msg+=`🔢 ORDEN: #DZ-${order}\n⏱️ ${time}\n\n📦 PRODUCTOS\n`;
  cart.forEach(p=>msg+=`• ${p.name} ${p.label} — ${p.price} USD\n`);
  msg+=`\n💳 MÉTODO: OTROS\n👤 VENDEDOR: ${name}\n🧠 Gracias por tu compra`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  cart=[];
  renderCart();
}

function showToast(){
  const t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}
