//Below function creates the actual gameboard to play on

function createGameBoard() {
  const rows = 3;
  const columns = 3;
  const gameBoard = [];

  //below nested for loop creates a 2-dimensional array
  //to create a 3 x 3 grid
  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i].push(undefined);
    }
  }
  //Below function adds an 'X' or 'O' to gameBoard
  const addMarker = (row, column, marker) => {
    gameBoard[row][column] = marker;
  };
  //Below returns an object when function is executed that gives access to
  //gameBoard and addMarker function
  return { gameBoard, addMarker };
}

//Below function controls the gameplay
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

  const gameOverWinner = (winningPlayer) => {
    console.log(gameBoard.gameBoard);
    console.log('Congratulations!');
    console.log(`${winningPlayer.name} is the winner!`);
  };

  const gameOverDraw = (winningPlayer) => {
    console.log(gameBoard.gameBoard);
    console.log('Draw!');
  };

  const playRound = (row, column) => {
    //Below if statement checks if there is already a marker in the
    //chosen spot before officially kicking off the round.
    if (
      gameBoard.gameBoard[row][column] === 'X' ||
      gameBoard.gameBoard[row][column] === 'O'
    ) {
      console.log(
        'Invalid move. There is already a marker there. Try again ya big Silly Sally'
      );
      return printNewRound();
    }
    //Below is the actual start of a normal round.
    console.log(
      `Marking square at row(${row}) and 
      column(${column}) with ${getActivePlayer().name}'s Marker(${
        getActivePlayer().marker
      })`
    );
    gameBoard.addMarker(row, column, getActivePlayer().marker);
    //Below if statement checks if there is a winner after the current player moves.
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
        gameBoard.gameBoard[2][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.gameBoard[0][1] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.gameBoard[2][1] === `${getActivePlayer().marker}`)
    ) {
      return gameOverWinner(getActivePlayer());
      //Below else if statement checks if there are any remaining undefined squares,
      //if not, a draw is called.
    } else if (
      gameBoard.gameBoard[0].includes(undefined) === false &&
      gameBoard.gameBoard[1].includes(undefined) === false &&
      gameBoard.gameBoard[2].includes(undefined) === false
    ) {
      return gameOverDraw();
    }
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = createGameplay();
