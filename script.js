let cart=[];
let currentPrice=0;

function setPrice(sel,prices){
  currentPrice=prices[sel.value];
}

function addToCart(name){
  cart.push({name,price:currentPrice});
  showToast();
  document.getElementById("sound").play();
  renderCart();
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  let cur=document.getElementById("currency").value;
  let rate=cur==="DOP"?58:1;
  let html="";
  let total=0;

  cart.forEach(p=>{
    total+=p.price*rate;
    html+=`<div>${p.name} - ${p.price*rate} ${cur}</div>`;
  });

  document.getElementById("cart").innerHTML=html;
  document.getElementById("total").innerText="Total: "+total+" "+cur;
}

function showToast(){
  let t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1500);
}

function pay(){
  let phone=document.getElementById("seller").value;
  let msg="Pedido:%0A";
  cart.forEach(p=>msg+=`- ${p.name} $${p.price}%0A`);
  window.open(`https://wa.me/${phone}?text=${msg}`);
}
