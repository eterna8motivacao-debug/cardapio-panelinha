// 📦 Array de Produtos
const produtos = [
    { id:1, nome:"Sopa de Carne", descricao:"Porção de 500ml", preco:9.99 },
    { id:2, nome:"Caldo de Quenga", descricao:"Porção de 500ml", preco:13.00 },
    { id:3, nome:"Sopa de Feijão com Calabresa", descricao:"Porção de 500ml", preco:10.00 },
    { id:4, nome:"Canja de Galinha", descricao:"Porção de 500ml", preco:10.00 },
    { id:5, nome:"Cuscuz Recheado", descricao:"Porção de 500g", preco:14.00 },
    { id:6, nome:"Sanduíche Natural", descricao:"Variação unica", preco:9.00 }
];

// 🔗 Link do Grupo WhatsApp
const LINK_GRUPO = "https://chat.whatsapp.com/DZKXBFxUBbS0kSWefgIgS4";

// 🛒 Carrinho
let carrinho = [];
let itemSelecionado = null;

// 🎯 Renderizar Cardápio
function renderizarCardapio() {
    const container = document.getElementById('lista-itens');
    if(!container) return;
    
    container.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
            </div>
            <div class="item-preco">R$ ${produto.preco.toFixed(2).replace('.',',')}</div>
        `;
        card.onclick = () => abrirModalQuantidade(produto);
        container.appendChild(card);
    });
}

// 🔓 Abrir Modal de Quantidade
function abrirModalQuantidade(produto) {
    itemSelecionado = produto;
    document.getElementById('modal-nome-item').textContent = produto.nome;
    document.getElementById('modal-preco').textContent = `R$ ${produto.preco.toFixed(2).replace('.',',')}`;
    document.getElementById('input-quantidade').value = 1;
    document.getElementById('modal-quantidade').style.display = 'flex';
}

// ❌ Fechar Modal
function fecharModal() {
    document.getElementById('modal-quantidade').style.display = 'none';
    itemSelecionado = null;
}

// ✅ Confirmar Quantidade
function confirmarQuantidade() {
    if(!itemSelecionado) return;
    
    const qtd = parseInt(document.getElementById('input-quantidade').value) || 1;
    const subtotal = itemSelecionado.preco * qtd;
    
    // Adiciona ao carrinho
    carrinho.push({
        ...itemSelecionado,
        quantidade: qtd,
        subtotal: subtotal
    });
    
    // Atualiza UI
    atualizarBotaoFinalizar();
    fecharModal();
    
    // Feedback visual no card
    const cards = document.querySelectorAll('.item-card');
    cards.forEach(card => {
        if(card.querySelector('h3')?.textContent === itemSelecionado.nome) {
            card.classList.add('selecionado');
        }
    });
}

// 🔄 Atualizar Botão Finalizar
function atualizarBotaoFinalizar() {
    const container = document.getElementById('container-finalizar');
    const valorTotal = carrinho.reduce((sum, item) => sum + item.subtotal, 0);
    
    document.getElementById('valor-total').textContent = `R$ ${valorTotal.toFixed(2).replace('.',',')}`;
    container.style.display = carrinho.length > 0 ? 'block' : 'none';
}

// 🎬 Finalizar Pedido
// 🎬 Finalizar Pedido (Envia Direto Pro Admin)
function finalizarPedido() {
    if(carrinho.length === 0) return;
    
    // Número do ADMIN (SUBSTITUA PELO NÚMERO DO ADMINISTRADOR!)
    const NUMERO_ADMIN = "5587988463451"; // Ex: 55 + DDD + número do admin
    
    // Monta mensagem
    let mensagem = `🔥 *NOVO PEDIDO - CARDÁPIO VIRTUAL* 🔥\n\n`;
    let total = 0;
    
    carrinho.forEach((item, i) => {
        mensagem += `${i+1}. ${item.nome} x${item.quantidade}\n`;
        mensagem += `   ${item.descricao}\n`;
        mensagem += `   💰 R$ ${item.subtotal.toFixed(2).replace('.',',')}\n\n`;
        total += item.subtotal;
    });
    
    mensagem += `─────────────────\n`;
    mensagem += `💵 *TOTAL: R$ ${total.toFixed(2).replace('.',',')}*\n\n`;
    mensagem += `📍 *Cliente:* Aguardando confirmação e endereço de entrega!`;
    
    // Codifica e abre WhatsApp DIRETO COM O ADMIN
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${NUMERO_ADMIN}?text=${mensagemCodificada}`;
    
    // Abre WhatsApp
    window.open(linkWhatsApp, '_blank');
    
    // Limpa carrinho
    carrinho = [];
    atualizarBotaoFinalizar();
    document.querySelectorAll('.item-card').forEach(c => c.classList.remove('selecionado'));
}

// 🚀 Inicializa
document.addEventListener('DOMContentLoaded', () => {
    renderizarCardapio();
});