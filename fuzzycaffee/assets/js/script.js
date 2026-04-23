function triangular(x, a, b, c) {
    return Math.max(0, Math.min((x - a) / (b - a), (c - x) / (c - b)));
}

function trapezoidal(x, a, b, c, d) {
    return Math.max(0, Math.min((x - a) / (b - a), 1, (d - x) / (d - c)));
}

function drawFuzzySet(canvasId, value, sets) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    sets.forEach((s, i) => {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${i * 120 + 20}, 50%, 60%)`;
        ctx.moveTo(s.a * 3, h - 10);
        ctx.lineTo(s.b * 3, 10);
        ctx.lineTo(s.c * 3, 10);
        ctx.lineTo(s.d * 3, h - 10);
        ctx.stroke();
    });

    ctx.beginPath();
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.moveTo(value * 3, 0); ctx.lineTo(value * 3, h);
    ctx.stroke();
}

function atualizarSistema() {
    const corpo = parseInt(document.getElementById('inputCorpo').value);
    const acidez = parseInt(document.getElementById('inputAcidez').value);

    document.getElementById('valCorpo').innerText = corpo.toString().padStart(3, '0');
    document.getElementById('valAcidez').innerText = acidez.toString().padStart(3, '0');

    // Fuzzificação
    let cForte = trapezoidal(corpo, 50, 80, 100, 100);
    let cLeve = trapezoidal(corpo, 0, 0, 20, 50);
    let cMedio = triangular(corpo, 20, 50, 80);
    
    let aBaixa = trapezoidal(acidez, 0, 0, 20, 50);
    let aAlta = trapezoidal(acidez, 50, 80, 100, 100);

    // Regras
    let r1 = Math.min(cForte, aBaixa); // Torra Forte
    let r2 = Math.max(cLeve, aAlta);   // Torra Clara
    let r3 = cMedio;                   // Torra Média

    // Defuzzificação
    let res = ((r2 * 20) + (r3 * 50) + (r1 * 80)) / (r1 + r2 + r3 + 0.0001);

    // Update UI
    const grao = document.getElementById('grao-cafe');
    grao.style.backgroundColor = `hsl(25, 60%, ${80 - (res * 0.6)}%)`;
    
    document.getElementById('statusTorra').innerText = res > 65 ? "Torra Intensa" : (res < 35 ? "Torra Suave" : "Torra Média");

    drawFuzzySet('canvasCorpo', corpo, [{a:0,b:0,c:20,d:50}, {a:20,b:50,c:50,d:80}, {a:50,b:80,c:100,d:100}]);
    drawFuzzySet('canvasAcidez', acidez, [{a:0,b:0,c:20,d:50}, {a:20,b:50,c:50,d:80}, {a:50,b:80,c:100,d:100}]);
}

document.getElementById('inputCorpo').addEventListener('input', atualizarSistema);
document.getElementById('inputAcidez').addEventListener('input', atualizarSistema);
window.onload = atualizarSistema;