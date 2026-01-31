let cart = [];
const rates = { USD:1, MXN:17, COP:3900, PEN:3.7, ARS:900 };

function addToCart(name){
  const card = event.target.closest('.card');
  const select = card.querySelector('.plan');

  cart.push({
    name,
    label: select.selectedOptions[0].dataset.label,
    price: parseFloat(select.value)
  });

  showToast();
  renderCart();
  document.getElementById("checkout")
    .scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  const box = document.getElementById("cart");
  box.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    box.innerHTML+=`
      <div class="cart-item">
        🔥 ${p.name} — ${p.label}
        <b>${p.price.toFixed(2)} USD</b>
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

  const sellerVal=document.getElementById("seller").value;
  const pay=document.getElementById("payment").value;
  if(!sellerVal||!pay) return alert("Completa vendedor y pago");

  const [seller,phone]=sellerVal.split("|");
  const order="#DZ-"+(Math.floor(Math.random()*90000)+10000);
  const time=new Date().toLocaleString();

  let totalUSD=cart.reduce((a,b)=>a+b.price,0);

  let msg=`🧾 DZ STORE - FACTURA
--------------------
🆔 ORDEN: ${order}
⏱️ ${time}

📦 PRODUCTOS
`;

  cart.forEach(p=>{
    msg+=`• ${p.name} ${p.label} - ${p.price} USD\n`;
  });

  msg+=`
--------------------
💳 METODO: ${pay}
👤 VENDEDOR: ${seller}

🚀 ${seller} te atenderá en breves
💚 Gracias por tu compra
`;

  saveOrder({order,time,totalUSD,seller});
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");

  cart=[];
  renderCart();
}

function saveOrder(order){
  let orders=JSON.parse(localStorage.getItem("dz_orders"))||[];
  orders.unshift(order);
  localStorage.setItem("dz_orders",JSON.stringify(orders));
}

function toggleOrders(){
  const modal=document.getElementById("ordersModal");
  modal.classList.toggle("show");
  loadOrders();
}

function loadOrders(){
  const list=document.getElementById("ordersList");
  const orders=JSON.parse(localStorage.getItem("dz_orders"))||[];

  if(!orders.length){
    list.innerHTML="<p>📭 No hay pedidos aún</p>";
    return;
  }

  list.innerHTML=orders.map(o=>`
    <div class="order-item">
      🧾 ${o.order}<br>
      👤 ${o.seller}<br>
      💰 ${o.totalUSD.toFixed(2)} USD<br>
      ⏱️ ${o.time}
    </div>
  `).join("");
}

function showToast(){
  const t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}
