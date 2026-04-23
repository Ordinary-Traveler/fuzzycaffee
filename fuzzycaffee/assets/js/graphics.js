// Função para desenhar as curvas no Canvas
function drawFuzzySet(canvasId, value, sets) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sets.forEach(s => {
        ctx.beginPath();
        ctx.strokeStyle = '#888';
        ctx.moveTo(s.a * 3, 80);
        ctx.lineTo(s.b * 3, 20);
        ctx.lineTo(s.c * 3, 20);
        ctx.lineTo(s.d * 3, 80);
        ctx.stroke();
    });

    // Linha indicadora do valor atual
    ctx.beginPath();
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.moveTo(value * 3, 0);
    ctx.lineTo(value * 3, 100);
    ctx.stroke();
}

// Dentro da sua função atualizarSistema(), chame:
drawFuzzySet('canvasCorpo', corpoValor, [
    {a:0, b:0, c:20, d:50},    // Leve
    {a:20, b:50, c:50, d:80},  // Médio
    {a:50, b:80, c:100, d:100} // Forte
]);