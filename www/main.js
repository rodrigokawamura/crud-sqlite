function pagecontainershow_main(e,ui){
	
	//document.addEventListener("deviceready", onDeviceReady, false);
}

function calcular(){
		//ler dados dos inputs
		var flag = true;
		var txtAltura = $('#txtAltura').val();
		var txtPeso = $('#txtPeso').val();
		//calcular a formula do IMC
		var altura = parseFloat(txtAltura);
		var peso = parseFloat(txtPeso);

		if(altura > 2.52 || altura < 0.4)
		{
			alert("Altura incorreta");
			flag = false;
		}
		else if(peso > 250 || peso < 10)
		{
			alert("Peso incorreto");
			flag = false;
		}
	else
	{
		var imc = peso/(altura*altura);
		var imcArredondado = parseFloat(imc.toFixed(2));   
		var descricao;

		if(imcArredondado < 17)
		{
			descricao = "Muito abaixo do peso";
		}
		else if(imcArredondado >= 17 && imcArredondado <= 18.49)
		{
			descricao = "Abaixo do peso";
		}
		else if(imcArredondado >= 18.5 && imcArredondado <= 24.99)
		{
			descricao = "Peso Normal";
		}
		else if(imcArredondado >= 25 && imcArredondado <= 29.99)
		{
			descricao = "Acima do Peso";
		}
		else if(imcArredondado >= 30 && imcArredondado <= 34.99)
		{
			descricao = "Obesidade Grau I";
		}
		else if(imcArredondado >= 35 && imcArredondado <= 39.99)
		{
			descricao = "Obesidade Grau II - Severa";
		}
		else if(imcArredondado >= 40)
		{
			descricao = "Obesidade Grau III - Mórbida";
		}
		//salvar no sessionstorage
		sessionStorage.setItem("imc", imcArredondado.toString() );
		sessionStorage.setItem("descricao", descricao);
	   //navegar para a próxima página
	   var x = document.forms["myForm"]["txtAltura"].value;
	    if (x == "") 
	    {
	        alert("O campo necessita ser preenchido");
	        flag = false;
	    }
	    var y = document.forms["myForm"]["txtPeso"].value;
	    if (y == "") 
	    {
	        alert("O campo necessita ser preenchido");
	        flag = false;
	    }
	    if(flag == false)
	    {
	    	$.mobile.pageContainer.pagecontainer("change", "main.html");
	    }
	    else
	    {
			$.mobile.pageContainer.pagecontainer("change", "resultado.html");
	    }
	}
}

//http://meumobi.github.io/stocks%20apis/2016/03/13/get-realtime-stock-quotes-yahoo-finance-api.html
