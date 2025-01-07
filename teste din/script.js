// Variáveis globais
let totalGasto = 0;
const listaCompras = document.getElementById('listaCompras');
const totalGastoSpan = document.getElementById('totalGasto');
const formCompra = document.getElementById('formCompra');
const excluirSelecionadosBtn = document.getElementById('excluirSelecionados');

// Função para atualizar o total gasto
function atualizarTotalGasto() {
    totalGastoSpan.textContent = totalGasto.toFixed(2);
}

// Função para adicionar uma nova compra
function adicionarCompra(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descricao && !isNaN(valor) && valor > 0) {
        // Criando o item da lista com checkbox para seleção
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <input type="checkbox" class="checkboxCompra">
            <span>${descricao}</span> 
            <span>R$ ${valor.toFixed(2)}</span>
        `;

        // Adicionando o item na lista
        listaCompras.appendChild(itemLista);

        // Atualizando o total gasto
        totalGasto += valor;
        atualizarTotalGasto();

        // Limpar os campos do formulário
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
    }
}

// Função para excluir os itens selecionados
function excluirSelecionados() {
    const checkboxes = document.querySelectorAll('.checkboxCompra:checked');
    
    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um item para excluir!');
        return;
    }

    // Excluir cada item selecionado
    checkboxes.forEach(checkbox => {
        const item = checkbox.closest('li');
        const valorTexto = item.querySelector('span:nth-child(2)').textContent;
        const valor = parseFloat(valorTexto.replace('R$ ', '').replace(',', '.')); // Garantir que o valor seja numérico

        // Atualizando o total gasto
        if (!isNaN(valor)) {
            totalGasto -= valor;
        }

        // Remover item da lista
        listaCompras.removeChild(item);
    });

    // Se todos os itens foram removidos, o total deve voltar para 0
    if (listaCompras.children.length === 0) {
        totalGasto = 0;
    }

    // Atualizando o total gasto após exclusão
    atualizarTotalGasto();
}

// Adicionar evento de envio do formulário
formCompra.addEventListener('submit', adicionarCompra);

// Adicionar evento de exclusão dos itens selecionados
excluirSelecionadosBtn.addEventListener('click', excluirSelecionados);




