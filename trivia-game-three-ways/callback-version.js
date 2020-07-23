export function getClue(cb){
    // Step 1
    const xhr = new XMLHttpRequest();
    // console.log(xhr.status)
    // Step 2
    xhr.addEventListener('readystatechange', () => {
    // Step 2.1
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    // Step 2.2
    if (xhr.status < 200 || xhr.status >= 300) {
        cb(xhr.status)
        return
    };

    // Step 2.3
    const data = JSON.parse(xhr.responseText);
    // console.log(data)
    cb(null, data)
    console.log(data);
    });

    // Step 3
    xhr.open('GET', 'https://jservice.xyz/api/random-clue');

    // Step 4
    xhr.send();
}
