let cart = [];
const cartBox = document.getElementById("cartItems");
const toast = document.getElementById("toast");

function add(product){
  cart.push(product);
  render();
  showToast();
  document.getElementById("ticket").scrollIntoView({behavior:"smooth"});
}

function render(){
  cartBox.innerHTML = "";
  cart.forEach(p=>{
    const d = document.createElement("div");
    d.textContent = "✔ " + p;
    cartBox.appendChild(d);
  });
}

function showToast(){
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
}

function openTicket(){
  const seller = document.getElementById("seller").value;
  const currency = document.getElementById("currency").value;
  const time = new Date().toLocaleString();

  let msg = `🧾 FACTURA DZSTORE\n\n`;
  cart.forEach(p=>msg+=`• ${p}\n`);
  msg += `\nVendedor: ${seller}\nMoneda: ${currency}\nHora: ${time}\n\nGracias por tu compra. ${seller} te atenderá en breves.`;

  const phone = "+18294103676";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}
