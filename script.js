const board_border = "#1a535c";
const board_background = "#f7fff7";
const snake_col = "#4ecdc4";
const snake_border = "#1a535c";

//representing the snake as an array of coordinates
let snake = [
  //The yy-coordinate for all parts is always 200
  { x: 200, y: 200 }, //the snake head
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  //{ x: 170, y: 200 },
  //{ x: 160, y: 200 },
];
//The number of coordinates in the object will be equal to the length of the snake

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");

// Start game
main();

// main function called repeatedly to keep the game running
function main() {
  clearCanvas();
  drawSnake();
}

// draw a border around the canvas
function clearCanvas() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart);
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  snakeboard_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
