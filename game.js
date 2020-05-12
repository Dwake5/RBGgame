let numSquares = 9
let colors = generateRandomColors(numSquares)
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor()
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode")
let currentScore = document.getElementById("currentScore")
let currentLifes = document.getElementById("currentLifes")
let easyMax = document.getElementById("easyScore").innerHTML
let normalMax = document.getElementById("mediumScore").innerHTML
let hardMax = document.getElementById("hardScore").innerHTML
let currentDifficulty = 'hard'
let clickedId = []

const updateHighScore = (mode, score) => {
    if (mode == 'easy') {
      if (score > easyMax) {
        document.getElementById("easyScore").innerHTML = score
        messageDisplay.textContent('New highest easy score')
      }
    } else if (mode == 'normal') {
      if (score > normalMax) {
        document.getElementById("mediumScore").innerHTML = score
        messageDisplay.textContent('New highest normal score')
      }
    } else if (mode == 'hard') {
      if (score > hardMax) {
        document.getElementById("hardScore").innerHTML = score
        messageDisplay.textContent('New highesthard score')
      }
    }
       
    reset()
    scoreReset()
}



for (let i = 0; i < modeButtons.length; i++){
  modeButtons[i].addEventListener("click", function(){
    modeButtons[0].classList.remove("selected")
    modeButtons[1].classList.remove("selected")
    modeButtons[2].classList.remove("selected")
    this.classList.add("selected")
    lastDifficulty = currentDifficulty
    if(this.textContent === "Easy"){
      numSquares = 3
      currentDifficulty = 'easy'
    } else if (this.textContent === "Normal"){
      numSquares = 6
      currentDifficulty = 'normal'
    } else {
      numSquares = 9
      currentDifficulty = 'hard'

    }
    if (lastDifficulty != currentDifficulty) {
      updateHighScore(lastDifficulty, currentScore.innerHTML)
      scoreReset()
    }
    reset()
  })
}

function reset(){
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  for(let i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none"
    }
  }
  h1.style.backgroundColor = "steelblue";
  clickedId = []
};

const freshGame = () => {
  updateHighScore(currentDifficulty, currentScore.innerHTML)
  reset()
  scoreReset()
}

const scoreReset = () => {
  currentScore.innerHTML = 0
  currentLifes.innerHTML = 10
}

colorDisplay.textContent = pickedColor

for(let i = 0; i < squares.length; i++){
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", function(){
    let clickedColor = this.style.backgroundColor;
    if(clickedColor === pickedColor){
      //score() // determines score added
      messageDisplay.textContent = "Correct!";
      changeColors(clickedColor)
      h1.style.backgroundColor = clickedColor
      let score = currentScore.innerHTML 
      score++ 
      currentScore.innerHTML = score
      reset()
      messageDisplay.textContent = "Good job, +1 score"

    } else {
      if (clickedId.includes(this.id)) {

      } else {
        let clicks = currentLifes.innerHTML
        clicks-- 
        currentLifes.innerHTML = clicks
        clickedId.push(this.id)
        console.log(clickedId)
      }

      this.style.backgroundColor = "#232323"
      messageDisplay.textContent = "Try again"
      if (currentLifes.innerHTML == 0) {
        updateHighScore(currentDifficulty, currentScore.innerHTML)
      }
    }
  });
}

function changeColors(color){
  for(let i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  let random = Math.floor(Math.random()*colors.length)
  return colors[random];
}

function generateRandomColors(num){
  let arr = []
  for(let i = 0; i < num; i++){
    arr.push(randomColors())
  }
  return arr
}

function randomColors(){
  let r = Math.floor(Math.random()*256)
  let g = Math.floor(Math.random()*256)
  let b = Math.floor(Math.random()*256)
  return "rgb(" + r + ", " + g + ", " + b + ")"
}