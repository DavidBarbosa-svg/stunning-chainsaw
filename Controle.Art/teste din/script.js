let totalGasto = 0;
let saldoTotal = 0;
let valorInvestido = 0;
let display = document.getElementById('display');

const listaCompras = document.getElementById('listaCompras');
const totalGastoSpan = document.getElementById('totalGasto');
const saldoTotalSpan = document.getElementById('saldoTotal');
const valorInvestidoSpan = document.getElementById('valorInvestido');
const formCompra = document.getElementById('formCompra');
const formSaldos = document.getElementById('formSaldos');
const excluirSelecionadosBtn = document.getElementById('excluirSelecionados');
const zerarSaldoBtn = document.getElementById('zerarSaldo');

function atualizarValores() {
    totalGastoSpan.textContent = totalGasto.toFixed(2);
    saldoTotalSpan.textContent = saldoTotal.toFixed(2);
    valorInvestidoSpan.textContent = valorInvestido.toFixed(2);
}

function adicionarCompra(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descricao && !isNaN(valor) && valor > 0) {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <input type="checkbox" class="checkboxCompra">
            <span>${descricao}</span> 
            <span>R$ ${valor.toFixed(2)}</span>
        `;

        listaCompras.appendChild(itemLista);

        totalGasto += valor;
        saldoTotal -= valor;

        atualizarValores();

        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
    }
}

function excluirSelecionados() {
    const checkboxes = document.querySelectorAll('.checkboxCompra:checked');
    checkboxes.forEach(checkbox => {
        const item = checkbox.closest('li');
        const valorTexto = item.querySelector('span:nth-child(3)').textContent;
        const valor = parseFloat(valorTexto.replace('R$ ', ''));

        if (!isNaN(valor)) {
            totalGasto -= valor;
        }

        listaCompras.removeChild(item);
    });

    atualizarValores();
}

function atualizarSaldos(event) {
    event.preventDefault();

    const novoSaldo = parseFloat(document.getElementById('inputSaldoTotal').value) || 0;
    saldoTotal += novoSaldo;

    valorInvestido = parseFloat(document.getElementById('inputInvestimentos').value) || valorInvestido;

    atualizarValores();
}

function zerarSaldo() {
    saldoTotal = 0;
    valorInvestido = 0;
    atualizarValores();
}

function adicionarDigito(digito) {
    display.value += digito;
}

function limparDisplay() {
    display.value = '';
}

function calcularResultado() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Erro';
    }
}

formCompra.addEventListener('submit', adicionarCompra);
formSaldos.addEventListener('submit', atualizarSaldos);
excluirSelecionadosBtn.addEventListener('click', excluirSelecionados);
zerarSaldoBtn.addEventListener('click', zerarSaldo);

atualizarValores();
