// const canvas = document.getElementById('canvas');
// console.log(canvas);

// const currentColor = document.getElementById('current-color');
// const colors = document.querySelectorAll('.color');
// let penOn = false;

// const handleMouseOver = (event) => {
//     console.log(event.target);
//     event.target.style.background = currentColor.style.background;
// }

// //Create our cells, add event listeners to them, and append them to the canvas
// for (let i = 0; i < 100; i++) {
//     const cell= document.createElement('div');
//     cell.classList.add('cell');
//     cell.addEventListener('mouseover', handleMouseOver)
//     canvas.append(cell);
// }

// //Add event listeners to each color
// for (let color of colors) {
//     color.addEventListener('click', () => {
//         currentColor.style.background=color.style.background;
//     });
// }



/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const clearButton = document.getElementById("clearButton");
const drawingContext = canvas.getContext("2d"); //drawingContext or ctx

const CELL_SIDE_COUNT = 20;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {};

// Set default color
colorInput.value = "#FFBB00";

// Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Setup the guide
{
  guide.style.width = `${canvas.width}px`;
  guide.style.height = `${canvas.height}px`;
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
    guide.insertAdjacentHTML("beforeend", "<div></div>")
  );
}

function handleCanvasMousedown(e) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }

  const canvasBoundingRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasBoundingRect.left;
  const y = e.clientY - canvasBoundingRect.top;
  const cellX = Math.floor(x / cellPixelLength);
  const cellY = Math.floor(y / cellPixelLength);
  const currentColor = colorHistory[`${cellX}_${cellY}`];

  if (e.ctrlKey) {
    if (currentColor) {
      colorInput.value = currentColor;
    }
  } else {
    fillCell(cellX, cellY);
  }
}

function handleClearButtonClick() {
  const yes = confirm("Are you sure you wish to clear the canvas?");

  if (!yes) return;

  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
}

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? null : "none";
}

function fillCell(cellX, cellY) {
  const startX = cellX * cellPixelLength;
  const startY = cellY * cellPixelLength;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
