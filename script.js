let cart = [];

function add(product){
  cart.push(product);
  render();
  toast(`✔ ${product.name} (${product.plan}) agregado`);
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
  invoice.innerHTML = "";
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
