let ball = document.getElementById("ball");
//console.log(ball);
let left = 0;
let direction = 'right';
let interval = 0;

function move() {
    if (direction === 'right') {
        left ++;
        if (left > 990) direction = 'left';
    } else {
        left --;
        if (left < 1) direction = 'right';
    }

    ball.style.left = `${left}px`;
}

function start() {
    interval = setInterval(move, 10);
}

function stop() {
    clearInterval(interval);
}