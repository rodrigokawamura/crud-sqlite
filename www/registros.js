function pagecontainershow_resultado(e,ui){
    //carregar session storage
    var nImc = sessionStorage.getItem("imc" );
    var descricao = sessionStorage.getItem("descricao");
    //alterar a tela com esse valor
    $('#nImc').text(nImc.replace(".",",")); 
    $('#descricao').text(descricao);
}

function salvar() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }

    function populateDB(tx) {
        var d = new Date();
        var monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
        ];
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; 
        var curr_year = d.getFullYear();
        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        var dh = curr_date + " de " + monthNames[curr_month] + " de " + curr_year + " às " + curr_hour + ":" + curr_min;
        var nImc2 = sessionStorage.getItem("imc");
        var nImc = nImc2.replace(".",",");
        var descricao = sessionStorage.getItem("descricao");
        tx.executeSql('CREATE TABLE IF NOT EXISTS imc (id INTEGER PRIMARY KEY, datahora DATETIME, valor DECIMAL(8,2), descricao VARCHAR(30))');
        tx.executeSql('INSERT INTO imc (datahora, valor, descricao) VALUES (?,?,?)', [dh, nImc, descricao]);
    }

    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    function successCB()
    {
        $.mobile.pageContainer.pagecontainer("change", "registros.html");
        
        var db;
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            db.transaction(lista, errorCB, successCB);
        }

        function errorCB(tx, err) {
            alert("Error processing SQL: "+err);
        }

        function successCB() {
        }

        function lista() {
          $("#TableData").html("");
          db.transaction(function(tx) {
              tx.executeSql('SELECT * FROM imc ORDER BY id DESC', [], function (tx, results) {
                 var len = results.rows.length, i;
                 for (i = 0; i < len; i++){
                  $("#TableData").append("<p id='nImc'>"+results.rows.item(i).valor+"</p><p id='descricao'>"+results.rows.item(i).descricao+"</p><p id='dataHora'>"+results.rows.item(i).datahora+"</p><p id='ImcDelete'><a class='delete' id='"+results.rows.item(i).id+"'>Deletar resultado</a></p>");
              }
          }, null);
          });
          $(document.body).on('click', '.delete' ,function() {
            var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
            var id=this.id;
            db.transaction(function(transaction) {
                var executeQuery = "DELETE FROM imc where id=?";
                transaction.executeSql(executeQuery, [id],
                  function() {
                    $.mobile.pageContainer.pagecontainer("change", "main.html");
                    alert('Deletado com sucesso!');},
                    function(error){alert('Something went Wrong');});
            });
        });
      }
    }
}

function dropar() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(dropDB, errorCB, successCB);
    }

    function dropDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS imc');
    }

    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    function successCB() {
        alert("Database deletada com sucesso!");
        $.mobile.pageContainer.pagecontainer("change", "main.html");
    }
}




