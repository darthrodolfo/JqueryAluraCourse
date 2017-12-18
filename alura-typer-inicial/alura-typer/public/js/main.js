var tempoInicial = 10;
//$(document).ready(function () {
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);

    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        animation: "fade",
        theme: "tooltipster-borderless",
        trigger: "custom"
    });
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var quantidadePalavras = frase.split(" ").length;
    var tamanhoFraseListItem = $("#tamanho-frase");
    tamanhoFraseListItem.text(quantidadePalavras);
}
var campoDigitacao = $(".campo-digitacao");

function inicializaContadores() {
    campoDigitacao.on("input", function () {
        var textoDigitado = campoDigitacao.val();
        var quantidadePalavras = textoDigitado.split(/\S+/).length - 1;
        var contadorPalavras = $("#contador-palavras");
        contadorPalavras.text(quantidadePalavras);
        var contadorCaracteres = $("#contador-caracteres");
        contadorCaracteres.text(textoDigitado.length);
    });
}

function inicializaCronometro() {
    campoDigitacao.one("focus", function () {

        var tempoRestante = $("#tempo-digitacao").text();

        $("#botao-reiniciar").attr("disabled", true);

        var cronometroId = setInterval(function () {

            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                campoDigitacao.attr("disabled", true);

                clearInterval(cronometroId);

                $("#botao-reiniciar").attr("disabled", false);

                campoDigitacao.toggleClass("campo-desabilitado");

                inserePlacar();

                campoDigitacao.removeClass("borda-vermelha"); //novo
                campoDigitacao.removeClass("borda-verde"); //novo
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    campoDigitacao.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campoDigitacao.val();

        if (frase.startsWith(digitado)) {
            campoDigitacao.addClass("borda-verde");
            campoDigitacao.removeClass("borda-vermelha");
        } else {
            campoDigitacao.addClass("borda-vermelha");
            campoDigitacao.removeClass("borda-verde");
        }
    });
}

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
    tempoInicial = tempo;
}

function reiniciaJogo() {
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();

    campoDigitacao.toggleClass("campo-desabilitado");
    campoDigitacao.removeClass("borda-vermelha");
    campoDigitacao.removeClass("borda-verde");
}
