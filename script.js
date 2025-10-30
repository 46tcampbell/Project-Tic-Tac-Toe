function createGameBoard() {
  const rows = 3;
  const columns = 3;
  const gameBoard = [];

  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i].push('0');
    }
  }

  const addMarker = (row, column, marker) => {
    gameBoard[row][column] = marker;
  };

  return { gameBoard, addMarker };
}

// function createPlayer(name, marker) {
//   return { name, marker };
// }

function createGameplay(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const gameBoard = createGameBoard();
  const players = [
    {
      name: playerOneName,
      marker: 'X',
    },
    {
      name: playerTwoName,
      marker: 'O',
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    console.log(gameBoard.gameBoard);
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const gameOver = (winningPlayer) => {
    console.log(gameBoard.gameBoard);
    console.log('Congratulations!');
    console.log(`${winningPlayer.name} is the winner!`);
  };

  const playRound = (row, column) => {
    console.log(
      `Marking square at row(${row}) and 
      column(${column}) with ${getActivePlayer().name}'s Marker(${
        getActivePlayer().marker
      })`
    );
    gameBoard.addMarker(row, column, getActivePlayer().marker);

    if (
      (gameBoard.gameBoard[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[0][1] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[0][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[2][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][1] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[1][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][0] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[1][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][0] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[0][2] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[1][2] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][2] === `${getActivePlayer().marker}`)
    ) {
      return gameOver(getActivePlayer());
    }
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
  // printName: function (player) {
  //   console.log(player.name);
  // },
}

const game = createGameplay();
