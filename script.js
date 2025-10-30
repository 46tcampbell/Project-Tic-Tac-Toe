function createGameboard() {
  const rows = 3;
  const columns = 3;
  const gameboard = [];

  for (let i = 0; i < rows; i++) {
    gameboard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameboard[i].push([]);
    }
  }
  return { gameboard };
}

function createPlayer(name, marker) {
  return { name, marker };
}
