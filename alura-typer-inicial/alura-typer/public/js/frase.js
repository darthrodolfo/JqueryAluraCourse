$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function () {
        $("#erro").toggle();
        setTimeout(function () {
                $("#erro").toggle();
                $("#spinner").toggle();
            }, 2500)
            .always(function () {
                $("#spinner").toggle();
            });

    });
}

function trocaFraseAleatoria(data) {
    var numAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();

    var fraseId = $("#frase-id").val();
    var dados = {
        id: fraseId
    };

    $.get("http://localhost:3000/frases", dados, trocaFraseAleatoria).fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2500);
        })
        .always(function () {
            $("#spinner").toggle();
        });

}
