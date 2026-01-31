let cart = [];

function addToCart(product) {
  cart.push(product);

  const checkout = document.getElementById('checkout');
  checkout.classList.remove('hidden');

  checkout.scrollIntoView({ behavior: 'smooth' });

  alert(product + " añadido al carrito");
}

function sendTicket() {
  const seller = document.getElementById('seller').value;
  const currency = document.getElementById('currency').value;
  const time = new Date().toLocaleString();

  let message =
`🧾 TICKET DE COMPRA - DZSTORE

🕒 Fecha: ${time}
👤 Vendedor: ${seller}
💳 Método de pago: Otros
🌎 Moneda: ${currency}

📦 Productos:
${cart.join('\n')}

Gracias por tu compra 🙌
${seller} te atenderá en breves.`;

  const phone = "18294103676"; // número principal
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
