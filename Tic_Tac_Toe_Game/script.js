let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector(".resetbtn")
let newGameBtn = document.querySelector(".new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector(".msg")

// PlayerX, PlayerO
let turnO = true

// To track draw 
let count = 0

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true
    count = 0
    enableBoxes()
    msgContainer.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            //PlayerO
            box.innerText = "O"
            turnO = false
        }else{
            //PlayerX
            box.innerHTML = "<span class='player-x'>X</span>";
            turnO = true
        }

        box.disabled = true
        count++

        let isWinner = checkWinner()

        if(count === 9 && !isWinner){
            gameDraw()
        }
    })
})

const gameDraw = () => {
    msg.innerText = `Game Draw`
    msgContainer.classList.remove("hide")
    disableBoxes()
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false
        box.innerText = ""
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disableBoxes()
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let position1Value = boxes[pattern[0]].innerText
        let position2Value = boxes[pattern[1]].innerText
        let position3Value = boxes[pattern[2]].innerText

        if(position1Value != "" && position2Value != "" && position3Value != ""){
            if(position1Value === position2Value && position2Value === position3Value){
                console.log("Winner", position1Value)
                showWinner(position1Value)
            }
        }
    }    
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)