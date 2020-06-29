
function PopulateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then( (res)=>{ return res.json() })
    .then( states =>{
        for(const state of states){
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

PopulateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("Input[name=state]")


    const ufValue = event.target.value

    const indexSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexSelected].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res)=>{ return res.json() })
    .then( cities =>{
        
        for(const city of cities){
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document.querySelector("select[name=uf]")
.addEventListener("change",getCities)

//itens de coleta

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemli = event.target

    //adicionar ou remover ('se não tem bota se tem tira') uma classe no javascript
    itemli.classList.toggle("selected")
    
    const itemId = itemli.dataset.id


    //verificar se existem itens selecionados,
    //se sim, pegar os itens selecionados
    const alredySelected = selectedItems.findIndex( item =>{
        return item == itemId //retorna se item selecionado = itemid
    })

    //verificar se já está selecionado,
    if( alredySelected>= 0){  //se está selecionado o valor mostrado é o index no array, se não está o resultado é -1
        // tirar da seleção
        const filteredItems = selectedItems.filter ( item=>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems 
    } else{
        //se não estiver selecionado adiciona no array de seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
    
}