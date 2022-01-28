//representing the snake as an array of coordinates
var snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
];
var snakeboard = document.getElementById("snakeboard");
var snakeboard_ctx = snakeboard.getContext("2d");
var changing_direction;
var dx = 10;
var dy = 0;
var score = 0;
var food_x;
var food_y;
document.addEventListener("keydown", changeDirection);

startGame();
generateFood();

// startGame() function called repeatedly to keep the game running
function startGame() {
  if (gameOver()) return;
  //add a slight delay between each call of the functions
  setTimeout(function repeat() {
    changing_direction = false;
    clearBoard();
    drawFood();
    moveSnake();
    //calling drawsnake() every time the snakes moves to see the intermediate moves of the snake
    drawSnake();
    startGame();
  }, 100);
}

//draw a border around the canvas
//remove all previous positions of the snake
function clearBoard() {
  snakeboard_ctx.fillStyle = "#edf6f9";
  snakeboard_ctx.strokestyle = "#1a535c";
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart);
}

// Draw one snake part
function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = "#4ecdc4";
  snakeboard_ctx.strokestyle = "#1a535c";
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake() {
  // Create the new Snake's head
  var head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  if (snake[0].x == food_x && snake[0].y == food_y) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    generateFood();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

function changeDirection(event) {
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  var UP_KEY = 38;
  var DOWN_KEY = 40;

  if (changing_direction) return;
  changing_direction = true;

  var keyPressed = event.keyCode;
  // Prevent the snake from reversing
  if (dy == -10) {
    var goingUp = true;
  } else if (dy == 10) {
    var goingDown = true;
  } else if (dx == 10) {
    var goingRight = true;
  } else if (dx == -10) {
    var goingLeft = true;
  }
  //changing direction of the snake
  if (keyPressed == LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed == UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed == RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed == DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function generateFood() {
  food_x = randomFood(0, snakeboard.width - 10);
  food_y = randomFood(0, snakeboard.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  for (bodyPart in snake) {
    function hasEatenFood(bodyPart) {
      if (bodyPart.x == food_x && bodyPart.y == food_y) {
        generateFood();
      }
    }
  }
}

function drawFood() {
  snakeboard_ctx.fillStyle = "#ff6b6b";
  snakeboard_ctx.strokestyle = "#ffe66d";
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gameOver() {
  for (var i = 2; i < snake.length; i++) {
    //the head hit a body part
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  if (
    /*hit left border*/ snake[0].x < 0 ||
    /*hit right border*/ snake[0].x > snakeboard.width - 10 ||
    /*hit top border*/ snake[0].y < 0 ||
    /*hit down border*/ snake[0].y > snakeboard.height - 10
  ) {
    return true;
  }
}
