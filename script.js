let cart = [];
// Rates actualizados (puedes ajustarlos luego)
const rates = { USD: 1, MXN: 17.1, COP: 3950, PEN: 3.75, ARS: 820 };

// 1. Mejora en la captura del evento
function addToCart(name) {
    const card = event.currentTarget.closest('.card'); // Usamos currentTarget para evitar errores
    const plan = card.querySelector('.plan');
    
    const item = {
        id: Date.now(), // ID único para cada item
        name,
        label: plan.selectedOptions[0].dataset.label,
        price: parseFloat(plan.value)
    };

    cart.push(item);
    showToast(`✅ ${name} añadido`);
    renderCart();
}

// 2. Renderizado más limpio con Template Literals
function renderCart() {
    const box = document.getElementById("cart");
    box.innerHTML = "";
    let total = 0;

    cart.forEach((p, i) => {
        total += p.price;
        box.innerHTML += `
            <div class="cart-item" style="animation: fadeIn 0.3s ease forwards;">
                <div class="item-info">
                    <strong>${p.name}</strong><br>
                    <small>${p.label}</small>
                </div>
                <div class="item-price">
                    <b>$${p.price}</b>
                    <button class="btn-remove" onclick="removeItem(${i})">✕</button>
                </div>
            </div>`;
    });
    updateTotal(total);
}

function removeItem(i) {
    cart.splice(i, 1);
    renderCart();
}

// 3. Formateo de moneda internacional
function updateTotal(usd) {
    const cur = document.getElementById("currency").value;
    const totalLocal = (usd * rates[cur]);
    
    // Formateo elegante según la moneda
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cur,
        minimumFractionDigits: 0
    });

    let t = `💰 TOTAL: ${usd.toFixed(2)} USD`;
    if (cur !== "USD") {
        t += ` | ${formatter.format(totalLocal)}`;
    }
    document.getElementById("total").innerText = t;
}

// 4. Ticket de WhatsApp más limpio y profesional
function sendTicket() {
    if (!cart.length) return alert("❌ El carrito está vacío");
    
    const sellerSelect = document.getElementById("seller");
    const pay = document.getElementById("payment").value;
    
    if (!sellerSelect.value || !pay) return alert("⚠️ Completa vendedor y método de pago");

    const [name, phone] = sellerSelect.value.split("|");
    const orderID = "#DZ" + Math.floor(1000 + Math.random() * 9000);
    const time = new Date().toLocaleString();
    const totalUSD = cart.reduce((a, b) => a + b.price, 0);

    let msg = `*💣 DZ STORE — ORDEN CONFIRMADA*\n`;
    msg += `----------------------------------\n`;
    msg += `🆔 *ID:* ${orderID}\n`;
    msg += `⏱️ *FECHA:* ${time}\n\n`;
    msg += `📦 *PRODUCTOS:*\n`;
    
    cart.forEach(p => {
        msg += `• ${p.name} (${p.label}) - $${p.price} USD\n`;
    });

    msg += `\n💵 *TOTAL:* $${totalUSD.toFixed(2)} USD\n`;
    msg += `💳 *PAGO:* ${pay}\n`;
    msg += `👤 *VENDEDOR:* ${name}\n`;
    msg += `----------------------------------\n`;
    msg += `🚀 _El vendedor te contactará en breve._`;

    saveOrder({ order: orderID, time, totalUSD, seller: name });
    
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    cart = [];
    renderCart();
}

// 5. Guardar órdenes y Toast
function saveOrder(o) {
    const orders = JSON.parse(localStorage.getItem("dz_orders")) || [];
    orders.unshift(o);
    localStorage.setItem("dz_orders", JSON.stringify(orders.slice(0, 10))); // Guardamos solo las últimas 10
}

function showToast(text) {
    const t = document.getElementById("toast");
    t.innerText = text || "Añadido al carrito";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1500);
}
