let cart = [];
// Tasas de cambio (puedes ajustarlas según el mercado)
const rates = { USD: 1, MXN: 17.5, COP: 3900, PEN: 3.7, ARS: 850 };

function addToCart(name) {
    const card = event.currentTarget.closest('.card');
    const plan = card.querySelector('.plan');
    
    cart.push({
        name,
        label: plan.selectedOptions[0].dataset.label,
        price: parseFloat(plan.value)
    });

    showToast();
    renderCart();
}

function renderCart() {
    const box = document.getElementById("cart");
    box.innerHTML = "";
    let total = 0;

    cart.forEach((p, i) => {
        total += p.price;
        box.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#121212; padding:12px; border-radius:8px; margin-bottom:8px; border-left:4px solid #3cff78;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-weight:bold; font-size:14px;">${p.name}</span>
                    <small style="color:#888;">${p.label}</small>
                </div>
                <div style="display:flex; align-items:center;">
                    <b style="color:#3cff78;">$${p.price} USD</b>
                    <button onclick="removeItem(${i})" style="background:none; border:none; color:#ff4757; cursor:pointer; font-size:18px; margin-left:15px;">✕</button>
                </div>
            </div>`;
    });
    updateTotal(total);
}

function removeItem(i) {
    cart.splice(i, 1);
    renderCart();
}

function updateTotal(usd) {
    const cur = document.getElementById("currency").value;
    const totalLocal = (usd * rates[cur]);
    let t = `TOTAL: ${usd.toFixed(2)} USD`;
    if (cur !== "USD") {
        t += ` | ${totalLocal.toLocaleString('es-CO')} ${cur}`;
    }
    document.getElementById("total").innerText = t;
}

// ESTA ES LA PARTE QUE HACE EL TICKET PROFESIONAL
function sendTicket() {
    if (!cart.length) return alert("⚠️ El carrito está vacío");
    const sellerSelect = document.getElementById("seller");
    const pay = document.getElementById("payment").value;
    
    if (!sellerSelect.value || !pay) return alert("⚠️ Selecciona vendedor y método de pago");

    const [name, phone] = sellerSelect.value.split("|");
    // Generamos un ID de orden más profesional de 6 dígitos
    const orderID = "DZ-" + Math.floor(100000 + Math.random() * 900000); 
    const totalUSD = cart.reduce((a, b) => a + b.price, 0);
    const currency = document.getElementById("currency").value;
    const totalLocal = (totalUSD * rates[currency]).toLocaleString();

    // Formateo del mensaje para WhatsApp con estilo profesional
    let msg = `*🎫 NUEVA ORDEN - DZ STORE*\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `🆔 *ORDEN:* ${orderID}\n`;
    msg += `👤 *CLIENTE:* Solicitando acceso\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `📦 *PRODUCTOS:*\n`;
    
    cart.forEach(p => {
        msg += `▸ *${p.name}*\n  └ _${p.label}_ → *$${p.price} USD*\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL A PAGAR:* \n`;
    msg += `💵 *$${totalUSD.toFixed(2)} USD*\n`;
    if(currency !== "USD") {
        msg += `🪙 *${totalLocal} ${currency}*\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `💳 *MÉTODO:* ${pay}\n`;
    msg += `👤 *VENDEDOR:* ${name}\n\n`;
    msg += `🚀 _Enviando comprobante de pago..._`;

    saveOrder({ order: orderID, time: new Date().toLocaleString(), totalUSD, seller: name });
    
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    cart = [];
    renderCart();
}

function saveOrder(o) {
    const orders = JSON.parse(localStorage.getItem("dz_orders")) || [];
    orders.unshift(o);
    localStorage.setItem("dz_orders", JSON.stringify(orders.slice(0, 5)));
}

function toggleOrders() {
    document.getElementById("ordersModal").classList.toggle("show");
    loadOrders();
}

function loadOrders() {
    const list = document.getElementById("ordersList");
    const orders = JSON.parse(localStorage.getItem("dz_orders")) || [];
    list.innerHTML = orders.length ? orders.map(o => `
        <div style="background:#121212; padding:12px; border-radius:8px; margin-bottom:10px; font-size:13px; border-left: 2px solid #3cff78;">
            <b style="color:#3cff78;">${o.order}</b> - ${o.totalUSD} USD<br>
            <small style="color:#666;">${o.time} | Vendedor: ${o.seller}</small>
        </div>`).join("") : "No hay pedidos recientes";
}

function showToast() {
    const t = document.getElementById("toast");
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1500);
}
