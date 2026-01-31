let cart = [];
// Tasas de cambio actualizadas
const rates = { USD: 1, MXN: 18.5, COP: 4000, PEN: 3.7, ARS: 1000 };

// 1. FUNCIÓN NUEVA: Actualiza los precios visuales de las tarjetas
function updateAllCurrency() {
    const cur = document.getElementById("currency").value;
    const priceElements = document.querySelectorAll(".val");
    const labelElements = document.querySelectorAll(".cur");

    priceElements.forEach(el => {
        const usdValue = parseFloat(el.getAttribute("data-usd"));
        const converted = (usdValue * rates[cur]).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        el.innerText = converted;
    });

    labelElements.forEach(el => el.innerText = cur);
    
    // También refrescamos el carrito para que los items dentro cambien de moneda
    renderCart();
}

// 2. FUNCIÓN NUEVA: Actualiza el valor base cuando cambias de plan (1 día, 7 días, etc.)
function updateCardPrice(selectElement) {
    const card = selectElement.closest('.card');
    const priceDisplay = card.querySelector('.val');
    // Actualizamos el atributo data-usd con el valor del nuevo plan
    priceDisplay.setAttribute("data-usd", selectElement.value);
    // Refrescamos la conversión visual
    updateAllCurrency();
}

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
    const cur = document.getElementById("currency").value;
    box.innerHTML = "";
    let totalUSD = 0;

    cart.forEach((p, i) => {
        totalUSD += p.price;
        const localPrice = (p.price * rates[cur]).toLocaleString(undefined, {minimumFractionDigits: 2});
        
        box.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#121212; padding:12px; border-radius:8px; margin-bottom:8px; border-left:4px solid #3cff78;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-weight:bold; font-size:14px;">${p.name}</span>
                    <small style="color:#888;">${p.label}</small>
                </div>
                <div style="display:flex; align-items:center;">
                    <b style="color:#3cff78;">${localPrice} ${cur}</b>
                    <button onclick="removeItem(${i})" style="background:none; border:none; color:#ff4757; cursor:pointer; font-size:18px; margin-left:15px;">✕</button>
                </div>
            </div>`;
    });
    updateTotal(totalUSD);
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
        t = `TOTAL: ${totalLocal.toLocaleString(undefined, {minimumFractionDigits: 2})} ${cur}`;
    }
    document.getElementById("total").innerText = t;
}

function sendTicket() {
    if (!cart.length) return alert("⚠️ El carrito está vacío");
    const sellerSelect = document.getElementById("seller");
    const pay = document.getElementById("payment").value;
    
    if (!sellerSelect.value || !pay) return alert("⚠️ Selecciona vendedor y método de pago");

    const [name, phone] = sellerSelect.value.split("|");
    const orderID = "DZ-" + Math.floor(10000 + Math.random() * 90000); 
    const totalUSD = cart.reduce((a, b) => a + b.price, 0);
    const currency = document.getElementById("currency").value;
    const totalLocal = (totalUSD * rates[currency]).toLocaleString(undefined, {minimumFractionDigits: 2});
    
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let msg = `🧾 *TICKET DZSTORE OFICIAL*\n`;
    msg += `🆔 Pedido: *${orderID}*\n`;
    msg += `👤 Vendedor: *${name}*\n`;
    msg += `💳 Método de pago: *${pay}*\n`;
    msg += `⏰ Hora: *${time}*\n\n`;

    cart.forEach((p, index) => {
        msg += `${index + 1}. ${p.name} – ${p.label}\n`;
    });

    if(currency !== "USD") {
        msg += `\n🌍 Total ${currency}: *${totalLocal}*`;
    } else {
        msg += `\n💵 Total USD: *${totalUSD.toFixed(2)}*`;
    }

    msg += `\n\nGracias por confiar en *DZ Store*. ${name} te atenderá en breves.`;

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
