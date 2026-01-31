*{
  box-sizing:border-box;
  margin:0;
  padding:0;
  font-family:Segoe UI,system-ui,sans-serif;
}

body{
  background:#0b0b0b;
  color:#fff;
  display:flex;
  justify-content:center;
  padding:20px;
}

.card{
  width:100%;
  max-width:420px;
  background:#111;
  border-radius:18px;
  padding:20px;
}

.subtitle{
  text-align:center;
  color:#aaa;
  font-size:14px;
  margin-bottom:20px;
}

.category{
  margin:22px 0 10px;
  color:#00ff7f;
}

.service{
  background:#181818;
  border-radius:14px;
  padding:14px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:10px;
}

.service button{
  width:42px;
  height:42px;
  border:none;
  border-radius:12px;
  background:#00ff7f;
  color:#000;
  font-size:22px;
  font-weight:bold;
}

.cart-item{
  background:#161616;
  border-radius:12px;
  padding:10px;
  margin-bottom:8px;
  display:flex;
  justify-content:space-between;
}

.cart-item button{
  background:none;
  border:none;
  color:#ff4d4d;
}

select,.btn{
  width:100%;
  margin-top:10px;
  padding:12px;
  border-radius:12px;
  border:none;
}

select{
  background:#181818;
  color:#fff;
  border:1px solid #222;
}

.btn{
  background:#00ff7f;
  color:#000;
  font-weight:bold;
}

.btn.alt{
  background:#1f1f1f;
  color:#fff;
}

.invoice{
  background:#0f0f0f;
  border-radius:12px;
  padding:12px;
  margin-top:12px;
  font-size:14px;
}

.toast{
  position:fixed;
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
  background:#00ff7f;
  color:#000;
  padding:12px 18px;
  border-radius:12px;
  opacity:0;
  transition:.3s;
}

.toast.show{
  opacity:1;
}
