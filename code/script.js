const scoreDiv = document.getElementById("score");
const plotXY = document.getElementById("plot-xy");
const plotZY = document.getElementById("plot-zy");
const plotXW = document.getElementById("plot-xw");
const plotZW = document.getElementById("plot-zw");

let snake = [];
snake[0] = { x: 9, y: 10, z: 5, w: 5 };

let food = {
    x: Math.floor(Math.random() * 19 + 1),
    y: Math.floor(Math.random() * 19 + 1),
    z: Math.floor(Math.random() * 19 + 1),
    w: Math.floor(Math.random() * 19 + 1)
};

let score = 0;
let dx = 0, dy = 0, dz = 0, dw = 0;
let isPaused = false;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 32) { // Spacebar
        isPaused = !isPaused;
        return;
    }
    if (event.keyCode == 65 && dx != 1) { // A
        dx = -1; dy = 0; dz = 0; dw = 0;
    } else if (event.keyCode == 87 && dy != -1) { // W
        dy = 1; dx = 0; dz = 0; dw = 0;
    } else if (event.keyCode == 68 && dx != -1) { // D
        dx = 1; dy = 0; dz = 0; dw = 0;
    } else if (event.keyCode == 83 && dy != 1) { // S
        dy = -1; dx = 0; dz = 0; dw = 0;
    } else if (event.keyCode == 37 && dz != 1) { // Left arrow
        dz = -1; dx = 0; dy = 0; dw = 0;
    } else if (event.keyCode == 38 && dw != -1) { // Up arrow
        dw = 1; dx = 0; dy = 0; dz = 0;
    } else if (event.keyCode == 39 && dz != -1) { // Right arrow
        dz = 1; dx = 0; dy = 0; dw = 0;
    } else if (event.keyCode == 40 && dw != 1) { // Down arrow
        dw = -1; dx = 0; dy = 0; dz = 0;
    }
}

function draw() {
    if (isPaused) return;

    let snakeX = snake[0].x + dx;
    let snakeY = snake[0].y + dy;
    let snakeZ = snake[0].z + dz;
    let snakeW = snake[0].w + dw;

    // Wrap around the walls
    if (snakeX < 0) snakeX = 19;
    if (snakeY < 0) snakeY = 19;
    if (snakeZ < 0) snakeZ = 19;
    if (snakeW < 0) snakeW = 19;
    if (snakeX >= 20) snakeX = 0;
    if (snakeY >= 20) snakeY = 0;
    if (snakeZ >= 20) snakeZ = 0;
    if (snakeW >= 20) snakeW = 0;

    if (snakeX == food.x && snakeY == food.y && snakeZ == food.z && snakeW == food.w) {
        score++;
        scoreDiv.innerHTML = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1),
            y: Math.floor(Math.random() * 19 + 1),
            z: Math.floor(Math.random() * 19 + 1),
            w: Math.floor(Math.random() * 19 + 1)
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
        z: snakeZ,
        w: snakeW
    };

    if (collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
    plotSnake();
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y && head.z == array[i].z && head.w == array[i].w) {
            return true;
        }
    }
    return false;
}

function plotSnake() {
    const snakeTraceXY = {
        x: snake.map(part => part.x),
        y: snake.map(part => part.y),
        mode: 'markers',
        marker: {
            color: snake.map((part, index) => index === 0 ? 'blue' : 'green'),
            size: 20
        },
        name: 'Snake'
    };

    const foodTraceXY = {
        x: [food.x],
        y: [food.y],
        mode: 'markers',
        marker: {
            color: 'red',
            size: 20
        },
        name: 'Food'
    };

    const layoutXY = {
        title: 'Snake Game (X, Y)',
        xaxis: { range: [0, 20], showgrid: true, zeroline: true },
        yaxis: { range: [0, 20], showgrid: true, zeroline: true },
        showlegend: false
    };

    Plotly.newPlot(plotXY, [snakeTraceXY, foodTraceXY], layoutXY);

    const snakeTraceZY = {
        x: snake.map(part => part.z),
        y: snake.map(part => part.y),
        mode: 'markers',
        marker: {
            color: snake.map((part, index) => index === 0 ? 'blue' : 'green'),
            size: 20
        },
        name: 'Snake'
    };

    const foodTraceZY = {
        x: [food.z],
        y: [food.y],
        mode: 'markers',
        marker: {
            color: 'red',
            size: 20
        },
        name: 'Food'
    };

    const layoutZY = {
        title: 'Snake Game (Z, Y)',
        xaxis: { range: [0, 20], showgrid: true, zeroline: true },
        yaxis: { range: [0, 20], showgrid: true, zeroline: true },
        showlegend: false
    };

    Plotly.newPlot(plotZY, [snakeTraceZY, foodTraceZY], layoutZY);

    const snakeTraceXW = {
        x: snake.map(part => part.x),
        y: snake.map(part => part.w),
        mode: 'markers',
        marker: {
            color: snake.map((part, index) => index === 0 ? 'blue' : 'green'),
            size: 20
        },
        name: 'Snake'
    };

    const foodTraceXW = {
        x: [food.x],
        y: [food.w],
        mode: 'markers',
        marker: {
            color: 'red',
            size: 20
        },
        name: 'Food'
    };

    const layoutXW = {
        title: 'Snake Game (X, W)',
        xaxis: { range: [0, 20], showgrid: true, zeroline: true },
        yaxis: { range: [0, 20], showgrid: true, zeroline: true },
        showlegend: false
    };

    Plotly.newPlot(plotXW, [snakeTraceXW, foodTraceXW], layoutXW);

    const snakeTraceZW = {
        x: snake.map(part => part.z),
        y: snake.map(part => part.w),
        mode: 'markers',
        marker: {
            color: snake.map((part, index) => index === 0 ? 'blue' : 'green'),
            size: 20
        },
        name: 'Snake'
    };

    const foodTraceZW = {
        x: [food.z],
        y: [food.w],
        mode: 'markers',
        marker: {
            color: 'red',
            size: 20
        },
        name: 'Food'
    };

    const layoutZW = {
        title: 'Snake Game (Z, W)',
        xaxis: { range: [0, 20], showgrid: true, zeroline: true },
        yaxis: { range: [0, 20], showgrid: true, zeroline: true },
        showlegend: false
    };

    Plotly.newPlot(plotZW, [snakeTraceZW, foodTraceZW], layoutZW);
}

let game = setInterval(draw, 100);