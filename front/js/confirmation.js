//récupère l'orderId dans l'url et l'affiche sur la page 
const orderId = new URL(window.location.href).searchParams.get("orderId");
const orderIdContainer = document.getElementById('orderId');
orderIdContainer.innerHTML = orderId;
localStorage.clear()


