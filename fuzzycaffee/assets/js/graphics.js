function desenharGrafico(idCanvas, label, valorAtual, pontos) {
    const canvas = document.getElementById(idCanvas);
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Estilo do gráfico
    ctx.strokeStyle = '#6f4e37';
    ctx.lineWidth = 2;

    // Desenhar as funções (exemplo simplificado de 3 conjuntos)
    pontos.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.a * 4, h - 10);
        ctx.lineTo(p.b * 4, 20);
        ctx.lineTo(p.c * 4, 20);
        ctx.lineTo(p.d * 4, h - 10);
        ctx.stroke();
        ctx.fillStyle = 'rgba(111, 78, 55, 0.1)';
        ctx.fill();
    });

    // Linha do Valor Atual (Fuzzificação visual)
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(valorAtual * 4, 0);
    ctx.lineTo(valorAtual * 4, h);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Chame esta função dentro da sua 'atualizarSistema'
function atualizarInterfaceGrafica(corpo, acidez) {
    // Pontos baseados nos slides: a, b, c, d
    const setsCorpo = [
        {a: 0, b: 0, c: 20, d: 50},   // Leve (Trapezoidal)
        {a: 20, b: 50, c: 50, d: 80}, // Médio (Triangular b=c)
        {a: 50, b: 80, c: 100, d: 100} // Encorpado
    ];
    desenharGrafico('canvasCorpo', 'Corpo', corpo, setsCorpo);
}