import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  getRandomElement,
  TETRAMINO_NAMES,
  TETRAMINOES,
} from "./utilities.js";

export class Tetris {
  constructor() {
    this.playfield;
    this.tetramino;
    this.isGameOver = false;
    this.init();
  }

  init() {
    this.generatePlayField();
    this.generateTetramino();
  }

  generatePlayField() {
    this.playfield = Array.from({ length: PLAYFIELD_ROWS }, () =>
      new Array(PLAYFIELD_COLUMNS).fill(0)
    );
  }

  generateTetramino() {
    const name = getRandomElement(TETRAMINO_NAMES);
    const matrix = TETRAMINOES[name];

    const column = PLAYFIELD_COLUMNS / 2 - Math.ceil(matrix.length / 2);

    const row = -2;

    this.tetramino = {
      name,
      matrix,
      row,
      column,
    };
  }

  moveTetroDown() {
    this.tetramino.row += 1;
    if (!this.isValid()) {
      this.tetramino.row -= 1;

      this.placeTetramino();
    }
  }
  moveTetroLeft() {
    this.tetramino.column -= 1;
    if (!this.isValid()) {
      this.tetramino.column += 1;
    }
  }
  moveTetroRight() {
    this.tetramino.column += 1;
    if (!this.isValid()) {
      this.tetramino.column -= 1;
    }
  }

  rotateTetro() {
    const prevMatrix = structuredClone(this.tetramino.matrix);
    const newMatrix = prevMatrix.map(() => []);

    prevMatrix.forEach((row) => {
      row.forEach((cell, c) => newMatrix[c].unshift(cell));
    });

    this.tetramino.matrix = newMatrix;
    if (!this.isValid()) {
      this.tetramino.matrix = prevMatrix;
    }
  }

  isValid() {
    const matrixSize = this.tetramino.matrix.length;

    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (!this.tetramino.matrix[row][col]) continue;

        if (this.isOutsideOfGameBoard(row, col)) return false;

        if (this.isCollides(row, col)) return false;
      }
    }

    return true;
  }

  isOutsideOfGameBoard(row, col) {
    return (
      this.tetramino.column + col < 0 ||
      this.tetramino.column + col > PLAYFIELD_COLUMNS - 1 ||
      this.tetramino.row + row > PLAYFIELD_ROWS - 1
    );
  }

  placeTetramino() {
    const matrixSize = this.tetramino.matrix.length;

    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (!this.tetramino.matrix[row][col]) continue;
        if (this.isOutsideOfTopBoard(row)) {
          this.isGameOver = true;
          return;
        }

        this.playfield[this.tetramino.row + row][this.tetramino.column + col] =
          this.tetramino.name;
      }
    }

    this.generateTetramino();
    this.deleteFilledRows();
  }

  deleteFilledRows() {
    const filledLines = this.findFilledRows();
    filledLines.forEach(this.dropRowsAbowe);
  }

  findFilledRows() {
    return this.playfield.reduce((akk, row, ind) => {
      if (row.every((cell) => cell)) akk.push(ind);

      return akk;
    }, []);
  }

  isCollides(row, col) {
    const y = this.tetramino.row + row;
    const x = this.tetramino.column + col;

    return !!this.playfield[y]?.[x];
  }

  dropRowsAbowe = (rowToDelete) => {
    for (let row = rowToDelete; row > 0; row--) {
      // console.log('row ===>', row);
      // console.log('value ===>', this.playfield);
      this.playfield[row] = this.playfield[row - 1];

      this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
    }
  };

  isOutsideOfTopBoard(row) {
    return this.tetramino.row + row < 0;
  }
}
