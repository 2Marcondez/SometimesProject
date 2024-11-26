// MTO DIFICIL

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function addItem(name, price, size, imageUrl) {
    cart.push({ name, price: parseFloat(price), size, imageUrl });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    alert(`${name} - Tamanho: ${size} foi adicionado ao carrinho!`);
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div>
                <h3>${item.name} - Tamanho: ${item.size}</h3>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remover</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', updateCart);

// Adiciona funcionalidade de adicionar ao carrinho na página do produto
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart');
    const sizeOptions = document.querySelectorAll('.size-option');

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            let selectedSize = '';

            sizeOptions.forEach(option => {
                if (option.classList.contains('selected')) {
                    selectedSize = option.getAttribute('data-size');
                    alert('Item adicionado ao carrinho!');
                }
            });

            if (selectedSize) {
                const priceText = document.querySelector('.price').innerText.replace(' BRL', '').replace(',', '.');
                const name = document.querySelector('.produto-info h2').innerText;
                const imageUrl = document.querySelector('.produto-img').src; // Obtém a URL da imagem
                addItem(name, priceText, selectedSize, imageUrl); // Passa a URL da imagem
            } else {
                alert('Por favor, selecione um tamanho!');
            }
        });
    }
});
