let cart=[];
let rate={USD:1,MXN:17,COP:3900,PEN:3.7,ARS:850};

function addProduct(name,id){
let sel=document.getElementById(id);
let [price,plan]=sel.value.split("|");
cart.push({name,plan,price:+price});
render();
toast();
window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
}

function removeItem(i){
cart.splice(i,1);
render();
}

function render(){
let items=document.getElementById("cartItems");
let total=0;
items.innerHTML="";
cart.forEach((p,i)=>{
total+=p.price;
items.innerHTML+=`
<div class="cart-item">
${p.name} (${p.plan}) - ${p.price} USD
<span onclick="removeItem(${i})">✖</span>
</div>`;
});
document.getElementById("count").innerText=cart.length;
document.getElementById("total").innerText=total.toFixed(2);
document.getElementById("cartBox")
.classList.toggle("glow",cart.length>0);
}

function convert(){
let cur=document.getElementById("currency").value;
let total=cart.reduce((a,b)=>a+b.price,0);
document.getElementById("total").innerText=
(total*rate[cur]).toFixed(2)+" "+cur;
}

function openTicket(){
if(!cart.length)return;
let s=document.getElementById("seller").value;
if(!s)return;
let [name,phone]=s.split("|");
let total=cart.reduce((a,b)=>a+b.price,0);
let msg=`🧾 FACTURA ZSTORE\n\n👤 Vendedor: ${name}\n`;
cart.forEach(p=>msg+=`• ${p.name} (${p.plan}) - ${p.price} USD\n`);
msg+=`\n💵 Total: ${total} USD\n🕒 ${new Date().toLocaleString()}`;
window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");
cart=[];
render();
}

function toast(){
let t=document.getElementById("toast");
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),1200);
}
