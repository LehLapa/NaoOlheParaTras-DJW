const cleide = document.querySelector('.cleide');
const sombra = document.querySelector('.sombra');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.querySelector('.game-over');
const backgroundMusic = new Audio('.trem.mp3');

let cleideX = 375; // posição inicial do jogador
let cleideY = 0; // posição vertical do jogador
let sombraX = 800; // posição inicial do obstáculo
let score = 0;
let isJumping = false;
let isFalling = false;
let isGameOver = false;

document.addEventListener('keydown', movecleide);
document.addEventListener('keydown', jump);

function movecleide(e) {
    const speed = 10;

    if (e.key === 'ArrowLeft' && cleideX > 0) {
        cleideX -= speed;
    } else if (e.key === 'ArrowRight' && cleideX < 750) {
        cleideX += speed;
    }

    cleide.style.left = cleideX + 'px';

    // Verificar colisão
    if (checkCollision()) {
        gameOver();
    }
}

function jump(e) {
    if (e.key === ' ' && !isJumping && !isFalling) { // Barra de espaço
        isJumping = true;
        jumpAnimation();
    }
}

function jumpAnimation() {
    cleideY = 0;
    cleide.style.bottom = cleideY + 'px';

    let jumpHeight = 250; // Alt. máx. do pulo
    let jumpDuration = 1500; // Duração do pulo em milissegundos

    const jumpStartTime = Date.now();

    function updateJump() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - jumpStartTime;
        const progress = Math.min(1, elapsedTime / jumpDuration);

        cleideY = jumpHeight * (1 - progress);
        cleide.style.bottom = cleideY + 'px';

        if (progress < 1) {
            requestAnimationFrame(updateJump);
        } else {
            isJumping = false;
            fallAnimation();
        }
    }

    requestAnimationFrame(updateJump);
}

function fallAnimation() {
    let fallHeight = 0; // Alt. máx. da queda
    let fallDuration = 500; // Duração da queda em milissegundos

    const fallStartTime = Date.now();

    function updateFall() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - fallStartTime;
        const progress = Math.min(1, elapsedTime / fallDuration);

        cleideY = progress * fallHeight;
        cleide.style.bottom = cleideY + 'px';

        if (progress < 1) {
            requestAnimationFrame(updateFall);
        } else {
            isFalling = false;
        }
    }

    requestAnimationFrame(updateFall);
}



function movesombra() {
    const sombraSpeed = 5;

    if (sombraX < -30) {
        sombraX = 800;
        score++;
        scoreDisplay.textContent = score;
    }

    // Verificar colisão
    if (checkCollision()) {
        gameOver();
    }

    if (!isGameOver) {
        requestAnimationFrame(movesombra);
    }
}

function checkCollision() {
    const cleideRect = cleide.getBoundingClientRect();
    const sombraRect = sombra.getBoundingClientRect();

    return (
        cleideRect.left < sombraRect.right &&
        cleideRect.right > sombraRect.left &&
        cleideRect.top < sombraRect.bottom &&
        cleideRect.bottom > sombraRect.top
    );
}

function gameOver() {
    isGameOver = true;
    gameOverDisplay.style.display = 'block';
}

function restartGame() {
    isGameOver = false;
    gameOverDisplay.style.display = 'none';
    sombraX = 800; // Reinicia a posição do obstáculo
    score = 0;
    scoreDisplay.textContent = score;
    cleideX = 375; // Reinicia a posição do jogador
    cleide.style.left = cleideX + 'px';
    cleideY = 0; // Reinicia a posição vertical do jogador
    cleide.style.bottom = cleideY + 'px';
    requestAnimationFrame(movesombra); // Reinicia o movimento do obstáculo
}

movesombra();
