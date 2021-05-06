
//em vez de fazer uma lista de botões, posso fazer um document.querySelectorAll('.btn') e depois um forEach dentro dele

var tabela = document.querySelector('.tbody')
var submit = document.getElementById('btn-submit')
var modalo  = document.getElementById('modalCadastro')
let nome = document.getElementById('txtNome')
let sobrenome = document.getElementById('txtSobrenome')
let nascimento = document.getElementById('txtNascimento')
let formacao = document.getElementById('txtFormacao')
let addButton = document.querySelector('#addButton')
let nomeUpdate = document.getElementById('txtNomeUpdate')
let sobrenomeUpdate = document.getElementById('txtSobrenomeUpdate')
let nascimentoUpdate = document.getElementById('txtNascimentoUpdate')
let formacaoUpdate = document.getElementById('txtFormacaoUpdate')
let hiddenId = document.querySelector('#custId')
let filterInput = document.querySelector('#filterInput')


let cadastro = [
  {
    id: 1,
    nome: "Belipe",
    sobrenome: "Esparza",
    datanas: "30/10/83",
    formacao: "Atleta"
  },
  {
    id: 2,
    nome: "Belipe",
    sobrenome: "Esparza",
    datanas: "30/10/83",
    formacao: "Atleta"
  }
] 


$('#btn-submit').on('click', function(){

  adicionaValores(nome.value, sobrenome.value, nascimento.value, formacao.value, cadastro)
  nome.value = ""
  sobrenome.value = ""
  nascimento.value = ""
  formacao.value = ""

  $('#modalCadastro').modal('hide'); 
  
});

$('#update-btn-submit').on('click', function(){
    cadastro.forEach(item=>{
      if(item.id == hiddenId.value){
        item.nome = nomeUpdate.value
        item.sobrenome = sobrenomeUpdate.value
        item.datanas = nascimentoUpdate.value
        item.formacao = formacaoUpdate.value
      }
      console.log(item)
    })
    populaTabela()
    $('#modelUpdate').modal('hide'); 
    
})

  let getId = () => {
    ranId = Math.floor(Math.random() * 101);
    return ranId
  }

  let adicionaValores = (nome, sobrenome, nascimento, formacao, cadastro)=>{
    cadastro.push({
      id : getId(),    
      nome : nome,
      sobrenome : sobrenome,
      datanas : nascimento,
      formacao : formacao
    })
    populaTabela()
  }

  let formataData = data =>{
    let a = data.split("-")
    return a[2] + "/" + a[1] + "/" + a[0]
  }



let populaTabela = () =>{
    tabela.innerHTML = ''
    let popula = cadastro.reduce((acc, item)=>{
      acc += `<tr id="teste">
        <td id="table">${item.id}</td>
        <td id="table">${item.nome}</td>
        <td id="table">${item.sobrenome}</td>
        <td id="table">${item.datanas}</td>
        <td id="table">${item.formacao}</td>
        <td ><button class="btn btn-danger" onClick="removeElement(${item.id})">Delete</button>
        <button class="btn btn-info" onClick="showElementOnUpdateModal('${item.id}','${item.nome}', '${item.sobrenome}', '${item.datanas}', '${item.formacao}')" data-bs-toggle="modal" data-bs-target="#modelUpdate">Update</button>
        </td>
      </tr>`
      return acc
    },'') 
    tabela.innerHTML = popula

}
populaTabela()

//atribui a variavel 'cadastro' um novo array de produtos filtrados sem o ID excluido 
let removeElement = ID =>{
  console.log("deu")
  cadastro = cadastro.filter(element => element.id !== ID)
  populaTabela()
}

let showElementOnUpdateModal = (id, nomes, sobrenomes, datanass, formacaos) =>{
    hiddenId.value = id
    nomeUpdate.value = nomes
    sobrenomeUpdate.value = sobrenomes
    nascimentoUpdate.value = datanass
    formacaoUpdate.value = formacaos
}



addButton.addEventListener('click', function(){
  nome.value = ""
  sobrenome.value = ""
  nascimento.value = ""
  formacao.value = ""
})


filterInput.addEventListener('input', event =>{
  //console.log(event.target.value)... armazena o valor escrito no input
  const inputValue = event.target.value.toLowerCase()
  const tableText = document.querySelectorAll('#teste')
  tableText.forEach(text=>{
    let textFromVerify = text.textContent.toLowerCase()
    if(textFromVerify.includes(inputValue)){
      text.style.display = "table-row"
      return
    }
    text.style.display = "none"
  })

})

