// Simulate slow loading
setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
    
    menu.innerHTML = `
        <div class="menu-item">
            <h4>Margherita</h4>
            <p>From £10</p>
        </div>
        <div class="menu-item">
            <h4>Pepperoni</h4>
            <p>From £12</p>
        </div>
    `;
}, 2000);

function submitOrder() {
    const name = document.getElementById('fname').value;
    const addr = document.getElementById('addr1').value;
    
    if (!name || !addr) {
        showToast('Please check your details');
        return;
    }
    
    // Simulate API call
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = 'Processing...';
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
