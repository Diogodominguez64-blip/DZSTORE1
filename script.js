let cart = [];

function add(product){
  cart.push(product);
  render();
  toast(`✔ ${product.name} agregado`);
  playSound();
}

function removeItem(i){
  cart.splice(i,1);
  render();
}

function render(){
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  items.innerHTML = "";
  let total = 0;

  cart.forEach((p,i)=>{
    total += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${p.name} - ${p.plan} (${p.price} USD)
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText = cart.length;
  invoice.innerHTML = `💵 Total: ${total} USD`;
}

function toast(msg){
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(()=>{});
}

function getTotal(){
  return cart.reduce((s,p)=>s+p.price,0);
}

function payPaypal(){
  processPayment("PayPal", true);
}

function payOther(){
  processPayment("Otro método", false);
}

function processPayment(method, paypal){
  const sellerData = document.getElementById("seller").value;
  if(!sellerData || cart.length===0){
    alert("Selecciona vendedor y productos");
    return;
  }

  const [seller, phone] = sellerData.split("|");
  const total = getTotal();

  const msg = `
🧾 DZSTORE - NUEVO PEDIDO
👤 Vendedor: ${seller}

📦 Productos:
${cart.map(p=>`- ${p.name} (${p.plan})`).join("\n")}

💵 Total: ${total} USD
💳 Método: ${method}

Gracias por tu compra 💚
`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

  if(paypal){
    window.open(`https://www.paypal.me/dzstore/${total}`);
  }
}
