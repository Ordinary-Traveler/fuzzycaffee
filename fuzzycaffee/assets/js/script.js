// --- 1. FUNÇÕES MATEMÁTICAS ---
function triangular(x, a, b, c) {
    return Math.max(0, Math.min((x - a) / (b - a), (c - x) / (c - b)));
}

function trapezoidal(x, a, b, c, d) {
    return Math.max(0, Math.min((x - a) / (b - a), 1, (d - x) / (d - c)));
}

// --- 2. CONFIGURAÇÃO DOS CONJUNTOS ---
const setsCorpo = [
    { a: 0, b: 0, c: 20, d: 50 },   // Leve
    { a: 20, b: 50, c: 50, d: 80 },  // Médio
    { a: 50, b: 80, c: 100, d: 100 } // Forte
];

const setsAcidez = [
    { a: 0, b: 0, c: 20, d: 50 },   // Baixa
    { a: 20, b: 50, c: 50, d: 80 },  // Média
    { a: 50, b: 80, c: 100, d: 100 } // Alta
];

// --- 3. DESENHO DOS GRÁFICOS (CANVAS) ---
function drawFuzzySet(canvasId, value, sets) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    sets.forEach((s, i) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `hsl(${i * 130 + 30}, 60%, 65%)`;
        const scale = w / 100;
        ctx.moveTo(s.a * scale, h - 10);
        ctx.lineTo(s.b * scale, 10);
        ctx.lineTo(s.c * scale, 10);
        ctx.lineTo(s.d * scale, h - 10);
        ctx.stroke();
    });

    // Linha indicadora do valor atual
    ctx.beginPath();
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.moveTo(value * (w / 100), 0);
    ctx.lineTo(value * (w / 100), h);
    ctx.stroke();
}

// --- 4. MOTOR DE INFERÊNCIA ---
function atualizarSistema() {
    // Captura de Elementos
    const inputCorpo = document.getElementById('inputCorpo');
    const inputAcidez = document.getElementById('inputAcidez');
    const valCorpo = document.getElementById('valCorpo');
    const valAcidez = document.getElementById('valAcidez');
    const grao = document.getElementById('grao-cafe');
    const statusText = document.getElementById('statusTorra');
    const feedback = document.getElementById('feedback-explicao');

    if (!inputCorpo || !inputAcidez) return;

    const corpo = parseInt(inputCorpo.value);
    const acidez = parseInt(inputAcidez.value);

    // Padding de Zeros (001, 010, 100)
    valCorpo.innerText = corpo.toString().padStart(3, '0');
    valAcidez.innerText = acidez.toString().padStart(3, '0');

    // FUZZIFICAÇÃO
    let cLeve = trapezoidal(corpo, 0, 0, 20, 50);
    let cMedio = triangular(corpo, 20, 50, 80);
    let cForte = trapezoidal(corpo, 50, 80, 100, 100);

    let aBaixa = trapezoidal(acidez, 0, 0, 20, 50);
    let aAlta = trapezoidal(acidez, 50, 80, 100, 100);

    // REGRAS (SE... ENTÃO)
    let rForte = Math.min(cForte, aBaixa); 
    let rClara = Math.max(cLeve, aAlta);   
    let rMedia = cMedio;

    // DEFUZZIFICAÇÃO (Média Ponderada)
    let num = (rClara * 15) + (rMedia * 50) + (rForte * 85);
    let den = rClara + rMedia + rForte + 0.0001;
    let res = num / den;

    // ATUALIZAÇÃO DO GRÃO E STATUS
    // Cores: de bege claro (Cinnamon) a marrom escuro (French)
    let lightness = 85 - (res * 0.65); 
    let saturation = 30 + (res * 0.3);
    grao.style.backgroundColor = `hsl(30, ${saturation}%, ${lightness}%)`;

    if (res < 35) {
        statusText.innerText = "Torra Leve (Cinnamon)";
        statusText.style.color = "#d4a373";
        feedback.innerHTML = "✨ <strong>Perfil Especialista:</strong> Torra clara que preserva a acidez e os aromas florais originais do grão.";
    } else if (res < 65) {
        statusText.innerText = "Torra Média (City)";
        statusText.style.color = "#fff";
        feedback.innerHTML = "⚖️ <strong>Equilíbrio:</strong> Ponto ideal onde o açúcar do café caramelizou perfeitamente.";
    } else {
        statusText.innerText = "Torra Forte (French)";
        statusText.style.color = "#6f4e37";
        feedback.innerHTML = "🔥 <strong>Intensidade:</strong> Torra profunda com corpo denso e notas de chocolate amargo.";
    }

    // Desenhar Gráficos
    drawFuzzySet('canvasCorpo', corpo, setsCorpo);
    drawFuzzySet('canvasAcidez', acidez, setsAcidez);
}

// --- 5. INTERATIVIDADE E INICIALIZAÇÃO ---
function setPreset(c, a) {
    document.getElementById('inputCorpo').value = c;
    document.getElementById('inputAcidez').value = a;
    atualizarSistema();
}

// Garante que o código roda após o HTML carregar
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputCorpo').addEventListener('input', atualizarSistema);
    document.getElementById('inputAcidez').addEventListener('input', atualizarSistema);
    atualizarSistema(); // Primeira execução
});