function createGameBoard() {
  const rows = 3;
  const columns = 3;
  const gameBoard = [];

  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i].push([]);
    }
  }

  const addMarker = (row, column, marker) => {
    gameBoard[row][column] = marker;
  };

  return { gameBoard, addMarker };
}

function createPlayer(name, marker) {
  return { name, marker };
}
