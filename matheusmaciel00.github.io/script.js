// Configuração do canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400; // Largura do canvas
canvas.height = 600; // Altura do canvas

// Configuração do carro
const carWidth = 40;
const carHeight = 70;
let carX = canvas.width / 2 - carWidth / 2; // Posição inicial do carro
let carY = canvas.height - carHeight - 10; // Posição inicial do carro

// Obstáculos
let obstacles = [];
let obstacleWidth = 40;
let obstacleHeight = 70;
let obstacleSpeed = 2;
let score = 0;
let gameOver = false;

// Função para criar obstáculos
function createObstacle() {
    const x = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x: x, y: 0 });
}

// Função para desenhar o carro
function drawCar() {
    ctx.fillStyle = 'blue'; // Cor do carro
    ctx.fillRect(carX, carY, carWidth, carHeight); // Desenha o carro
}

// Função para desenhar obstáculos
function drawObstacles() {
    ctx.fillStyle = 'red'; // Cor dos obstáculos
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight); // Desenha cada obstáculo
    });
}

// Função para atualizar a posição dos obstáculos
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed; // Move o obstáculo para baixo
    });
    // Remove obstáculos que saíram da tela
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Função para verificar colisões
function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            carX < obstacle.x + obstacleWidth &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacleHeight &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true; // Colisão detectada
        }
    });
}

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    drawCar(); // Desenha o carro
    drawObstacles(); // Desenha os obstáculos
    updateObstacles(); // Atualiza a posição dos obstáculos
    checkCollision(); // Verifica colisões

    // Atualiza a pontuação
    document.getElementById('score').innerText = score;

    if (!gameOver) {
        requestAnimationFrame(draw); // Chama a função novamente para continuar o jogo
    } else {
        ctx.fillStyle = 'black'; // Cor do texto de Game Over
        ctx.font = '30px Arial'; // Fonte do texto
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2); // Exibe Game Over
        ctx.font = '20px Arial'; // Fonte do texto da pontuação
        ctx.fillText('Score: ' + score, canvas.width / 2 - 40, canvas.height / 2 + 30); // Exibe a pontuação
        ctx.fillText('Press Enter to Restart', canvas.width / 2 - 100, canvas.height / 2 + 60); // Instrução para reiniciar
    }
}

// Função para mover o carro
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && carX > 0) {
        carX -= 10; // Move para a esquerda
    }
    if (event.key === 'ArrowRight' && carX < canvas.width - carWidth) {
        carX += 10; // Move para a direita
    }
    if (event.key === 'Enter' && gameOver) {
        startGame(); // Reinicia o jogo
    }
});

// Função para iniciar o jogo
function startGame() {
    score = 0; // Reseta a pontuação
    obstacles = []; // Limpa os obstáculos
    obstacleSpeed = 2; // Reseta a velocidade do obstáculo
    gameOver = false; // Reseta o estado do jogo
    document.getElementById('startScreen').style.display = 'none'; // Oculta a tela de início
    draw(); // Inicia o loop de desenho
    setInterval(createObstacle, 1000); // Cria um novo obstáculo a cada segundo
}

// Exibe a tela de início
document.getElementById('startScreen').style.display = 'block'; // Mostra a tela de início