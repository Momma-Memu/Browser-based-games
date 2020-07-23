export async function getClue(){
    const response = 'https://jservice.xyz/api/random-clue'
    const obj = await fetch(response)
    if(!obj.ok){
        console.log(obj.statusText)
        return
    } else {
        return obj.json();
    }
}
// console.log(getClue())
