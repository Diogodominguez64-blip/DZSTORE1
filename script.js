let cart = [];
let seller = null;
let currency = "USD";

const rates = { USD:1, MXN:17, COP:3900, ARS:900 };

function setSeller(v){ seller = v; }
function setCurrency(c){ currency = c; render(); }

function updatePrice(sel,id){
  const price = sel.value.split("|")[0];
  document.getElementById(id).innerText =
    `$${(price*rates[currency]).toFixed(2)} ${currency}`;
}

function buy(name,id,btn){
  if(!seller){ alert("Selecciona un vendedor"); return; }

  const sel = btn.parentElement.querySelector("select");
  const [price,plan] = sel.value.split("|");

  cart.push({name,plan,price});
  document.getElementById("sound").play();
  render();
}

function render(){
  const items = document.getElementById("items");
  const totalBox = document.getElementById("total");
  items.innerHTML="";
  let total=0;

  cart.forEach((p,i)=>{
    total+=p.price;
    items.innerHTML+=`
      <div class="cart">
        ${p.name} - ${p.plan}
        <b>$${(p.price*rates[currency]).toFixed(2)} ${currency}</b>
        <button onclick="cart.splice(${i},1);render()">✖</button>
      </div>`;
  });

  document.getElementById("count").innerText=cart.length;
  totalBox.innerHTML=`TOTAL: $${(total*rates[currency]).toFixed(2)} ${currency}`;
}

function pay(type){
  if(cart.length==0){ alert("Carrito vacío"); return; }

  const [name,phone]=seller.split("|");
  let msg=`🧾 NUEVO PEDIDO\nVendedor: ${name}\n\n`;

  cart.forEach(p=>{
    msg+=`• ${p.name} (${p.plan}) - $${p.price} USD\n`;
  });

  msg+=`\nMétodo: ${type.toUpperCase()}`;

  window.open(`https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`);

  if(type=="paypal"){
    window.open("https://www.paypal.com/paypalme/dzstore0817");
  }
}
