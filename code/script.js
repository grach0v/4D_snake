const scoreDiv = document.getElementById("score");
const plotDiv = document.getElementById("plot");

let snake = [];
snake[0] = { x: 9, y: 10 };

let food = {
    x: Math.floor(Math.random() * 19 + 1),
    y: Math.floor(Math.random() * 19 + 1)
};

let score = 0;
let d;
let isPaused = false;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 32) { // Spacebar
        isPaused = !isPaused;
        return;
    }
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function draw() {
    if (isPaused) return;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= 1;
    if (d == "UP") snakeY += 1;
    if (d == "RIGHT") snakeX += 1;
    if (d == "DOWN") snakeY -= 1;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreDiv.innerHTML = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1),
            y: Math.floor(Math.random() * 19 + 1)
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= 20 || snakeY >= 20 || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
    plotSnake();
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function plotSnake() {
    const snakeTrace = {
        x: snake.map(part => part.x),
        y: snake.map(part => part.y),
        mode: 'markers',
        marker: {
            color: 'green',
            size: 20
        },
        name: 'Snake'
    };

    const foodTrace = {
        x: [food.x],
        y: [food.y],
        mode: 'markers',
        marker: {
            color: 'red',
            size: 20
        },
        name: 'Food'
    };

    const layout = {
        title: 'Snake Game',
        xaxis: { range: [0, 20], showgrid: false },
        yaxis: { range: [0, 20], showgrid: false },
        showlegend: false
    };

    Plotly.newPlot(plotDiv, [snakeTrace, foodTrace], layout);
}

let game = setInterval(draw, 100);