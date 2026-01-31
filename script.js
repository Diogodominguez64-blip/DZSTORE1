let cart = [];
let seller = "";

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
  const items=document.getElementById("items");
  const invoice=document.getElementById("invoice");
  items.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    items.innerHTML+=`
      <div class="cart-item">
        ${p.name} - ${p.plan} (${p.price} USD)
        <button onclick="removeItem(${i})">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText=cart.length;
  invoice.innerHTML=`💵 Total: ${total} USD`;
}

function pay(method){
  if(cart.length===0) return alert("Carrito vacío");
  if(!seller) return alert("Selecciona un vendedor");

  const id="DZ-"+Math.floor(Math.random()*99999);
  let total=cart.reduce((s,p)=>s+p.price,0);

  let msg=`🧾 *TICKET DZSTORE OFICIAL*
Pedido: *${id}*
Vendedor: *${seller}*

`;

  cart.forEach((p,i)=>{
    msg+=`${i+1}. ${p.name} - ${p.plan} (${p.price} USD)\n`;
  });

  msg+=`
------------------
💵 Total: ${total} USD
💳 Pago: ${method === "paypal" ? "PayPal" : "Otro método"}

🙏 Gracias por tu compra.
${seller} se pondrá en contacto contigo en breve.
`;

  let phone=
    seller.includes("Ozoria")?"18093185425":
    seller.includes("David")?"584262984228":
    "18294103676";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

  if(method==="paypal"){
    setTimeout(()=>{
      window.open("https://www.paypal.me/dzstore0817");
    },1200);
  }
}

function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function playSound(){
  const s=document.getElementById("cart-sound");
  s.currentTime=0;
  s.play().catch(()=>{});
}
