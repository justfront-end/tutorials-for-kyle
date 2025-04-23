let cart = [];

async function fetchSurfboards() {
    const response = await fetch('http://localhost:3001/api/boards');
    const boards = await response.json();
    renderSurfboards(boards);
}

function renderSurfboards(boards) {
    const grid = document.getElementById('surfboards-grid');
    grid.innerHTML = '';

    boards.forEach(board => {
        const card = document.createElement('div');
        card.className = 'surfboard-card';
        card.dataset.id = board.id;

        const img = document.createElement('img');
        img.src = board.image_url;
        img.alt = board.name;

        const name = document.createElement('h3');
        name.textContent = board.name;

        const description = document.createElement('p');
        description.textContent = board.description;

        const price = document.createElement('p');
        price.textContent = `$${board.price}`;

        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.addEventListener('click', () => toggleCart(board, card, button));

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(button);

        grid.appendChild(card);
    });
}

function toggleCart(board, card, button) {
    const index = cart.findIndex(item => item.id === board.id);
    if (index === -1) {
        cart.push(board);
        card.classList.add('selected');
        button.textContent = 'Remove from Cart';
    } else {
        cart.splice(index, 1);
        card.classList.remove('selected');
        button.textContent = 'Add to Cart';
    }
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('cart-banner').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Load existing cart from localStorage
window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
    fetchSurfboards();
});
