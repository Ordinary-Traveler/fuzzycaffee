// Capturando os elementos da tela
const inputCorpo = document.getElementById('inputCorpo');
const valCorpo = document.getElementById('valCorpo');
const grao = document.getElementById('grao-cafe');
const statusTorra = document.getElementById('statusTorra');

// Função simples para atualizar a visualização (Ainda sem a lógica fuzzy completa)
function atualizarVisualizacao() {
    let valor = inputCorpo.value;
    valCorpo.innerText = valor;

    // Simulação visual: quanto maior o corpo, mais escura a torra
    // Criando um tom de marrom que escurece conforme o valor aumenta
    let escurecimento = 100 - (valor * 0.8); 
    grao.style.backgroundColor = `hsl(25, 40%, ${escurecimento}%)`;

    if(valor < 30) statusTorra.innerText = "Torra Clara (Suave)";
    else if(valor < 70) statusTorra.innerText = "Torra Média (Equilibrada)";
    else statusTorra.innerText = "Torra Escura (Forte)";
}

// Ouvinte de eventos para o slider
inputCorpo.addEventListener('input', atualizarVisualizacao);