const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningMessageTextElement =  document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.querySelector('#winningMessage')
const restartButton = document.querySelector('#restartButton')
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn

startGame()

restartButton.addEventListener('click' , startGame)

function startGame(){
    circleTurn = false;
    
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) // for restarting with clear board
        cell.classList.remove(CIRCLE_CLASS) // for restarting with clear board
        cell.removeEventListener('click' , handleClick) // for restarting with clear board
        cell.addEventListener('click' , handleClick , {once : true})
    })
    
    setBoardHoverClass()
    winningMessageElement.classList.remove('show') // for restarting with clear board
}

function handleClick(e){
    // console.dir(e)
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placeMark
    placeMark(cell , currentClass)
    // Check for win
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){  // Check for draw
        endGame(true)
    }
    else{
        // switch turns
        swapTurns()
        //hover effects
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw !!'
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Won !!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) 
        || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell , currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winning_combinations.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}