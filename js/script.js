document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });
});


//abrir menu nav

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
window.onload = function() {
    // pra verificar se o popup já foi mostrado
    if (!localStorage.getItem("popupShown")) {
        document.getElementById('popup').style.display = 'flex';
        localStorage.setItem("popupShown", "true");
    }
};
//popup


//carrinho vazio
//carrinho vazio
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.querySelector('.checkout');
    const totalPriceElement = document.getElementById('total');
    const totalPrice = parseFloat(totalPriceElement.innerText);

    function isCartEmpty() {
        return totalPrice === 0;
    }

    checkoutButton.addEventListener('click', function(event) {
        if (isCartEmpty()) {
            event.preventDefault(); // Impede o envio do formulário ou a navegação
            alert('O carrinho está vazio. Adicione itens antes de finalizar a compra.');
        }
    });
});



// Função para abrir o menu lateral cart
// Função para abrir o menu lateral cart
// Função para abrir o menu lateral cart
function toggleCartMenu() {
    var menu = document.getElementById('cartMenu');
    menu.classList.toggle('open');
    showCartItems();
}

// Função para fechar o menu lateral
function closeCartMenu() {
    var menu = document.getElementById('cartMenu');
    menu.classList.remove('open');
}


// Função para a  pag do carrinho
function goToCart() {
    window.location.href = 'cart.html';
}

// Função p exibir os itens do carrinho 
function showCartItems() {
    var cartItemsDiv = document.getElementById('cartItems');
    var cart = JSON.parse(localStorage.getItem('cart')) || []; // Pega os itens do carrinho do localStorage
    var total = 0;
    cartItemsDiv.innerHTML = '';

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        // Exibir os itens do carrinho
        cart.forEach(function(item) {
            var itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.imageUrl}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3>${item.name} - Tamanho: ${item.size}</h3>
                    <p>Preço: ${item.price.toFixed(2)}</p>
                   </p>
                </div>
            `;
            cartItemsDiv.appendChild(itemElement);
        });
    }
}