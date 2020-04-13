let canvas = document.getElementById("snake"); //id que usamos no canvas
let context = canvas.getContext("2d"); //context reideriza o desenho que esta entro do canvas.
let box = 32; //cada quadro 
let snake=[]; //cria a cobrinha como lista, ja que ela vai ser uma serie de coordenadas.
snake[0]={  // o que vai ter dentro
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // direção da cobrinha
let food =  {// elemento array
    x: Math.floor(Math.random()* 15 + 1) * box, // Math.floor
    y: Math.floor(Math.random() * 15 +1) * box
}

function criarBG(){ // desenhar e definir cor canva
    context.fillStyle = "yellow"; // fillStyle:  propriedade fillStyle define ou retorna a cor, gradiente ou padrão usado para preencher o desenho
    context.fillRect(0, 0, 16 * box, 16 * box); // fillReact: desenha um retângulo "preenchido". Usando a propriedade fillStyle para definir uma cor, gradiente ou padrão usado para preencher o desenho. posisão de x,y altura e larguta
}

function criarCobrinha(){ // criar cobrinha usando array
    for(i=0; i<snake.length; i++){
        context.fillStyle = "blue"; // cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho da cobrinha
        }
}

// desenhar comida

function drawFood(){
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, box, box);

}

document.addEventListener('keydown', update); 

function update(event){ // 
    if(event.keyCode == 37 && direction != 'right') direction='left'; // se o nosso botão for 37 e a direção não for right ela muda para left
    if(event.KeyCode == 38 && direction != 'down') direction='up';
    if(event.keyCode == 39 && direction != 'left') direction='rigth';
    if(event.keyCode == 40 && direction != 'up') direction='down';
}

function iniciarJogo(){//permitir que atravesse a parede - definições e impedir que a cobrinha suma
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1 ; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake [0].y == snake[i].y){
            clearInterval(jogo);
        alert ('Game Over :(' );
        }
    }
    
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

//criar coordenadas para cobrinha / movimento
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    //caso a posição seja diferente ela vai retirar o ultimo elemento da cobrinha

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random()* 15 + 1) * box; 
          food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    snake.pop(); //retira o ultimo elemento do array

    let newHead = {
        x: snakeX,
        y: snakeY
}

    snake.unshift(newHead);

}



let jogo=setInterval(iniciarJogo,100); //a cada 100mls para o jogo travar