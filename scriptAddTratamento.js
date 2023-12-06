// Pegando o fomulario
var formTratamento = document.getElementById('addTratamento');

  
// Pegando os dados do armazenamento local

var editTratamentoDados = JSON.parse(localStorage.getItem('editTratamentoDados'));
console.log(editTratamentoDados)

if(editTratamentoDados){
  //Preenchedo o fomulario com esse dados
  for(var preenche in editTratamentoDados)
    if(formTratamento.elements.namedItem(preenche)){
      formTratamento.elements.namedItem(preenche).value = editTratamentoDados[preenche];
    }
    //limpando o localStorage
localStorage.removeItem('editTratamentoDados'); 
}
//Evitando que a pagina recarregue 
  formTratamento.addEventListener('submit', function(event){
    event.preventDefault();
  
//lista para os dados 
var dadosTratamento = {};

//laco para pegar os dados
for(var i= 0; i< formTratamento.elements.length; i++){

  //verificando se sao inputs e tem um campo de nome 
  if(formTratamento.elements[i].tagName ==='INPUT' && formTratamento.elements[i].name || 'TEXTAREA' && formTratamento.elements[i].name){
  dadosTratamento[formTratamento.elements[i].name] = formTratamento.elements[i].value;
}
}
console.log(dadosTratamento);
// Verifica se os dados do paciente já existem
if (editTratamentoDados && editTratamentoDados.codigo) {
 // Adiciona o codigo do paciente aos dados
  dadosTratamento.codigo = editTratamentoDados.codigo;

    // Atualiza os dados do paciente usando o método PUT
    fetch('http://127.0.0.1:8080/tratamento' , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosTratamento)
    })
      .then(resposta => resposta.json())
      .then(dadosTratamento => {
        console.log('Dados do paciente atualizados com sucesso:', dadosTratamento);
        // Manda pra página do médico 
        // window.location.href = 'PagMedico.html';
      })
      .catch(erro => console.error('Erro:', erro));
    } else {
      // Cria novos dados do paciente usando o método POST
      fetch('http://127.0.0.1:8080/tratamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosTratamento)
      })
      .then(resposta => resposta.json())
      .then(dadosTratamento => {
        console.log('Dados do paciente enviados com sucesso:', dadosTratamento);
        // Manda pra página do médico 
        window.location.href = 'PagMedico.html';
      })
      .catch(erro => console.error('Erro:', erro));
    }
    console.log(dadosTratamento);
  });

