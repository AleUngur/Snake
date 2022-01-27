var gameboard_border = "#1a535c";
var gameboard_background = "#edf6f9";
var snake_body = "#4ecdc4";
var snake_border = "#1a535c";

//representing the snake as an array of coordinates
var snake = [
  //The y-coordinate for all parts is always 250
  { x: 250, y: 250 }, //the snake head
  { x: 230, y: 250 },
  { x: 210, y: 250 },
];

var snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
var snakeboard_ctx = snakeboard.getContext("2d");

// True if changing direction
var changing_direction = false;
// to move horizontally
var dx = 20;
// to move vertically
var dy = 0;

document.addEventListener("keydown", changeDirection); //

startGame();

// main function called repeatedly to keep the game running
function startGame() {
  if (gameOver()) return;
  changing_direction = false;
  //add a slight delay between each call of the functions
  setTimeout(function onTick() {
    clearBoard();
    moveSnake();
    //calling drawsnake() every time the snakes moves to see the intermediate moves of the snake
    drawSnake();
    startGame();
  }, 100);
}

// draw a border around the canvas
//remove all previous positions of the snake
function clearBoard() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = gameboard_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = gameboard_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart); //fac cu un for!!!
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  snakeboard_ctx.fillStyle = snake_body;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function moveSnake() {
  // Create the new Snake's head
  var head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  snake.pop(); //delete last bodypart
}

function gameOver() {
  for (var i = 2; i < snake.length; i++) {
    //the head hit a body part
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    /*hit left border*/ snake[0].x < 0 ||
    /*hit right border*/ snake[0].x > snakeboard.width - 20 ||
    /*hit top border*/ snake[0].y < 0 ||
    /*hit down border*/ snake[0].y > snakeboard.height - 20
  ) {
    return true;
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
  if (dy == -20) {
    var goingUp = true;
  } else if (dy == 20) {
    var goingDown = true;
  } else if ((dx = 20)) {
    var goingRight = true;
  } else if (dx == -20) {
    var goingLeft = true;
  }
  //changing direction of the snake
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -20;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -20;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 20;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 20;
  }
}
