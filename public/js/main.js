const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCharacter)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteCharacter(){
    const cName = this.parentNode.childNodes[1].innerText
    const aNumber = this.parentNode.childNodes[3].innerText
    const sName = this.parentNode.childNodes[5].innerText
    const hName = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteCharacter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'cName': cName,
              'aNumber': aNumber,
              'sName': sName,
              'hName': hName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const cName = this.parentNode.childNodes[1].innerText
    const aNumber = this.parentNode.childNodes[3].innerText
    const sName = this.parentNode.childNodes[5].innerText
    const hName = this.parentNode.childNodes[7].innerText
    const likesS = Number(this.parentNode.childNodes[9].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'cName': cName,
              'aNumber': aNumber,
              'sName': sName,
              'hName': hName,
              'likesS': likesS
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}