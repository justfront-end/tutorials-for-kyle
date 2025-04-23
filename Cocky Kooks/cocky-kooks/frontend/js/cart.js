let cart = [];

function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.textContent = 'Your cart is empty.';
        return;
    }

    cart.forEach(board => {
        const card = document.createElement('div');
        card.className = 'surfboard-card';

        const img = document.createElement('img');
        img.src = board.image_url;
        img.alt = board.name;

        const name = document.createElement('h3');
        name.textContent = board.name;

        const description = document.createElement('p');
        description.textContent = board.description;

        const price = document.createElement('p');
        price.textContent = `$${board.price}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);

        cartList.appendChild(card);
    });
}

async function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email) {
        alert('Name and Email are required.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message,
                selectedBoards: cart
            })
        });

        const result = await response.json();
        document.getElementById('form-success').textContent = result.message;
        document.getElementById('form-success').style.display = 'block';

        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        renderCart();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error. Please try again.');
    }
}

document.getElementById('submit-form').addEventListener('submit', submitForm);

// Home banner click
document.getElementById('home-banner').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Load cart from localStorage
window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    renderCart();
});
