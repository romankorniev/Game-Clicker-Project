const startGameBtn = document.getElementById('startGameBtn')
const gameContainer = document.getElementById('game-container')

let score = 0
let timer = 10
let gameActive = false
let interval 

startGameBtn.addEventListener('click', startGame)

function startGame(){
  gameContainer.innerHTML = ''
  gameContainer.appendChild(startGameBtn)
  startGameBtn.style.display =  'none'
  gameActive = true
  score = 0
  gameDuration = parseInt(document.getElementById('duration').value) || 10 
  timer = gameDuration
  
  updateScore()
  updateTimer()

  interval = setInterval(() => {
    if(timer > 0){
      timer--
      updateTimer()
    }else{
      endGame()
    }
  }, 1000)

  createCircle()
}

function endGame(){
  gameActive = false
  clearInterval(interval)
  clearGameContainer()
  const result = document.createElement('h2')
  result.innerHTML = `Гру закінчено! 
  <br>
  Твій результат: ${score}, час гри: ${gameDuration} сек`
  gameContainer.appendChild(result)
  startGameBtn.style.display = 'block'
}

function clearGameContainer(){
  gameContainer.lastElementChild.remove()
}

function createCircle(){

  const circle = document.createElement('div')
  circle.classList.add('circle')
  const {x, y} = getRandomPosition()
  const {r,g, b} = circleColor()
  circle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  circle.style.left = `${x}px` 
  circle.style.top = `${y}px`
  gameContainer.appendChild(circle)

  circle.addEventListener('click', () => {
    if(gameActive){
      score++
      updateScore()
      circle.remove()
      createCircle()
    }
  })

  setTimeout(() => {
    if (circle.parentNode) {
      circle.remove()
      score--
      updateScore()
      if (gameActive) createCircle()
    }
  }, 800)
}

function circleColor(){
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return {r, g, b}
}

function getRandomPosition(){
  const maxX = gameContainer.clientWidth - 50
  const maxY = gameContainer.clientHeight - 50
  const x = Math.floor(Math.random() * maxX)
  const y = Math.floor(Math.random() * maxY)
  return {x, y}
}

function updateScore(){
  document.getElementById('score').textContent = `Score: ${score}`
}

function updateTimer(){
  document.getElementById('timer').textContent = `Time: ${timer}`
}

