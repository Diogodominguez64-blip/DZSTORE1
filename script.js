let cart = JSON.parse(localStorage.getItem("cart")) || [];

const rates = {USD:1,MXN:17,COP:3900,PEN:3.7,ARS:900};

const sellers = {
  "David":"18294103676",
  "Dz Diogo":"18093185425",
  "Dz Ozoria":"584262984228"
};

function generateOrder(){
  return "CT-" + Math.floor(100000 + Math.random()*900000);
}

let orderId = generateOrder();
document.getElementById("orderId").innerText = `Orden #${orderId}`;

function addToCart(product,id){
  const [plan,price] = document.getElementById(id).value.split("|");
  cart.push({product,plan,price:+price});
  save();
  render();
  toast();
  document.getElementById("ticket").scrollIntoView({behavior:"smooth"});
}

function removeItem(i){
  cart.splice(i,1);
  save(); render();
}

function render(){
  const box=document.getElementById("cart");
  box.innerHTML="";
  cart.forEach((p,i)=>{
    box.innerHTML+=`
      <div class="cart-item">
        <span>${p.product} - ${p.plan} (${p.price} USD)</span>
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });
  document.getElementById("itemsCount").innerText=`Productos: ${cart.length}`;
  document.getElementById("payBtn").disabled = cart.length===0;
  updateTotals();
}

function updateTotals(){
  const total=cart.reduce((s,p)=>s+p.price,0);
  document.getElementById("totalUsd").innerText=`Total: ${total} USD`;
  const cur=document.getElementById("currency").value;
  document.getElementById("totalLocal").innerText =
    cur==="USD"?"":`Equivalente ${cur}: ${(total*rates[cur]).toFixed(2)}`;
}

function sendTicket(){
  if(!confirm("¿Deseas abrir el ticket con este pedido?"))return;
  const seller=document.getElementById("seller").value;
  const num=sellers[seller];
  const cur=document.getElementById("currency").value;
  let total=cart.reduce((s,p)=>s+p.price,0);
  let msg=`🧾 CT STORE\nOrden #${orderId}\n\n`;
  cart.forEach(p=>msg+=`• ${p.product} - ${p.plan}: ${p.price} USD\n`);
  msg+=`\nTotal: ${total} USD`;
  if(cur!=="USD")msg+=`\n${cur}: ${(total*rates[cur]).toFixed(2)}`;
  msg+=`\n\nVendedor: ${seller}\nGracias por tu compra.`;

  window.location.href=`https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  cart=[]; save(); render();
  orderId=generateOrder();
  document.getElementById("orderId").innerText=`Orden #${orderId}`;
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
}

function toast(){
  const t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

render();
