let cart = [];
let selected = null;

function selectPlan(el){
  const [name, plan, price] = el.value.split("|");
  selected = {name, plan, price: Number(price)};
}

function add(){
  if(!selected) return;
  cart.push(selected);
  render();
  document.getElementById("sound").play();
  showToast();
  document.getElementById("cart").scrollIntoView({behavior:"smooth"});
}

function render(){
  const items = document.getElementById("items");
  const totalDiv = document.getElementById("total");
  items.innerHTML = "";
  let total = 0;

  cart.forEach(p=>{
    total += p.price;
    items.innerHTML += `<div>${p.name} - ${p.plan} ($${p.price})</div>`;
  });

  totalDiv.innerText = "Total: $" + total;
}

function sendTicket(){
  if(cart.length === 0) return;

  const sellerData = document.getElementById("seller").value.split("|");
  const sellerName = sellerData[0];
  const phone = sellerData[1];
  const currency = document.getElementById("currency").value;

  let msg = `🧾 *NUEVO PEDIDO DZSTORE*\n\n`;
  cart.forEach(p=>{
    msg += `• ${p.name} (${p.plan}) - ${p.price} ${currency}\n`;
  });

  msg += `\n💳 Método: OTROS\n👤 Vendedor: ${sellerName}`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

function showToast(){
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1200);
}
