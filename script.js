import { Tetris } from "./tetris.js";
import {
  convertPositionToIndex,
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
} from "./utilities.js";

const tetris = new Tetris();
const DOMcells = document.querySelectorAll(".grid>div");

let timeout;
let requestId;

const drawTetramino = () => {
  /*ACTIVE FIGURE*/
  const { tetramino } = tetris;

  /*ITERATE FIGURE ROWS */
  tetramino.matrix.forEach((row, rowIND) =>
    /*ITERATE FIGURE COLUMNS */
    row.forEach((_, collIND) => {
      /*IF MATRIX CELL IS 0 */
      if (!tetramino.matrix[rowIND][collIND]) return;
      /*CURRENTLY HIDDEN PART OF THE FALLING FIGURE*/
      if (tetramino.row + rowIND < 0) return;

      const cellIndex = convertPositionToIndex(
        tetramino.row + rowIND,
        tetramino.column + collIND
      );

      DOMcells[cellIndex].classList.add(tetramino.name);
    })
  );
};

const draw = () => {
  DOMcells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayField();
  drawTetramino();
};

function drawPlayField() {
  tetris.playfield.map((row, y) =>
    row.map((_, x) => {
      const cell = tetris.playfield[y][x];

      if (!cell) return;

      const index = convertPositionToIndex(y, x);
      DOMcells[index].classList.add(cell);
    })
  );
}

initKeyDown();

moveDown();

function initKeyDown() {
  document.addEventListener("keydown", onKeydown);
}

function onKeydown(e) {
  switch (e.key) {
    case "ArrowDown": {
      moveDown();
      break;
    }

    case "ArrowLeft": {
      moveLeft();
      break;
    }

    case "ArrowRight": {
      moveRight();
      break;
    }

    case " ": {
      rotate();
      break;
    }

    default:
      break;
  }
}

function moveDown() {
  tetris.moveTetroDown();
  draw();

  stopLoop();
  startLoop();

  if (tetris.isGameOver) {
    gameOver();
  }
}

function moveLeft() {
  tetris.moveTetroLeft();
  draw();
}

function moveRight() {
  tetris.moveTetroRight();
  draw();
}

function rotate() {
  tetris.rotateTetro();
  draw();
}

function startLoop() {
  timeout = setTimeout(() => {
    requestId = requestAnimationFrame(moveDown);
  }, 2000);
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  clearTimeout(timeout);
}

function gameOver() {
  stopLoop();
  document.removeEventListener("keydown", onKeydown);
}
