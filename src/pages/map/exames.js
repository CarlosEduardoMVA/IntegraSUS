$(function () {

	var operacao = "A"; //"A"=Adição; "E"=Edição
	var indice_selecionado = -1;
	var tbExames = localStorage.getItem("tbExames");// Recupera os dados armazenados
	tbExames = JSON.parse(tbExames); // Converte string para objeto

	if (tbExames == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbExames = [];

	function Adicionar() {
		var cli = GetExames("Codigo", $("#codigoExame").val());

		if (cli != null) {
			alert("Código já cadastrado.");
			return;
		}

		var exame = JSON.stringify({
			Codigo: $("#codigoExame").val(),
			Titulo: $("#tituloExame").val(),
			Email: $("#emailPaciente").val(),
			Arquivo: $("#documentoAnexado").val(),
			idPaciente: $("#idPaciente").val()
		});

		tbExames.push(exame);

		localStorage.setItem("tbExames", JSON.stringify(tbExames));

		alert("Registro adicionado.");
		return true;
	}

	function Editar() {
		tbExames[indice_selecionado] = JSON.stringify({
			Codigo: $("#codigoExame").val(),
			Titulo: $("#tituloExame").val(),
			Email: $("#emailPaciente").val(),
			Arquivo: $("#documentoAnexado").val(),
			idPaciente: $("#idPaciente").val()
		});
		localStorage.setItem("tbExames", JSON.stringify(tbExames));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar() {
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>" +
			"	<tr>" +
			"<th></th>" +
			"	<th>Código</th>" +
			"	<th>Titulo</th>" +
			"	<th>Email</th>" +
			"	<th>Arquivo</th>" +
			"	<th>idPaciente</th>" +
			"	</tr>" +
			"</thead>" +
			"<tbody>" +
			"</tbody>"
		);

		for (var i in tbExames) {
			var cli = JSON.parse(tbExames[i]);
			$("#tblListar tbody").append("<tr>" +
				"	<td><img src='edit.png' alt='" + i + "' class='btnEditar'/><img src='delete.png' alt='" + i + "' class='btnExcluir'/></td>" +
				"	<td>" + cli.Codigo + "</td>" +
				"	<td>" + cli.Titulo + "</td>" +
				"	<td>" + cli.Email + "</td>" +
				"	<td>" + cli.Arquivo + "</td>" +
				"	<td>" + cli.idPaciente + "</td>" +
				"</tr>");
		}
	}

	function Excluir() {
		tbExames.splice(indice_selecionado, 1);
		localStorage.setItem("tbExames", JSON.stringify(tbExames));
		alert("Registro excluído.");
	}

	function GetExames(propriedade, valor) {
		var cli = null;
		for (var item in tbExames) {
			var i = JSON.parse(tbExames[item]);
			if (i[propriedade] == valor)
				cli = i;
		}
		return cli;
	}

	Listar();

	$("#frmExames").on("submit", function () {
		if (operacao == "A")
			return Adicionar();
		else
			return Editar();
	});

	$("#tblListar").on("click", ".btnEditar", function () {
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbExames[indice_selecionado]);
		$("#codigoExame").val(cli.Codigo);
		$("#tituloExame").val(cli.Titulo);
		$("#emailPaciente").val(cli.Email);
		$("#documentoAnexado").val(cli.Arquivo);
		$("#idPaciente").val(cli.idPaciente);
		$("#codigoExame").attr("readonly", "readonly");
		$("#tituloExame").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});