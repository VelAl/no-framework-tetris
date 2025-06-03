export const PLAYFIELD_ROWS = 20;
export const PLAYFIELD_COLUMNS = 10;

export const TETRAMINO_NAMES = ["I", "J", "L", "O", "S", "Z", "T"];

export const TETRAMINOES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export const getRandomElement = (array) => {
  const randomInd = Math.floor(array.length * Math.random());
  return array[randomInd];
};

export const convertPositionToIndex = (row, column) =>
  row * PLAYFIELD_COLUMNS + column;
