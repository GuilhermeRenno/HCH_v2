// Pega o formulário
var form = document.getElementById('addPaciente');
console.log(form);
// Verifica o arquivo de edição apenas quando necessário
var editDados = JSON.parse(localStorage.getItem('editDados'));

if (editDados) {
  // Preenche o formulário com os dados de edição
  for (var preenche in editDados) {
    if (form.elements.namedItem(preenche)) {
      form.elements.namedItem(preenche).value = editDados[preenche];
    }
  }

  // Limpa o localStorage
  localStorage.removeItem('editDados');
}

// Submit e evitar que a página recarregue 
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Lista pra armazenar os dados
  var dados = {};
    
  // Laço para pegar os itens do forms
  for (var i = 0; i < form.elements.length; i++) {

    // Condicional, onde pega só se for um input e tem um nome
    if (form.elements[i].tagName === 'INPUT' && form.elements[i].name) {
      dados[form.elements[i].name] = form.elements[i].value;
    }
  }
  console.log(dados);
 // Verifica se os dados do paciente já existem
if (editDados && editDados.codigo) {
  // Adiciona o codigo do paciente aos dados
  dados.codigo = editDados.codigo;

  // Atualiza os dados do paciente usando o método PUT
  fetch('http://127.0.0.1:8080/paciente/' + editDados.codigo, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
    .then(resposta => resposta.json())
    .then(dados => {
      console.log('Dados do paciente atualizados com sucesso:', dados);
      // Manda pra página do médico 
       window.location.href = 'PagMedico.html';
    })
    .catch(erro => console.error('Erro:', erro));
  } else {
    // Cria novos dados do paciente usando o método POST
    fetch('http://127.0.0.1:8080/paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(resposta => resposta.json())
    .then(dados => {
      console.log('Dados do paciente enviados com sucesso:', dados);
      // Manda pra página do médico 
       window.location.href = 'PagMedico.html';
    })
    .catch(erro => console.error('Erro:', erro));
  }
  console.log(dados);
});