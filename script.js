let cart=[];
const rates={USD:1,MXN:17,COP:3900,PEN:3.7,ARS:900};

function addToCart(name){
  const card=event.target.closest('.card');
  const plan=card.querySelector('.plan');
  cart.push({
    name,
    label:plan.selectedOptions[0].dataset.label,
    price:parseFloat(plan.value)
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
      <div class="cart-item">
        ${p.name} — ${p.label}
        <b>${p.price} USD</b>
        <button onclick="removeItem(${i})">❌</button>
      </div>`;
  });
  updateTotal(total);
}

function removeItem(i){
  cart.splice(i,1);
  renderCart();
}

function updateTotal(usd){
  const cur=document.getElementById("currency").value;
  let t=`💰 TOTAL: ${usd.toFixed(2)} USD`;
  if(cur!=="USD") t+=` | ${(usd*rates[cur]).toFixed(0)} ${cur}`;
  document.getElementById("total").innerText=t;
}

function sendTicket(){
  if(!cart.length) return alert("Carrito vacío");
  const seller=document.getElementById("seller").value;
  const pay=document.getElementById("payment").value;
  if(!seller||!pay) return alert("Completa vendedor y pago");

  const [name,phone]=seller.split("|");
  const order="#DZ-"+(Math.floor(Math.random()*90000)+10000);
  const time=new Date().toLocaleString();
  const totalUSD=cart.reduce((a,b)=>a+b.price,0);

  let msg=`💣🧾 DZ STORE — FACTURA
🆔 ${order}
⏱️ ${time}

📦 PRODUCTOS
`;
  cart.forEach(p=>msg+=`• ${p.name} ${p.label} — ${p.price} USD\n`);

  msg+=`
💳 MÉTODO: ${pay}
👤 VENDEDOR: ${name}
🚀 ${name} te atenderá en breves`;

  saveOrder({order,time,totalUSD,seller:name});
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

  cart=[];
  renderCart();
}

function saveOrder(o){
  const orders=JSON.parse(localStorage.getItem("dz_orders"))||[];
  orders.unshift(o);
  localStorage.setItem("dz_orders",JSON.stringify(orders));
}

function toggleOrders(){
  document.getElementById("ordersModal").classList.toggle("show");
  loadOrders();
}

function loadOrders(){
  const list=document.getElementById("ordersList");
  const orders=JSON.parse(localStorage.getItem("dz_orders"))||[];
  list.innerHTML=orders.length?orders.map(o=>`
    <div class="order-item">
      🧾 ${o.order}<br>
      👤 ${o.seller}<br>
      💰 ${o.totalUSD} USD<br>
      ⏱️ ${o.time}
    </div>`).join(""):"No hay pedidos aún";
}

function showToast(){
  const t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1200);
}
