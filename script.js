function send(type){
  if(!cart.length || !sellerPhone){
    alert("Selecciona productos y vendedor");
    return;
  }

  const metodoPago = type === "paypal" ? "PayPal" : "Otro método de pago";

  const id = "DZ-" + Math.floor(10000 + Math.random()*90000);
  let total = cart.reduce((s,p)=>s+p.price,0);

  let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
  msg += `Pedido: *${id}*\n`;
  msg += `Vendedor: *${seller}*\n`;
  msg += `Método de pago: *${metodoPago}*\n\n`;

  cart.forEach((p,i)=>{
    msg += `${i+1}. ${p.name} - ${p.price} USD\n`;
  });

  msg += `\n💵 Total USD: ${total}`;

  // Enviar SIEMPRE a WhatsApp
  window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(msg)}`);

  // Redirigir a PayPal solo si es PayPal
  if(type === "paypal"){
    setTimeout(()=>{
      window.open("https://www.paypal.me/dzstore0817","_blank");
    },600);
  }
}
