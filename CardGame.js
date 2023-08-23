let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json())
.then(data => {
    console.log(data)
    deckId = data.deck_id
})

.catch(err => {
    console.log(`error ${err}`)
})

document.querySelector('button').addEventListener('click', drawTwo)
// document.querySelector('button').addEventListener('click', updateScore)


// Below we have set to variable is local-storage which keeps track of our score
localStorage.setItem('player1Point', 0) 
localStorage.setItem('player2Point', 0)
localStorage.setItem('drawGames', 0)
let player1Score = Number(localStorage.getItem('player1Point'))
let player2Score = Number(localStorage.getItem('player2Point'))
let drawMatches = Number(localStorage.getItem('drawGames'))



function drawTwo(){
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#cardsTotal').innerText = "REMAINING CARDS: " + data.remaining
            document.querySelector('#player1').src = data.cards[0].image
            document.getElementById('cardName1').innerHTML = data.cards[0].value + " OF " + data.cards[0].suit
            
            document.querySelector('#player2').src = data.cards[1].image
            document.getElementById('cardName2').innerHTML = data.cards[1].value + " OF " + data.cards[1].suit

            let player1Val = convertToNum(data.cards[0].value)
            let player2Val = convertToNum(data.cards[1].value)

            if(player1Val > player2Val){
                document.querySelector('h3').innerText = "Player 1 Wins This Round" 
            }else if(player1Val <player2Val){
                document.querySelector('h3').innerText = "Player 2 Wins This Round"                
            }else{
                document.querySelector('h3').innerText = "It is a draw. Let's go to the war!"
            }

            /* he below two lines store the value from remaining cards then the 2nd line uses split() method to change it inot array by spliting it using space and we have result ["REMAINING", "CARDS:", "0"] and then [2] get the access of value from there.

            parseInt(...): This function is used to convert a string representation of a number into an actual integer value. In this case, it takes the string "0" and converts it to the integer 0.
            */
            let remainingCardText = document.querySelector('#cardsTotal').innerText
            let remainingCardValue = parseInt(remainingCardText.split(' ')[2])

        if(remainingCardValue >= 0){

            function updateScore(){
                if(document.querySelector('h3').innerText === "Player 1 Wins This Round"){
                    player1Score += 1
                    localStorage.setItem('player1Point', player1Score)
                    
                }else if(document.querySelector('h3').innerText === "Player 2 Wins This Round"){
                    player2Score += 1
                    localStorage.setItem('player2Point', player2Score)
                }else if(document.querySelector('h3').innerText === "It is a draw. Let's go to the war!"){
                    drawMatches += 1;
                    localStorage.setItem('drawGames', drawMatches)
                }else{}
            }
        }

        updateScore()


        if(remainingCardValue === 0){

            if(player1Score > player2Score){
                document.querySelector('#MatchWinner').innerText = ("PLAYER 1 WINS THIS MATCH") 
                document.querySelector('h3').innerText = ""
            }else{
                
                document.querySelector('#MatchWinner').innerText = ("PLAYER 2 WINS THIS MATCH")
            }
            
        }
            
        })




        .catch(err => {
            console.log(`error ${err}`)
        });
}



function convertToNum(val){
    if(val === "ACE"){
        return 14
    }
    else if(val === "KING"){
        return 13
    }
    else if(val === "QUEEN"){
        return 12
    }
    else if(val === "JACK"){
        return 11
    }
    else{
        return Number(val)
    }
}

