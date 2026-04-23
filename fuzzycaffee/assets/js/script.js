// --- FUNÇÕES DE PERTINÊNCIA ---
function triangular(x, a, b, c) {
    return Math.max(0, Math.min((x - a) / (b - a), (c - x) / (c - b)));
}

function trapezoidal(x, a, b, c, d) {
    return Math.max(0, Math.min((x - a) / (b - a), 1, (d - x) / (d - c)));
}

function atualizarSistema() {
    const corpo = parseFloat(document.getElementById('inputCorpo').value);
    const acidez = parseFloat(document.getElementById('inputAcidez').value);
    
    document.getElementById('valCorpo').innerText = corpo;
    document.getElementById('valAcidez').innerText = acidez;

    // --- 1. FUZZIFICAÇÃO ---
    let cLeve = trapezoidal(corpo, 0, 0, 20, 50);
    let cMedio = triangular(corpo, 20, 50, 80);
    let cForte = trapezoidal(corpo, 50, 80, 100, 100);

    let aBaixa = trapezoidal(acidez, 0, 0, 20, 50);
    let aMedia = triangular(acidez, 20, 50, 80);
    let aAlta = trapezoidal(acidez, 50, 80, 100, 100);

    // --- 2. BASE DE REGRAS (MÉTODO DE MANDANI - SIMPLIFICADO) ---
    // Regra 1: SE corpo é forte E acidez é baixa ENTÃO torra é escura
    let r1 = Math.min(cForte, aBaixa); 
    // Regra 2: SE corpo é leve OU acidez é alta ENTÃO torra é clara
    let r2 = Math.max(cLeve, aAlta);
    // Regra 3: SE corpo é médio ENTÃO torra é média
    let r3 = cMedio;

    // --- 3. DEFUZZIFICAÇÃO (Média Ponderada dos Centros) ---
    // Definição dos centros de saída: Clara (20), Média (50), Escura (80)
    let numerador = (r2 * 20) + (r3 * 50) + (r1 * 80);
    let denominador = r2 + r3 + r1 + 0.00001; // Evita divisão por zero
    let resultadoFinal = numerador / denominador;

    // --- 4. ATUALIZAÇÃO DA INTERFACE ---
    const grao = document.getElementById('grao-cafe');
    const raciocinio = document.getElementById('raciocinio');
    const statusTorra = document.getElementById('statusTorra');

    // Cor do grão baseada no resultado final (0 a 100)
    let corHsl = 90 - (resultadoFinal * 0.7); 
    grao.style.backgroundColor = `hsl(25, 60%, ${corHsl}%)`;

    statusTorra.innerText = `Intensidade: ${resultadoFinal.toFixed(1)}%`;
    
    raciocinio.innerHTML = `
        <strong>Regras Ativas:</strong><br>
        Torra Clara: ${(r2 * 100).toFixed(0)}% de força<br>
        Torra Média: ${(r3 * 100).toFixed(0)}% de força<br>
        Torra Escura: ${(r1 * 100).toFixed(0)}% de força
    `;
}

// Eventos
document.getElementById('inputCorpo').addEventListener('input', atualizarSistema);
document.getElementById('inputAcidez').addEventListener('input', atualizarSistema);
atualizarSistema();

