// --- 1. FUNÇÕES MATEMÁTICAS DE PERTINÊNCIA (Baseadas na Aula) ---
function triangular(x, a, b, c) {
    return Math.max(0, Math.min((x - a) / (b - a), (c - x) / (c - b)));
}

function trapezoidal(x, a, b, c, d) {
    return Math.max(0, Math.min((x - a) / (b - a), 1, (d - x) / (d - c)));
}

// --- 2. CONFIGURAÇÃO DOS CONJUNTOS FUZZY (Pontos a, b, c, d) ---
const setsCorpo = [
    { label: 'Leve', a: 0, b: 0, c: 20, d: 50, tipo: 'trap' },
    { label: 'Médio', a: 20, b: 50, c: 50, d: 80, tipo: 'tri' },
    { label: 'Forte', a: 50, b: 80, c: 100, d: 100, tipo: 'trap' }
];

const setsAcidez = [
    { label: 'Baixa', a: 0, b: 0, c: 20, d: 50, tipo: 'trap' },
    { label: 'Média', a: 20, b: 50, c: 50, d: 80, tipo: 'tri' },
    { label: 'Alta', a: 50, b: 80, c: 100, d: 100, tipo: 'trap' }
];

// --- 3. FUNÇÃO DE DESENHO DO CANVAS ---
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
        ctx.strokeStyle = `hsl(${i * 130 + 20}, 60%, 70%)`;
        
        // Mapeamento: valor 0-100 para largura do canvas
        const scale = w / 100;
        ctx.moveTo(s.a * scale, h - 10);
        ctx.lineTo(s.b * scale, 10);
        ctx.lineTo(s.c * scale, 10);
        ctx.lineTo(s.d * scale, h - 10);
        ctx.stroke();
    });

    // Linha do Valor Atual (Valor Crisp)
    ctx.beginPath();
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.moveTo(value * (w / 100), 0);
    ctx.lineTo(value * (w / 100), h);
    ctx.stroke();
}

// --- 4. MOTOR DE INFERÊNCIA E ATUALIZAÇÃO ---
function atualizarSistema() {
    // Pegar valores dos inputs
    const corpoValor = parseInt(document.getElementById('inputCorpo').value);
    const acidezValor = parseInt(document.getElementById('inputAcidez').value);

    // Formatação 001, 010, 100 (Padding)
    document.getElementById('valCorpo').innerText = corpoValor.toString().padStart(3, '0');
    document.getElementById('valAcidez').innerText = acidezValor.toString().padStart(3, '0');

    // FUZZIFICAÇÃO
    let cLeve = trapezoidal(corpoValor, 0, 0, 20, 50);
    let cMedio = triangular(corpoValor, 20, 50, 80);
    let cForte = trapezoidal(corpoValor, 50, 80, 100, 100);

    let aBaixa = trapezoidal(acidezValor, 0, 0, 20, 50);
    let aMedia = triangular(acidezValor, 20, 50, 80);
    let aAlta = trapezoidal(acidezValor, 50, 80, 100, 100);

    // REGRAS FUZZY (Mamdani Simplificado)
    // R1: SE corpo forte E acidez baixa -> Torra Escura
    let r1 = Math.min(cForte, aBaixa);
    // R2: SE corpo leve OU acidez alta -> Torra Clara
    let r2 = Math.max(cLeve, aAlta);
    // R3: SE corpo médio -> Torra Média
    let r3 = cMedio;

    // DEFUZZIFICAÇÃO (Centroide Simplificado / Média Ponderada)
    // Centros: Clara=20, Média=50, Escura=80
    let num = (r2 * 20) + (r3 * 50) + (r1 * 80);
    let den = r2 + r3 + r1 + 0.000001;
    let resultadoFinal = num / den;

    // ATUALIZAÇÃO VISUAL
    const grao = document.getElementById('grao-cafe');
    const statusText = document.getElementById('statusTorra');
    const feedback = document.getElementById('feedback-explicao');

    // Cor do grão: Escurece conforme resultadoFinal aumenta
    let lightness = 80 - (resultadoFinal * 0.6); 
    grao.style.backgroundColor = `hsl(25, 60%, ${lightness}%)`;

    // Texto de Status
    if (resultadoFinal < 35) statusText.innerText = "Torra Suave (Clara)";
    else if (resultadoFinal < 65) statusText.innerText = "Torra Equilibrada (Média)";
    else statusText.innerText = "Torra Intensa (Escura)";

    // Lógica de Explicação (Feedback do Barista)
    if (corpoValor > 70 && acidezValor > 70) {
        feedback.innerHTML = "⚠️ <strong>Conflito:</strong> Corpo alto pede torra longa, mas acidez alta pede torra curta. O sistema fuzzy encontrou um meio-termo para preservar ambos.";
    } else if (corpoValor > 80 && acidezValor < 30) {
        feedback.innerHTML = "🔥 <strong>Perfil Forte:</strong> Ideal para Espresso. A baixa acidez permite uma torra profunda sem amargor químico.";
    } else if (acidezValor > 80) {
        feedback.innerHTML = "🌿 <strong>Foco no Aroma:</strong> Muita acidez detectada. A torra foi suavizada para não esconder as notas frutadas do grão.";
    } else {
        feedback.innerHTML = "⚖️ <strong>Equilíbrio:</strong> Os parâmetros estão dentro de uma zona de conforto para uma torra comercial padrão.";
    }

    // Desenhar Gráficos
    drawFuzzySet('canvasCorpo', corpoValor, setsCorpo);
    drawFuzzySet('canvasAcidez', acidezValor, setsAcidez);
}

// --- 5. INICIALIZAÇÃO ---
document.getElementById('inputCorpo').addEventListener('input', atualizarSistema);
document.getElementById('inputAcidez').addEventListener('input', atualizarSistema);

// Executa uma vez ao carregar para desenhar o estado inicial
window.onload = atualizarSistema;