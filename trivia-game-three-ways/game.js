import { getClue as getClueFromCallback } from './callback-version.js'
import { getClue as getClueFromPromise } from './promise-version.js'
import { getClue as getClueFromAsyncFunction } from './async-await-version.js'

document.addEventListener('DOMContentLoaded', (event) => {
    let score = 0;
    let song = new Audio('Jeopardy-theme-song.mp3')
    document.getElementById('check-response').classList.remove('pure-button')
    document.getElementById('check-response').classList.add('is-hidden')

    const callBackBtn = document.getElementById('use-callback')
    callBackBtn.addEventListener("click", () => {
        song.play();
        document.getElementById('answer').classList.add('is-hidden')
        document.getElementById('check-response').classList.add('pure-button')
        document.getElementById('check-response').classList.remove('is-hidden')
        document.getElementById('player-response').value = ''

        getClueFromCallback( (status, clue) => {
            if(status !== null){
                console.error(status)
            } else {
                document.getElementById('question').innerHTML = `Question: ${clue.question}`
                document.getElementById('answer').innerHTML = clue.answer
                document.getElementById('value').innerHTML = `Question Value: ${clue.value}`
                document.getElementById('category-title').innerHTML = clue.categoryId

                if(clue.invalid_count && clue.invalid_count > 0){
                    document.getElementById('invalid-count').innerHTML = 'invalid'
                } else {
                    document.getElementById('invalid-count').innerHTML = 'valid';
                }
            }
        })

    })

    const promBtn = document.getElementById('use-promise')
    promBtn.addEventListener('click', () => {
        song.play();
        document.getElementById('answer').classList.add('is-hidden')
        document.getElementById('check-response').classList.add('pure-button')
        document.getElementById('check-response').classList.remove('is-hidden')
        document.getElementById('player-response').value = ''

        getClueFromPromise()
            .then(clue => {
                document.getElementById('question').innerHTML = `Question: ${clue.question}`
                document.getElementById('answer').innerHTML = clue.answer
                document.getElementById('value').innerHTML = `Question Value: ${clue.value}`
                document.getElementById('category-title').innerHTML = clue.categoryId

                if(clue.invalid_count && clue.invalid_count > 0){
                    document.getElementById('invalid-count').innerHTML = 'invalid'
                } else {
                    document.getElementById('invalid-count').innerHTML = 'valid';
                }
            })
    })

        const asyncBtn = document.getElementById('use-async-await')
        asyncBtn.addEventListener('click', async () => {
            song.play();
            document.getElementById('answer').classList.add('is-hidden')
            document.getElementById('check-response').classList.add('pure-button')
            document.getElementById('check-response').classList.remove('is-hidden')
            document.getElementById('player-response').value = ''

            try{
                const clue = await getClueFromAsyncFunction();
                console.log(clue)
                document.getElementById('question').innerHTML = `Question: ${clue.question}`
                document.getElementById('answer').innerHTML = clue.answer
                document.getElementById('value').innerHTML = `Question Value: ${clue.value}`
                document.getElementById('category-title').innerHTML = clue.categoryId

            } catch {
                if(clue.invalid_count && clue.invalid_count > 0){
                    document.getElementById('invalid-count').innerHTML = 'invalid'
                } else {
                    document.getElementById('invalid-count').innerHTML = 'valid';
                }
                console.error('You suck', error)
            }

        })

    document.getElementById('check-response').addEventListener('click', () => {
        let response = document.getElementById('player-response').value
        const answer = document.getElementById('answer').innerHTML
        let value = document.getElementById('value').innerHTML
        song.pause();
        song.currentTime = 0
        if(response.toLowerCase() === answer.toLowerCase()){
            score += Math.abs(value.slice(15))
            console.log(score)
            document.getElementById('score').innerHTML = `Score: ${score}`
        } else {
            document.getElementById('answer').classList.remove('is-hidden')
        }
    })

});
