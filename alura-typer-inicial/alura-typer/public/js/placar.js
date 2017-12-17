function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Rods";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removerLinha);

    corpoTabela.prepend(linha);

}

function novaLinha(usuario, palavras) {

    var linha = $("<tr>");

    var colunaUsuario = $("<td>");
    colunaUsuario.text(usuario);

    var colunaPalavras = $("<td>");
    colunaPalavras.text(palavras);

    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removerLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}
