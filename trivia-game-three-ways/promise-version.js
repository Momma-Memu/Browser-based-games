export function getClue(){

    return fetch('https://jservice.xyz/api/random-clue')
        .then(obj => {
            console.log(obj)
            if(!obj.ok){
                console.log(obj.statusText)
                return
            } else {
                return obj.json()
            }
        })
        // .then(data => {
        //     console.log(data)
        // })
}
