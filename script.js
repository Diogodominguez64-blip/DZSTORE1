let cart=[];
let rates={
  USD:1,
  MXN:17,
  COP:3900,
  PEN:3.7,
  ARS:850,
  DOP:58
};

function addToCart(name,price){
  cart.push({name,price});
  showToast();
  document.getElementById("sound").play();
  renderCart();
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
}

function renderCart(){
  let cur=document.getElementById("currency").value;
  let rate=rates[cur];
  let html="";
  let total=0;

  cart.forEach(p=>{
    let converted=(p.price*rate).toFixed(2);
    total+=parseFloat(converted);
    html+=`<div>${p.name} - ${converted} ${cur}</div>`;
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
