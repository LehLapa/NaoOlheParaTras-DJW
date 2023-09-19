# Não Olhe Para Tras-DJW

Olá, esse é o arquivo ReadMe. Onde seguimos intruções passadas em aula para a realização do projeto, na qual, nossa música escolhida para a criação do Canvas e StopMotion, foi: "Sataná" by Demonia. Dulpa no Laboratório: Letícia Lapa e Lucas Carvalho.


# Diagrama de caso de uso 
![diagrama caso de uso](https://github.com/LehLapa/NaoOlheParaTras-DJW/assets/128638269/f96e01b0-39fa-441e-b107-9b928e2e3d66) 
(Caso não possível visualização por ReadMe, Imagens estão anexadas no repositório).


# Diagrama de classe 
No diagrama possuimos a classe Jogo, que utiliza o atributo personagem e em seus métoodos, ações que iram iniciar o desenho e finaliza-los durante o stopmotion.
Ao lado esquerdo temos a Classe Cenario onde em seus métodos possui atributos para desenhar na tela, como: retas e círculos, que representaram o ambiente. Os métodos utilizados são: desenhar, apagar e suas posições, X e Y (que serão mencionadas no Script para o desenho).


![diagrama de classe](https://github.com/LehLapa/NaoOlheParaTras-DJW/assets/128638269/f45986d0-598a-471a-be92-8056a9753731) 
(Caso não possível visualização por ReadMe, Imagens estão anexadas no repositório).



# Video do jogo


https://github.com/LehLapa/NaoOlheParaTras-DJW/assets/128614213/bd8928de-c924-4f81-9d19-989c7da709cb

Este jogo simples em JavaScript permite que o jogador controle um personagem chamado "Cleide" para evitar obstáculos e ganhar pontos.

## Como Jogar
- Use as teclas de seta **esquerda** e **direita** para mover Cleide.
- Pressione a tecla **espaço** para fazer Cleide pular.
- Seu objetivo é evitar colidir com o obstáculo em movimento chamado "Sombra".
- Cada evitação bem-sucedida aumenta sua pontuação.

## Jogabilidade
- Cleide começa na parte inferior da tela.
- Você pode mover Cleide para a esquerda ou direita dentro dos limites da tela.
- Pule para evitar o obstáculo.
- Se Cleide colidir com o obstáculo, o jogo acaba.

## Pontuação
- Sua pontuação é exibida no topo.
- Cada evitação bem-sucedida de obstáculo aumenta sua pontuação.

## Fim de Jogo
- Quando ocorre uma colisão, uma tela de "Fim de Jogo" é exibida.
- Você pode reiniciar o jogo clicando no botão "Reiniciar".

## Desenvolvimento
- começamos fazendo classes: "cleide" que é a personagem, "sombra" inimigo, "score" pontuação e a classe de "gmae over"
- ficando assim no javascript
- const cleide = document.querySelector('.cleide');
const sombra = document.querySelector('.sombra');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.querySelector('.game-over');

- adicionamos o pulo para evitar os obstaculos/inimigo
- function jump(e) {
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

    - tambem podemos movimentar ela 
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
