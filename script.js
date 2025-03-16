let player = document.getElementById("player");
let gameArea = document.getElementById("game-area");
let scoreElement = document.getElementById("score");
let highScoreElement = document.getElementById("high-score");
let restartButton = document.getElementById("restart");
let startButton = document.getElementById("start-game");
let bgMusic = document.getElementById("bg-music");
let hitSound = document.getElementById("hit-sound");

let playerX = 185, playerY = 185;
let speed = 5;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = "بهترین امتیاز: " + highScore;
let obstacles = [];
let gameRunning = false;

// حرکت بازیکن
document.addEventListener("keydown", function(event) {
    if (!gameRunning) return;

    if (event.key === "ArrowUp" && playerY > 0) playerY -= speed;
    if (event.key === "ArrowDown" && playerY < 370) playerY += speed;
    if (event.key === "ArrowLeft" && playerX > 0) playerX -= speed;
    if (event.key === "ArrowRight" && playerX < 370) playerX += speed;
    
    player.style.top = playerY + "px";
    player.style.left = playerX + "px";
});

// ایجاد موانع
function createObstacle() {
    if (!gameRunning) return;
    
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * 370) + "px";
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
    
    let obstacleY = 0;
    let interval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(interval);
            return;
        }

        obstacleY += 5 + score / 10;
        obstacle.style.top = obstacleY + "px";

        if (obstacleY >= 370 && parseInt(obstacle.style.left) < playerX + 30 && parseInt(obstacle.style.left) + 30 > playerX) {
            hitSound.play();
            gameOver();
            clearInterval(interval);
        }

        if (obstacleY > 400) {
            gameArea.removeChild(obstacle);
            obstacles.shift();
            score++;
            scoreElement.innerText = "امتیاز: " + score;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreElement.innerText = "بهترین امتیاز: " + highScore;
            }
        }
    }, 50);
}

// پایان بازی
function gameOver() {
    gameRunning = false;
    alert("💥 باختی! امتیاز: " + score);
    bgMusic.pause();
}

// دکمه شروع بازی
startButton.addEventListener("click", function() {
    gameRunning = true;
    bgMusic.play();
    setInterval(createObstacle, 1500);
    startButton.style.display = "none";
});

// دکمه شروع مجدد
restartButton.addEventListener("click", function() {
    location.reload();
});
