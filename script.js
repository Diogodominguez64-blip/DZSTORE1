let cart=[];
const rates={USD:1,MXN:17,COP:3900,PEN:3.7,ARS:900};

function addToCart(name){
  const card=event.target.closest('.card');
  const s=card.querySelector('.plan');
  cart.push({
    name,
    label:s.selectedOptions[0].dataset.label,
    price:+s.value
  });
  showToast();
  renderCart();
}

function renderCart(){
  const box=document.getElementById("cart");
  box.innerHTML="";
  let total=0;
  cart.forEach((p,i)=>{
    total+=p.price;
    box.innerHTML+=`
      <div>🔥 ${p.name} — ${p.label} (${p.price} USD)
      <button onclick="removeItem(${i})">❌</button></div>`;
  });
  updateTotal(total);
}

function removeItem(i){cart.splice(i,1);renderCart();}

function updateTotal(usd){
  const c=document.getElementById("currency").value;
  let t=`💰 TOTAL: ${usd.toFixed(2)} USD`;
  if(c!=="USD")t+=` | ${(usd*rates[c]).toFixed(0)} ${c}`;
  total.innerText=t;
}

function sendTicket(){
  if(!cart.length)return alert("Carrito vacío");
  const [seller,phone]=seller.value.split("|");
  const pay=payment.value;
  const order="#DZ-"+Math.floor(Math.random()*90000+10000);
  const time=new Date().toLocaleString();
  let msg=`💣🧾 DZ STORE — FACTURA
🆔 ${order}
⏱️ ${time}

📦 PRODUCTOS
`;
  cart.forEach(p=>msg+=`• ${p.name} ${p.label} — ${p.price} USD\n`);
  msg+=`
💳 PAGO: ${pay}
👤 ${seller}

🚀 ${seller} te atenderá en breves`;
  saveOrder({order,seller,time});
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  cart=[];renderCart();
}

function saveOrder(o){
  let a=JSON.parse(localStorage.getItem("dz_orders"))||[];
  a.unshift(o);
  localStorage.setItem("dz_orders",JSON.stringify(a));
}

function toggleOrders(){
  ordersModal.classList.toggle("show");
  ordersList.innerHTML=(JSON.parse(localStorage.getItem("dz_orders"))||[])
    .map(o=>`<div class="order-item">🧾 ${o.order}<br>👤 ${o.seller}<br>${o.time}</div>`).join("");
}

function showToast(){
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1200);
}
