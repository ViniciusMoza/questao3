document.getElementById('calcButton').addEventListener('click', function() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => calcularFaturamento(data.faturamento))
        .catch(error => console.error('Erro ao carregar os dados:', error));
});

function calcularFaturamento(faturamento) {
    let menorValor = Number.MAX_VALUE;
    let maiorValor = 0;
    let somaFaturamento = 0;
    let diasComFaturamento = 0;

    faturamento.forEach(dia => {
        if (dia.valor > 0) { 
            somaFaturamento += dia.valor;
            diasComFaturamento++;
            if (dia.valor < menorValor) {
                menorValor = dia.valor;
            }
            if (dia.valor > maiorValor) {
                maiorValor = dia.valor;
            }
        }
    });

    let mediaMensal = somaFaturamento / diasComFaturamento;
    let diasAcimaDaMedia = faturamento.filter(dia => dia.valor > mediaMensal).length;

    document.getElementById('result').innerHTML = `
        <p>Menor valor de faturamento: R$ ${menorValor.toFixed(2)}</p>
        <p>Maior valor de faturamento: R$ ${maiorValor.toFixed(2)}</p>
        <p>Dias com faturamento superior à média mensal: ${diasAcimaDaMedia}</p>
    `;
}
