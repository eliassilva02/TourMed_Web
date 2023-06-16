document.querySelector('.search-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    // Obter o valor do campo de pesquisa
    var produto = document.querySelector('.search-txt').value;
    var requisicao = document.querySelector('.search-req').value;
  
    if (requisicao === 'EAN') {
        produto = parseInt(produto);
      }
    
    // Configurar as opções da requisição POST
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        Requisicao: requisicao,
        Produto: produto 
    })
    };
  
    // Enviar a requisição para a API
    fetch("http://127.0.0.1:5000/med", requestOptions)
      .then(response => response.json())
      .then(result => {{
                    // Obter a referência da tabela
                    var table = document.getElementById("tabela-resultados");
            
                    // Limpar o conteúdo existente na tabela
                    table.innerHTML = "";
            
                    // Criar uma nova linha na tabela
                    var row = table.insertRow();
            
                    // Preencher as células com os dados do objeto JSON
                    var codigoBarrasCell = row.insertCell();
                    codigoBarrasCell.innerHTML = result.EAN;
            
                    var nomeMedicamentoCell = row.insertCell();
                    nomeMedicamentoCell.innerHTML = result.Nome;

                    var ncmCell = row.insertCell();
                    ncmCell.innerHTML = result.NCM;

                    var cestCell = row.insertCell();
                    cestCell.innerHTML = result.CEST;
            
                    var principioAtivoCell = row.insertCell();
                    principioAtivoCell.innerHTML = result['Principio Ativo'];
            
                    var categoriaCell = row.insertCell();
                    categoriaCell.innerHTML = result.Categoria;
            
                    var tipoListaCell = row.insertCell();
                    tipoListaCell.innerHTML = result.Lista;
          }
        })
      .catch(error => console.log('error', error));
  });
  