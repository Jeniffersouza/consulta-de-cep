var submitbutton = document.querySelector ('#app form button') // para puxar aonde queremos atribuir code js, usando o querySelector
var zipCodeField = document.querySelector ('#app form input')// para puxar aonde queremos atribuir code js, usando o querySelector
var content = document.querySelector ('#app main')// para puxar aonde queremos atribuir code js, usando o querySelector

submitbutton.addEventListener('click', run)


function run (event){
    event.preventDefault()

   var zipCode = zipCodeField.value

   zipCode = zipCode.replace('', '') // esse .replace serve para trocar o espaço por nada
   zipCode = zipCode.replace('.', '')// esse .replace serve para trocar o ponto por nada
   zipCode = zipCode.trim() // esse .trim serve para tirar os espaços do inicio e do fim

   console.log (zipCode)

   axios
   .get('https://viacep.com.br/ws/' + zipCode + '/json/') // axios serve para conseguir puxar link externo de biblioteca de dados 
   .then(function (response) {
       if (response.data.erro) {
           throw new Error('Cep inválido') // para digitar cep errado 
       }

       content.innerHTML = '' // serve para depois que colocamos um cep apagar o antigo e só aparece o novo cep.
       createLine(response.data.logradouro) // criamos linhas para aparecer na resposta
       createLine(response.data.localidade + '/' + response.data.uf)
       createLine(response.data.bairro)
    })
   .catch(function (error) {
       content.innerHTML = ''
       createLine('Ops, algo deu errado!')    //criar uma linha aparecendo erro, caso a pessoa escreva coisa errada

   })
}
function createLine(text) { //essa função serve para mostrar o resultado dos dados nas linhas aonde  criamos!
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)

}
