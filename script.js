let cart = [];
let current = null;

function selectProduct(sel,name){
  const [days,price] = sel.value.split("|");
  current = {name,days,price:Number(price)};
}

function addFromSelect(btn){
  if(!current) return;
  cart.push(current);
  current = null;
  renderCart();
  showToast("Producto añadido al carrito");
  document.getElementById("sound").play().catch(()=>{});
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  const c = document.getElementById("cart");
  c.innerHTML="";
  let total=0;
  cart.forEach(p=>{
    total+=p.price;
    c.innerHTML+=`<div>${p.name} - ${p.days} días - ${p.price} USD</div>`;
  });
  c.innerHTML+=`<strong>Total: ${total} USD</strong>`;
}

function sendTicket(){
  const seller = document.getElementById("seller").value;
  if(!seller){alert("Selecciona vendedor");return;}
  const [name,phone]=seller.split("|");
  let text=`🧾 DZSTORE OFICIAL\n\n`;
  cart.forEach(p=>{
    text+=`• ${p.name} ${p.days} días - ${p.price} USD\n`;
  });
  text+=`\nGracias por tu compra.\n${name} te atenderá en breves.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,"_blank");
}

function showToast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}
