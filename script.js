let cart = [];

const rates = {
  USD: 1,
  MXN: 17,
  COP: 3900,
  PEN: 3.7,
  ARS: 900
};

const phones = {
  "Dz Diogo": "+18294103676",
  "Dz Ozoria": "+18093185425",
  "David": "+584262984228"
};

function addFromSelect(name, selectId){
  const select = document.getElementById(selectId);
  const price = Number(select.value);
  const plan = select.options[select.selectedIndex].text;

  cart.push({ name, plan, price });
  playSound();
  toast("Producto añadido al carrito");
  render();

  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
}

function render(){
  const items = document.getElementById("items");
  const invoice = document.getElementById("invoice");
  const currency = document.getElementById("currency").value;

  items.innerHTML = "";
  let totalUSD = 0;

  cart.forEach((p,i)=>{
    totalUSD += p.price;
    items.innerHTML += `
      <div class="cart-item">
        ${p.name} - ${p.plan}
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText = cart.length;

  const local = (totalUSD * rates[currency]).toFixed(2);

  invoice.innerHTML = `
    <strong>Total:</strong><br>
    ${totalUSD} USD<br>
    ${local} ${currency}
  `;
}

function removeItem(i){
  cart.splice(i,1);
  render();
}

function openTicket(){
  const seller = document.getElementById("seller").value;
  const currency = document.getElementById("currency").value;

  if(!seller || cart.length === 0){
    alert("Selecciona vendedor y productos");
    return;
  }

  let total = cart.reduce((s,p)=>s+p.price,0);
  let local = (total * rates[currency]).toFixed(2);
  let time = new Date().toLocaleString();

  let msg = `🧾 *DZSTORE OFICIAL*\n\n`;
  cart.forEach(p=>{
    msg += `• ${p.name} - ${p.plan}\n`;
  });

  msg += `\n💵 Total: ${total} USD\n`;
  msg += `💱 Total local: ${local} ${currency}\n`;
  msg += `🕒 Fecha: ${time}\n\n`;
  msg += `✅ Gracias por tu compra.\n`;
  msg += `👤 *${seller}* te atenderá en breves.`;

  window.open(`https://wa.me/${phones[seller]}?text=${encodeURIComponent(msg)}`);
}

function toast(text){
  const t = document.getElementById("toast");
  t.innerText = text;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s = document.getElementById("cart-sound");
  s.currentTime = 0;
  s.play().catch(()=>{});
}
