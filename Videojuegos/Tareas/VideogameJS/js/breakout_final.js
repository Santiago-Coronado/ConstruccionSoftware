/*
Implementation of the game of Breakout

Santiago Coronado
2025-03-04
*/

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1;
let speedIncrease = 1.02;
let initialSpeed = 0.5;
let blockScore = 0;
let columns = 8;
let rows = 7;
let lives = 3;
let gameOver = false;

// Context of the Canvas
let ctx;

// Classes for the Breakout game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball"); // Call constructor of father class
        this.initVelocity();
        this.inPlay = false;
        this.followPaddle = true; // Check if ball is following paddle
    }

    update(deltaTime) {
        if (this.followPaddle){
            this.position.x = paddle.position.x + paddle.width / 2 - this.width / 2;
        }
        else {
            this.position = this.position.plus(this.velocity.times(deltaTime)); // velocity * time to get change of distance
        }
    }

    initVelocity() {
        this.inPlay = true;
        this.position = new Vec(paddle.position.x + paddle.width / 2 - this.width / 2, paddle.position.y - this.height);
        let angle = (Math.random() * (140 * (Math.PI / 180))) + (200 * (Math.PI / 180));
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(paddle.position.x + paddle.width / 2 - this.width / 2, paddle.position.y - this.height);
        this.velocity = new Vec(0, 0);
        this.followPaddle = true;
    }

    launch (){
        this.followPaddle = false;
        this.initVelocity();
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle"); // Call constructor of father class
        this.velocity = new Vec(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime)); // velocity * time to get change of distance

        // Keep paddle in canvas
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

class Brick extends GameObject {
    constructor(position, width, height, colors) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        super(position, width, height, randomColor, "brick");
        this.active = true;
    }

    draw(ctx) {
        if (this.active) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

// Objects that represent things in the game
const paddle = new Paddle(new Vec(canvasWidth / 2 - 50, canvasHeight - 30), 100, 20, "blue");
const ball = new Ball(new Vec(paddle.position.x + paddle.width / 2 - this.width / 2, paddle.position.y - this.height), 20, 20, "red");
const ball2 = new Ball(new Vec(paddle.position.x + paddle.width / 2 - 10, paddle.position.y - 20), 20, 20, "yellow");
ball2.inPlay = false;
const bricks = [];

// Create bricks
const brickColors = ["red", "green", "blue", "yellow", "purple", "orange"];

const brickWidth = 80;  
const brickHeight = 20; 
const brickPadding = 10; // Space between bricks
const totalBrickWidth = (brickWidth + brickPadding) * columns - brickPadding; // Total width of all bricks in a row
const startX = (canvasWidth - totalBrickWidth) / 2; // initial horizontal position of bricks

for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        bricks.push(new Brick(
            new Vec(startX + i * (brickWidth + brickPadding), j * 30 + 50), 
            brickWidth, 
            brickHeight, 
            brickColors
        ));
    }
}

const gameoverLabel = new TextLabel(canvasWidth / 2 - 120, canvasHeight / 2, "40px Unbuntu Mono", "white");
const brickLabel = new TextLabel(20, 35, "40px Unbuntu Mono", "white");
const livesLabel = new TextLabel(canvasWidth - 35, 35, "40px Unbuntu Mono", "white");

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    drawScene(0);
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'a') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } 
        else if (event.key === 'd') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
        else if (event.key === 'w') {
            if (ball.followPaddle){
                ball.launch();
            }
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'a' || event.code === 'ArrowLeft' || event.key === 'd' || event.code === 'ArrowRight') {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {
    if (gameOver){
        return;
    }
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime; // Change of time

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw objects
    paddle.draw(ctx);
    ball.draw(ctx);
    if (ball2.inPlay) {
        ball2.draw(ctx); // Draw the second ball if it's active
    }
    
    bricks.forEach(brick => brick.draw(ctx)); // forEach calls the function for each element of the array of bricks
    brickLabel.draw(ctx,`${blockScore}`)
    livesLabel.draw(ctx,`${lives}`)

    // Update the properties of the object
    ball.update(deltaTime);
    if (ball2.inPlay){
        ball2.update(deltaTime); // Update the second ball if it's active
    }
    paddle.update(deltaTime);

    // Ball collision with walls
    if (ball.position.x < 0 || ball.position.x + ball.width > canvasWidth){
        ball.velocity.x *= -1;
    }
    if (ball.position.y < 0){
        ball.velocity.y *= -1;
    }

    // Second ball collision with walls
    if (ball2.inPlay){
        if (ball2.position.x < 0 || ball2.position.x + ball2.width > canvasWidth){
            ball2.velocity.x *= -1;
        }
        if (ball2.position.y < 0){
            ball2.velocity.y *= -1;
        }
    }

    // Ball collision with paddle
    if (boxOverlap(ball, paddle)){
        ball.velocity.y *= -1;
        ball.velocity = ball.velocity.times(speedIncrease);
    }

    // Second ball collision with paddle
    if (ball2.inPlay && boxOverlap(ball2, paddle)){
        ball2.velocity.y *= -1;
        ball2.velocity = ball2.velocity.times(speedIncrease);
    }

    // Ball collision with bricks
    bricks.forEach(brick => {
        if (brick.active && boxOverlap(ball, brick)){
            brick.active = false;
            ball.velocity.y *= -1;
            blockScore += 1;

            // Spawn second ball after breaking 15 bricks
            if (blockScore === 15 && !ball2.inPlay){
                ball2.inPlay = true;
                ball2.launch();
            }
        }
        // Handle collision for the second ball
        if (ball2.inPlay && brick.active && boxOverlap(ball2, brick)){
            brick.active = false;
            ball2.velocity.y *= -1;
            blockScore += 1;
        }
    });

    // Check if ball is out of bounds
    if (ball.position.y + ball.height > canvasHeight){
        ball.reset();
        lives -= 1;
    }


    // Check lives
    if (lives === 0){
        gameoverLabel.draw(ctx, "GAME OVER");
        gameOver = true;
    }

    // Check if all bricks are destroyed
    if (bricks.every(brick => !brick.active)){
        gameoverLabel.draw(ctx, "YOU WIN!");
        gameOver = true;
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}

// Start the game
main();