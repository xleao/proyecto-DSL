let cart = JSON.parse(localStorage.getItem('cart')) || [];

let selectedSizePDP = null;

function selectSize(btn, size) {
    selectedSizePDP = size;
    document.querySelectorAll('.size-btn').forEach(b => {
        b.style.borderColor = '#ccc';
        b.style.borderWidth = '1px';
    });
    btn.style.borderColor = 'black';
    btn.style.borderWidth = '2px';
}

function addToCartPDP(id, name, price, image) {
    if (!selectedSizePDP) return alert('Por favor, selecciona un formato primero.');
    const qtyInput = document.getElementById('pdp-qty');
    const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    addToCart(id, name, price, image, selectedSizePDP, qty);
}

function addToCartWithDropdown(id, name, price, image) {
    const sizeSelect = document.getElementById('size-' + id);
    const size = sizeSelect ? sizeSelect.value : 'Única';
    const qtyInput = document.getElementById('qty-' + id);
    const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    addToCart(id, name, price, image, size, qty);
}

function addToCart(id, name, price, image, size = 'Única', qty = 1) {
    const existingIndex = cart.findIndex(item => item.id === id && item.size === size);
    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + qty;
    } else {
        cart.push({ id, name, price, image: image, imageUrl: image, size, quantity: qty });
    }
    saveCart();
    updateCartUI();
    
    // Feedback visual en el botón
    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> OK';
    setTimeout(() => { btn.innerHTML = originalHTML; }, 1000);
}


function saveCart() { 
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function updateCartUI() {
    const counter = document.querySelector('.cart-count');
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += (item.quantity || 1);
    });
    if(counter) counter.innerText = totalItems;
    
    const cartItems = document.querySelector('.cart-items');
    if(!cartItems) return;
    
    // Isomorphic Handlebars rendering
    const source = document.getElementById('cart-item-template').innerHTML;
    const template = Handlebars.compile(source);
    
    let total = 0;
    const context = cart.map((item) => {
        const itemQty = item.quantity || 1;
        total += Number(item.price) * itemQty;
        const imgUrl = item.image || item.imageUrl || '';
        return { 
            ...item, 
            price: Number(item.price).toFixed(2), 
            quantity: itemQty,
            image: imgUrl, 
            imageUrl: imgUrl 
        };
    });
    
    cartItems.innerHTML = template(context);
    
    const totalEl = document.getElementById('cart-total-price');
    if(totalEl) totalEl.innerText = '$' + total.toFixed(2);
}

function removeFromCart(index) { 
    cart.splice(index, 1); 
    saveCart(); 
    updateCartUI(); 
}

function toggleCart() { 
    document.getElementById('cart-sidebar').classList.toggle('open'); 
    document.getElementById('cart-overlay').classList.toggle('open'); 
}

function toggleMobileMenu() {
    document.getElementById('nav-menu').classList.toggle('open');
    const toggleIcon = document.querySelector('.menu-toggle i');
    if (toggleIcon) {
        toggleIcon.classList.toggle('fa-bars');
        toggleIcon.classList.toggle('fa-xmark');
    }
}

function closeCart() { 
    document.getElementById('cart-sidebar').classList.remove('open'); 
    document.getElementById('cart-overlay').classList.remove('open'); 
}

function openCheckout() {
    if(cart.length === 0) return alert("El carrito está vacío");
    closeCart();
    document.getElementById('checkout-modal').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

function processPayment(event) {
    event.preventDefault();
    document.querySelector('.checkout-modal form').style.display = 'none';
    document.getElementById('checkout-title').style.display = 'none';
    document.querySelector('.checkout-modal .spinner').style.display = 'block';
    
    // Petición POST para enviar el correo desde el Backend
    fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart })
    }).catch(e => console.error('Error enviando correo:', e));

    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        
        // Mostrar UI de éxito en lugar del feo alert
        document.querySelector('.checkout-modal .spinner').style.display = 'none';
        
        const successDiv = document.createElement('div');
        successDiv.className = 'payment-success-ui';
        successDiv.innerHTML = `
            <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
            <h2>¡Pago Exitoso!</h2>
            <p>Gracias por tu compra. Tu recibo virtual se ha enviado.</p>
            <button class="btn-continue-shopping" style="margin-top:20px;" onclick="closeCheckoutAndReset()">Continuar Comprando</button>
        `;
        document.getElementById('checkout-modal').appendChild(successDiv);
        
    }, 2000);
}

function closeCheckoutAndReset() {
    closeCheckout();
    setTimeout(() => {
        const successDiv = document.querySelector('.payment-success-ui');
        if (successDiv) successDiv.remove();
        
        document.querySelector('.checkout-modal form').style.display = 'flex';
        document.getElementById('checkout-title').style.display = 'block';
    }, 300);
}

document.addEventListener('DOMContentLoaded', updateCartUI);

function showLanguageLoader(event, lang) {
    event.preventDefault();
    document.body.style.opacity = '0.5';
    document.body.style.pointerEvents = 'none';
    window.location.href = '/lang/' + lang;
}
