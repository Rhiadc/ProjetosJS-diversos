const transactionsUl = document.querySelector('#transactions')
const incomeElement = document.querySelector('#money-plus')
const debtElement = document.querySelector('#money-minus')
const balance = document.querySelector('.balance')
const inputText = document.querySelector('#text')
const inputAmount = document.querySelector('#amount')
const form = document.querySelector('#form')



const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []


const addTransactionIntoDOM = transaction =>{
    const operator = transaction.amount < 0 ? '-' : '+'
    //createElement é um método do documento para criar um novo elemento html
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithOperator}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})" id="${transaction.id}">x</button>`
    transactionsUl.append(li)
    
}

const updateValues = () =>{
    // cria um array com todos os valores pagos
    const transactionAmount = transactions.map(transaction=>transaction.amount)
    // filtrando valores maiores que 0, somando todos os valores, definindo 2 casas decimais
    //adiciona o valor do income ao HTML do elemento incomeElement
    const income = transactionAmount
        .filter(valor=> valor > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2)
    incomeElement.innerHTML = `R$${income}`
    // filtrando valores menores que 0, somando todos os valores, definindo 2 casas decimais
    //adiciona o valor do debt ao HTML do elemento debtElement
    const debt = transactionAmount
        .filter(valor=> valor<0)
        .reduce((acc, item)=> acc + item, 0)
        .toFixed(2)
    debtElement.innerHTML = `R$${debt}`
    //usa um reduce para somar todos os valores contidos no array   
    const total = transactionAmount
        .reduce((acc, item) => acc + item,0)
        .toFixed(2)
    balance.innerHTML = `R$${total}`
    console.log("Income: " + income + ", " +  "Debt: " + debt)
}

const cleanInput = () =>{
    inputText.value = ''
    inputAmount.value = ''
}
const init = () =>{
    transactionsUl.innerHTML = ''
    transactions.forEach(item => addTransactionIntoDOM(item))

    updateValues()
    console.log(transactions)
    
}
init()

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

let getId = () => {
    ranId = Math.floor(Math.random() * 101);
    return ranId
}

const addToTransactionsArray = (transactionName,transactionAmount) =>{
    transactions.push({
        id: getId(),
        name: transactionName,
        amount: Number(transactionAmount)
    })
}
const handleFormSubmit = event =>{
    event.preventDefault()
    const transactionName = inputText.value.trim()
    const transactionAmount = inputAmount.value.trim()
    const isSomeInputEmpty = transactionAmount === '' || transactionName === ''
    if(isSomeInputEmpty){
        alert("Favor preencher todos os campos")
        return
    }
    addToTransactionsArray(transactionName, transactionAmount)  
    init()
    updateLocalStorage()
    cleanInput()
    //console.log(transactions)


}

form.addEventListener('submit', handleFormSubmit)

let removeTransaction = ID =>{
    transactions = transactions.filter(transaction=>
        transaction.id !== ID)
    console.log(transactions) 
    updateLocalStorage()  
    init()
}
