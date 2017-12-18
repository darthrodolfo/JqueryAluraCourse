$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
    scrollParaPlacar();
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollParaPlacar();

}

function scrollParaPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000)
}

function novaLinha(usuario, palavras) {

    var linha = $("<tr>");

    var colunaUsuario = $("<td>");
    colunaUsuario.text(usuario);

    var colunaPalavras = $("<td>");
    colunaPalavras.text(palavras);

    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();

    var linha = $(this).parent().parent();

    linha.fadeOut(1000);

    setTimeout(function () {
        linha.remove();
    }, 1000);

}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);

    });

    var dados = {
        placar: placar
    };


    var tooltipBotaoPlacar = $(".tooltip");
    $.post("http://localhost:3000/placar", dados, function () {

            tooltipBotaoPlacar.tooltipster("open");
            tooltipBotaoPlacar.tooltipster("content", "Sucesso ao sincronizar.");
        })
        .fail(function () {
            tooltipBotaoPlacar.tooltipster("open");
            $(".tooltipster-content").addClass("tooltip-erro-sync");
            tooltipBotaoPlacar.tooltipster("content", "Falha ao sincronizar!");
        })
        .always(function () {
            setTimeout(function () {
                tooltipBotaoPlacar.tooltipster("close");
            }, 1200);
        });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function (data) {
        $(data).each(function () {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}
