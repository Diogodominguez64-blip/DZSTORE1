let cart = [];
const rates = { USD: 1, MXN: 17.1, COP: 3950, PEN: 3.75, ARS: 820 };

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
            <div class="cart-item">
                <span>${p.name} (${p.label})</span>
                <div>
                    <b>$${p.price}</b>
                    <button onclick="removeItem(${i})" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">✕</button>
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
    
    let t = `💰 TOTAL: ${usd.toFixed(2)} USD`;
    if (cur !== "USD") {
        t += ` | ${totalLocal.toLocaleString()} ${cur}`;
    }
    document.getElementById("total").innerText = t;
}

function sendTicket() {
    if (!cart.length) return alert("Carrito vacío");
    const sellerSelect = document.getElementById("seller");
    const pay = document.getElementById("payment").value;
    
    if (!sellerSelect.value || !pay) return alert("Completa vendedor y pago");

    const [name, phone] = sellerSelect.value.split("|");
    const orderID = "#DZ" + Math.floor(1000 + Math.random() * 9000);
    const totalUSD = cart.reduce((a, b) => a + b.price, 0);

    let msg = `*💣 DZ STORE — FACTURA*\n🆔 ${orderID}\n\n*PRODUCTOS:*\n`;
    cart.forEach(p => msg += `• ${p.name} (${p.label}) — ${p.price} USD\n`);
    msg += `\n*PAGO:* ${pay}\n*VENDEDOR:* ${name}\n🚀 El vendedor te atenderá en breves.`;

    saveOrder({ order: orderID, time: new Date().toLocaleString(), totalUSD, seller: name });
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);

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
        <div class="order-item">
            <b>${o.order}</b> - ${o.totalUSD} USD<br>
            <small>${o.time}</small>
        </div>`).join("") : "Sin pedidos aún";
}

function showToast() {
    const t = document.getElementById("toast");
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1200);
}
