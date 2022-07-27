//Look for items in the ejs (dom) with the class of ".fa-trash"
const deleteBtn = document.querySelectorAll('.fa-trash')
//Look for items in the ejs (dom) with the class of ".item" and is a span
const item = document.querySelectorAll('.item span')
//Look for items in the ejs (dom) with the class of ".item" & ".coompleted" and is a span
const itemCompleted = document.querySelectorAll('.item span.completed')

// Makes an Array for every item with class of '.fa-trash', then it is awaiting a click and running the deleteItem function.
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})
// Makes an Array for every item with class of '.item', then it is awaiting a click and running the markComplete function.
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})
// Makes an Array for every item with class of '.itemCompleted', then it is awaiting a click and running the markUnComplete function.
Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete)
})

async function deleteItem(){
// this variable gets the object containing the lis generated from the DB (parent node) then gets the second span on that li (childnode[1]) and lastly gets the innertext of that span
    const itemText = this.parentNode.childNodes[1].innerText
// this try is, 1. setting what action is to be taken by the backend, which is delete (CRUD), 2. pointing to the json file, 3. converting json to JS, specifically item text that was grabbed earlier
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
//get and console log th confirmation of deletion from backend        
        const data = await response.json()
        console.log(data)
// refresh the page        
        location.reload()
//checks for any errors and will report them in the console
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
// this variable gets the object containing the lis generated from the DB (parent node) then gets the second span on that li (childnode[1]) and lastly gets the innertext of that span    
    const itemText = this.parentNode.childNodes[1].innerText
// this try is, 1. setting what action is to be taken by the backend, which is update (CRUD), 2. pointing to the json file, 3. converting json to JS, specifically item text that was grabbed earlier    
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
//get and console log th confirmation of update from backend         
        const data = await response.json()
        console.log(data)
// refresh the page    
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
// this variable gets the object containing the lis generated from the DB (parent node) then gets the second span on that li (childnode[1]) and lastly gets the innertext of that span        
    const itemText = this.parentNode.childNodes[1].innerText
// this try is, 1. setting what action is to be taken by the backend, which is update (CRUD), 2. pointing to the json file, 3. converting json to JS, specifically item text that was grabbed earlier        
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
//get and console log th confirmation of update from backend         
        const data = await response.json()
        console.log(data)
// refresh the page        
        location.reload()

    }catch(err){
        console.log(err)
    }
}
