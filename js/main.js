const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach( (elemento)=> {
    criaElemento(elemento)
})


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    const existe = itens.find( elemento => elemento.nome === nome.value)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    
    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)
        
        //vai la, no documento, na tag body
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual  
    } else {

            itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

            criaElemento(itemAtual)
            itens.push(itemAtual)
    }
    
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})


function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")
    
    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {

    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
    
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return(elementoBotao)   

}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}



// 1 - quando o formulario for submetido ou  enviado "(subimit") ira  a função percorrer e verificar se
//     buscar o elemento PAI (FORM) por onde ira ocorrer a captura dos dados e o elemento que ira sofrer a alteração (lista = ul)
// 2 -depois     
// 3 - este evento ira percorrer todo os elementos filhos ( na verdade toda a pagina) buscando pelo "alvo" (target)
// 4 - uma vez encontrado ele ira executar a função "criaElemento()"  que recebera os dados capturados e ira criar a ista.
//      finalizado a função ele ira retornar para o campo de preenchimento um valor vazio
// 4.1 - cria a tag "li" (lista) e adiciona uma classe 
// 4.2 - cria a tag "Strong" e referencia ela como quantidade
// 4.3 - o appendChild() adicionou o elemento "numeroItem" dentro do elemento "novoItem" 
// e agora é possivel receber o valor do numeroItem + nome. Ficando assim defino as referencias p/ os parametros da função.
// setItem("parametro", valor) = definirItem(). 