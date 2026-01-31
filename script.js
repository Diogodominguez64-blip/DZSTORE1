let cart=[];
let paymentMethod="";

function add(name,price){
cart.push({name,price});
document.getElementById("cart-sound").play();
toast("✔ Agregado al carrito");
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
${p.name} - ${p.price} USD
<button onclick="cart.splice(${i},1);render()">✖</button>
</div>`;
});

document.getElementById("count").innerText=cart.length;

invoice.innerHTML=`
💵 Total: ${total} USD
`;
}

function pay(type){
if(!cart.length) return alert("Carrito vacío");
const sel=document.getElementById("seller").value;
if(!sel) return alert("Selecciona un vendedor");

paymentMethod = type==="paypal" ? "PayPal" : "Otro método";
const [seller,phone]=sel.split("|");

let msg=`🧾 *TICKET DZSTORE*\n`;
cart.forEach((p,i)=>msg+=`${i+1}. ${p.name} - ${p.price} USD\n`);
msg+=`\n💳 Pago: ${paymentMethod}`;
msg+=`\n👤 Vendedor: ${seller}`;
msg+=`\n\n✅ Gracias por tu compra,\n${seller} se comunicará contigo en breve.`;

window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

if(type==="paypal"){
setTimeout(()=>{
window.open("https://www.paypal.com/paypalme/dzstore0817");
},800);
}
}

function toast(t){
const el=document.getElementById("toast");
el.innerText=t;
el.classList.add("show");
setTimeout(()=>el.classList.remove("show"),1500);
}
