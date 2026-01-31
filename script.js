let selectedProduct = {name:'HG NO ROOT',plan:'10 días',price:5};
let cart = [];

function selectPlan(btn,name,plan,price){
  document.querySelectorAll('.plan').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  selectedProduct = {name,plan,price};
}

function addToCart(){
  cart.push(selectedProduct);
  showToast();
  renderCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  let total = 0;
  box.innerHTML = "";
  cart.forEach(p=>{
    total += p.price;
    box.innerHTML += `<div class="cart-item">• ${p.name} (${p.plan}) - $${p.price}</div>`;
  });
  document.getElementById("total").innerHTML = `💰 Total: $${total} USD`;
}

function showToast(){
  const t = document.getElementById("toast");
  t.style.display="block";
  setTimeout(()=>t.style.display="none",1500);
}

function openTicket(){
  const seller = document.getElementById("seller").value.split("|");
  const currency = document.getElementById("currency").value;
  const time = new Date().toLocaleString();

  let msg = `🧾 DZSTORE OFICIAL\n\n`;
  msg += `🕒 ${time}\n`;
  msg += `👤 Vendedor: ${seller[0]}\n`;
  msg += `💳 Método de pago: OTROS\n`;
  msg += `🌎 Moneda: ${currency}\n\n`;
  msg += `📦 Productos:\n`;

  let total = 0;
  cart.forEach(p=>{
    total += p.price;
    msg += `• ${p.name} - ${p.plan} ($${p.price})\n`;
  });

  msg += `\n💰 Total: $${total} USD\n\n🙏 Gracias por tu compra`;

  window.open(`https://wa.me/${seller[1].replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`);
}
