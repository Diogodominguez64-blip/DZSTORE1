<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>DZSTORE OFICIAL</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="bg"></div>

<div class="card">
<h1>DZSTORE OFICIAL</h1>
<p class="subtitle">Cheats Premium · Pagos seguros · Soporte inmediato</p>

<!-- DRIP -->
<h3 class="category">🟣 DRIP</h3>

<div class="product">
<img src="images/drip.png">
<div class="info">
<b>DRIP NO ROOT</b>
<button onclick="add('DRIP NO ROOT - 30 días',12)">+ 12 USD</button>
</div>
</div>

<div class="product">
<img src="images/drip.png">
<div class="info">
<b>DRIP ROOT</b>
<button onclick="add('DRIP ROOT - 30 días',20)">+ 20 USD</button>
</div>
</div>

<!-- BR MODS -->
<h3 class="category">🟦 BR MODS PC</h3>

<div class="product">
<img src="images/brmods.png">
<div class="info">
<b>BR MODS PC</b>
<button onclick="add('BR MODS PC - 30 días',15)">+ 15 USD</button>
</div>
</div>

<!-- HG -->
<h3 class="category">🔵 HG CHEATS</h3>

<div class="product">
<img src="images/hg.png">
<div class="info">
<b>HG NO ROOT</b>
<button onclick="add('HG NO ROOT - 30 días',10)">+ 10 USD</button>
</div>
</div>

<div class="product">
<img src="images/hg.png">
<div class="info">
<b>HG ROOT</b>
<button onclick="add('HG ROOT - 30 días',18)">+ 18 USD</button>
</div>
</div>

<!-- STRICKS -->
<h3 class="category">🟪 STRICKS BR</h3>

<div class="product">
<img src="images/stricks.png">
<div class="info">
<b>STRICKS BR ROOT</b>
<button onclick="add('STRICKS ROOT',25)">+ 25 USD</button>
</div>
</div>

<div class="product">
<img src="images/stricks.png">
<div class="info">
<b>STRICKS BR VIRTUAL</b>
<button onclick="add('STRICKS VIRTUAL',20)">+ 20 USD</button>
</div>
</div>

<!-- CUBAN -->
<h3 class="category">🟢 CUBAN</h3>

<div class="product">
<img src="images/cuban.png">
<div class="info">
<b>CUBAN PANEL</b>
<button onclick="add('CUBAN PANEL',30)">+ 30 USD</button>
</div>
</div>

<div class="product">
<img src="images/cuban.png">
<div class="info">
<b>CUBAN RANGE</b>
<button onclick="add('CUBAN RANGE',18)">+ 18 USD</button>
</div>
</div>

<!-- CARRITO -->
<h3 class="category">🛒 Carrito (<span id="count">0</span>)</h3>
<div id="items"></div>

<select id="seller">
<option value="">👤 Seleccionar vendedor</option>
<option value="Dz Diogo|18294103676">Dz Diogo</option>
<option value="Dz Ozoria|18093185425">Dz Ozoria</option>
<option value="David|584262984228">David</option>
</select>

<div class="invoice" id="invoice"></div>

<h3 class="category">💳 Métodos de pago</h3>
<button class="btn" onclick="pay('paypal')">🅿️ PayPal</button>
<button class="btn alt" onclick="pay('otro')">📲 Otro método</button>

</div>

<div id="toast" class="toast"></div>

<audio id="cart-sound">
<source src="add.mp3" type="audio/mpeg">
</audio>

<script src="script.js"></script>
</body>
</html>
