const cards = document.querySelectorAll('.card');
let cardVirado = false;
let jogoBloqueado = false;
let primeiraCarta, segundaCarta;

//*FUNÇÃO VIRAR A CARTA/
function virarCarta() {
    if (jogoBloqueado) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (!cardVirado) {
        cardVirado = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    cardVirado = false;

    verSeCombina();
}

//*VERIFICAR SE AS CARTAS SÃO IGUAIS/
function verSeCombina() {
    if (primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desabilitarCartas();
        return;
    }

    desvirarCarta();
}

//*DESABILITAR AS CARTAS/
function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    resetBoard();
}

//*DESVIRA AS CARTAS/
function desvirarCarta() {
    jogoBloqueado = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//*RESETA O TABULHEIRO/
function resetBoard() {
    [cardVirado, jogoBloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

//*EMBARALHA AS CARTAS/
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//*ADICIONA UM EVENTO NA CARTA/
cards.forEach((card) => {
    card.addEventListener('click', virarCarta);
});
//*CRIADO POR EDIEFISON DA SILVA PARRA/