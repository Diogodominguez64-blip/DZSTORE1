let cart = [];
const cartBox = document.getElementById("cart");
const toast = document.getElementById("toast");

function addToCart(product, selectId){
  const plan = document.getElementById(selectId).value;
  cart.push(`${product} - ${plan}`);
  renderCart();
  showToast();
  document.getElementById("ticket").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  cartBox.innerHTML = "";
  cart.forEach(item=>{
    const div = document.createElement("div");
    div.textContent = "✔ " + item;
    cartBox.appendChild(div);
  });
}

function showToast(){
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
}

function sendTicket(){
  const seller = document.getElementById("seller").value;
  const currency = document.getElementById("currency").value;
  const time = new Date().toLocaleString();

  let msg = `🧾 FACTURA DZSTORE\n\n`;
  cart.forEach(p=>msg+=`• ${p}\n`);
  msg += `\nVendedor: ${seller}\nMoneda: ${currency}\nHora: ${time}\n\nGracias por tu compra. ${seller} te atenderá en breves.`;

  window.open(`https://wa.me/18294103676?text=${encodeURIComponent(msg)}`);
}
