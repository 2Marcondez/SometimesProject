let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function updateOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary-items');
    const orderTotalElement = document.getElementById('order-total');
    orderSummaryContainer.innerHTML = ''; // Limpa o conteúdo atual
    total = 0;

    cart.forEach((item) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="order-item-img">
                <img src="${item.imageUrl}" alt="${item.name}">
            </div>
            <div class="order-item-info">
                <h3>${item.name} - Tamanho: ${item.size}</h3>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
            </div>
        `;
        orderSummaryContainer.appendChild(itemElement);
    });

    orderTotalElement.innerText = total.toFixed(2);
}

// Chama a função de atualização do resumo ao carregar a página
document.addEventListener('DOMContentLoaded', updateOrderSummary);
