let cart=[];
let selected={};

const sellers={
  "Dz Diogo":"18294103676",
  "Dz Ozoria":"18093185425",
  "David":"584262984228"
};

function selectPlan(el,product){
  selected[product]={
    name:product,
    plan:el.options[el.selectedIndex].text,
    price:Number(el.value)
  };
}

function addToCart(product){
  if(!selected[product]) return;

  cart.push(selected[product]);
  showToast(`✔ ${product} añadido`);
  renderCart();

  document.getElementById("cart").scrollIntoView({behavior:"smooth"});
}

function removeItem(i){
  cart.splice(i,1);
  renderCart();
}

function renderCart(){
  const items=document.getElementById("cartItems");
  const totalBox=document.getElementById("cartTotal");

  items.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    items.innerHTML+=`
      <div class="item">
        <span>${p.name}<br><small>${p.plan}</small></span>
        <span>${p.price} USD
          <button onclick="removeItem(${i})">✖</button>
        </span>
      </div>
    `;
  });

  totalBox.innerHTML=`💰 Total: ${total} USD`;
}

function showToast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function openTicket(){
  if(cart.length===0) return;

  const seller=document.getElementById("seller").value;
  const currency=document.getElementById("currency").value;
  const phone=sellers[seller];
  const time=new Date().toLocaleString();

  let total=0;
  let list=cart.map(p=>{
    total+=p.price;
    return `• ${p.name} | ${p.plan}`;
  }).join("\n");

  const msg=`🧾 DZSTORE OFICIAL

🕒 ${time}
👤 Vendedor: ${seller}
💱 Moneda: ${currency}
💳 Método: Otros

📦 Productos:
${list}

💰 Total: ${total} ${currency}

Gracias por tu compra 💚
${seller} te atenderá en breves.`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}
