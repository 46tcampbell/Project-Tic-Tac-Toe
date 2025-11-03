//Below function creates the actual gameboard to play on

const gameBoard = (function () {
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

  const getBoard = () => gameBoard;
  //Below function adds an 'X' or 'O' to gameBoard
  const addMarker = (row, column, marker) => {
    gameBoard[row][column] = marker;
  };
  //Below returns an object when function is executed that gives access to
  //gameBoard and addMarker function
  return { getBoard, addMarker };
})();

//Below function controls the gameplay
function createGameplay(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  // const gameBoard = gameBoard.getBoard();
  const dialog = document.querySelector('dialog');
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
    console.log(gameBoard.getBoard());
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const gameOverWinner = (winningPlayer) => {
    console.log(gameBoard.getBoard());
    const winningH1 = document.createElement('h1');
    winningH1.textContent = 'Congratulations!';
    dialog.appendChild(winningH1);
    const winningH2 = document.createElement('h2');
    winningH2.textContent = `${winningPlayer.name} is the winner!`;
    dialog.appendChild(winningH2);
    const winningBtn = document.createElement('button');
    winningBtn.textContent = 'Reset Gameboard';
    winningBtn.addEventListener('click', () => {
      dialog.close();
      window.location.reload();
    });
    dialog.appendChild(winningBtn);
    dialog.showModal();
  };

  const gameOverDraw = (winningPlayer) => {
    console.log(gameBoard.getBoard());
    const drawH1 = document.createElement('h1');
    drawH1.textContent = 'Draw!';
    dialog.appendChild(drawH1);
    const drawH2 = document.createElement('h2');
    drawH2.textContent = `Nobody wins. Play Again?`;
    dialog.appendChild(drawH2);
    const drawBtn = document.createElement('button');
    drawBtn.textContent = 'Reset Gameboard';
    drawBtn.addEventListener('click', () => {
      dialog.close();
      window.location.reload();
    });
    dialog.appendChild(drawBtn);
    dialog.showModal();
  };

  const playRound = (row, column) => {
    //Below if statement checks if there is already a marker in the
    //chosen spot before officially kicking off the round.
    if (
      gameBoard.getBoard()[row][column] === 'X' ||
      gameBoard.getBoard()[row][column] === 'O'
    ) {
      alert(
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
      //Below are the if statements for vertical 3-in-a-rows
      (gameBoard.getBoard()[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][0] === `${getActivePlayer().marker}`) ||
      (gameBoard.getBoard()[0][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][1] === `${getActivePlayer().marker}`) ||
      (gameBoard.getBoard()[0][2] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][2] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][2] === `${getActivePlayer().marker}`) ||
      //Below are the if statements for horizontal 3-in-a-rows
      (gameBoard.getBoard()[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[0][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[0][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.getBoard()[1][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.getBoard()[2][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][2] === `${getActivePlayer().marker}`) ||
      //Below are the if statements for diagonal 3-in-a-rows
      (gameBoard.getBoard()[0][0] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][2] === `${getActivePlayer().marker}`) ||
      (gameBoard.getBoard()[0][2] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[1][1] === `${getActivePlayer().marker}` &&
        gameBoard.getBoard()[2][0] === `${getActivePlayer().marker}`)
    ) {
      return gameOverWinner(getActivePlayer());
      //Below else if statement checks if there are any remaining undefined squares,
      //if not, a draw is called.
    } else if (
      gameBoard.getBoard()[0].includes(undefined) === false &&
      gameBoard.getBoard()[1].includes(undefined) === false &&
      gameBoard.getBoard()[2].includes(undefined) === false
    ) {
      return gameOverDraw();
    }
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer, getBoard: gameBoard.getBoard };
}

function screenController(playerOneName, playerTwoName) {
  const game = createGameplay(playerOneName, playerTwoName);
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = '';
    boardDiv.style.backgroundColor = 'black';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    playerTurnDiv.style.backgroundColor = '#f7b003';

    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const squareButton = document.createElement('button');
        squareButton.classList.add('square');
        squareButton.dataset.row = rowIndex;
        squareButton.dataset.column = columnIndex;
        squareButton.textContent = column;
        boardDiv.appendChild(squareButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener('click', clickHandlerBoard);

  // Initial render
  updateScreen();

  // return { updateScreen };

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', () => {
  if (startBtn.textContent === 'Reset Gameboard') {
    return window.location.reload();
  }
  let playerOneName;
  let playerTwoName;
  do {
    playerOneName = prompt('Please enter Player One Name', 'Player One');
    if (playerOneName === null) {
      alert('You cancelled the prompt. Please provide a name to continue.');
    } else if (playerOneName.trim() === '') {
      alert('Name cannot be empty. Please enter your name.');
    }
  } while (playerOneName === null || playerOneName.trim() === '');
  do {
    playerTwoName = prompt('Please enter Player Two Name', 'Player Two');
    if (playerTwoName === null) {
      alert('You cancelled the prompt. Please provide a name to continue.');
    } else if (playerTwoName.trim() === '') {
      alert('Name cannot be empty. Please enter your name.');
    }
  } while (playerTwoName === null || playerTwoName.trim() === '');

  screenController(playerOneName, playerTwoName);
  startBtn.textContent = 'Reset Gameboard';
});

// screenController();
