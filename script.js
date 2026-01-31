let cart = [];

const rates = {
  USD: 1,
  MXN: 17,
  COP: 3900,
  PEN: 3.7,
  ARS: 900
};

function addToCart(product, selectId){
  const val = document.getElementById(selectId).value.split("|");
  cart.push({
    product,
    plan: val[0],
    price: parseFloat(val[1])
  });
  renderCart();
  showToast();
  document.getElementById("ticket").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  const cartBox = document.getElementById("cart");
  cartBox.innerHTML = "";
  cart.forEach(i=>{
    cartBox.innerHTML += `<div>✔ ${i.product} - ${i.plan} (${i.price} USD)</div>`;
  });
  updateTotals();
}

function updateTotals(){
  let total = cart.reduce((s,i)=>s+i.price,0);
  document.getElementById("totalUsd").innerText = `Total: ${total} USD`;

  const cur = document.getElementById("currency").value;
  const converted = (total * rates[cur]).toFixed(2);
  document.getElementById("totalLocal").innerText =
    cur === "USD" ? "" : `Equivalente en ${cur}: ${converted}`;
}

function showToast(){
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function sendTicket(){
  const seller = document.getElementById("seller").value;
  const currency = document.getElementById("currency").value;
  const time = new Date().toLocaleString();

  let total = cart.reduce((s,i)=>s+i.price,0);
  let msg = `🧾 FACTURA DZSTORE\n\n`;

  cart.forEach(i=>{
    msg += `• ${i.product} - ${i.plan}: ${i.price} USD\n`;
  });

  if(currency !== "USD"){
    msg += `\nTotal: ${total} USD`;
    msg += `\nEquivalente en ${currency}: ${(total*rates[currency]).toFixed(2)}`;
  }else{
    msg += `\nTotal: ${total} USD`;
  }

  msg += `\n\nVendedor: ${seller}\nHora: ${time}\n\nGracias por tu compra. ${seller} te atenderá en breves.`;

  window.open(`https://wa.me/18294103676?text=${encodeURIComponent(msg)}`);
}
