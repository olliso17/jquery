var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');
//atalho para $(document).ready(()=>{})
$(
    () => {
        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        inicializaMarcadores();
        $('#botao-reiniciar').click(reiniciaJogo);
    })


function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numeroFrase = frase.split(/\S+/).length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numeroFrase);

}

function inicializaContadores() {
    campo.on('input', () => {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
        var qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);

    });

}

function inicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', () => {
        var cronometroId = setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);//para para de contar pega o id q é o nome da variável do setInterval
                finalizaJogo();
            }

        }, 1000);
    });
}
function finalizaJogo() {
    campo.attr("disabled", true);//para colocar se fosse tirar seria false
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", () => {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    })

}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

}
