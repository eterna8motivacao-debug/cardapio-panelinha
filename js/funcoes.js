const cardapio = [
    { id: 1, nome: "X-Grato", desc: "Pão, carne, queijo e muito estudo.", preco: "R$ 15,00", promo: true },
    // ... outros itens
];

function renderizarMenu() {
    const container = document.getElementById('porções');
    cardapio.forEach(item => {
        const card = document.createElement('div');
        card.className = item.promo ? 'card-promo' : 'card';
        card.innerHTML = `
            <h3>${item.nome}</h3>
            <p>${item.desc}</p>
            <strong>${item.preco}</strong>
        `;
        container.appendChild(card);
    });
}

renderizarMenu();