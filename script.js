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
    price:Number(el.value),
    plan:el.options[el.selectedIndex].text
  };
}

function addToCart(product){
  if(!selected[product]) return;
  cart.push(selected[product]);
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
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
