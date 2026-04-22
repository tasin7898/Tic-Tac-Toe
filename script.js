const gameGrid = document.querySelector(".game-board")

const el = {
  player1: document.querySelector(".player1"),
  player2: document.querySelector(".player2"),
  draw: document.querySelector(".draw"),
  resetBtn: document.getElementById("playAgain"),
  resetScoreBtn : document.getElementById("reset-score"),
  boardCells: document.querySelectorAll(".game-board > div"),
}
const GameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];
  const boardMutate = (idx, marker) => _board[idx] = marker;
  const winPattern = () => {
    const winArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let idx = 0; idx < winArr.length; idx++) {
    let item = winArr[idx];
    const result = _winDetection(item);
    if (result) return result;
    
  }
  }
  const _winDetection = ([x, y, z]) => {
    //console.log(x, y, z);
    if (_board[x] === "X" && _board[y] === "X" && _board[z] === "X") return "player1 wins";
    if (_board[x] === "O" && _board[y] === "O" && _board[z] === "O") return "player2 wins";
  }
  const drawDetection = () => {
    if (_board.every(pos => !!pos) && !winPattern()) {
      return "draw"; 
    }
  }

  const resetBoard = () => {
    _board = ["", "", "", "", "", "", "", "", ""];
  }

  const getBoard = () => [..._board];

  const printBoard = () => {
  console.log(_board.slice(0,3));
  console.log(_board.slice(3,6));
  console.log(_board.slice(6,9));
}
  return {boardMutate, winPattern, drawDetection, printBoard, resetBoard, getBoard};
})();


const Game = (() => {
  let _score = { player1 : 0, player2 : 0};
  
  const _createPlayer = (name, marker) => {
    return {name, marker};
  };

  let _scoreFlag = 1;
  let _playerFlag = 0;
  const move = (idx) => {
    const isWon = GameBoard.winPattern();
    const draw = GameBoard.drawDetection();
    if(!GameBoard.getBoard()[idx] && !isWon && !draw){
      if (_playerFlag === 0) {
        GameBoard.boardMutate(idx, player1.marker);
        _playerFlag = 1;
        return player1.marker;
      }
      else if (_playerFlag === 1) {
        GameBoard.boardMutate(idx, player2.marker);
        _playerFlag = 0;
        return player2.marker;
      }
    }
  }
  
  
  const gameOver= () => {
    const isWon = GameBoard.winPattern();
    const draw = GameBoard.drawDetection();
    const gameOver = "Game Over";
    
    GameBoard.printBoard();
    if (isWon) {
      console.log(gameOver);
      
      
      return isWon;     
    }

    if(draw) {
      console.log(gameOver);
      return draw;
    }   
  }

  
  const reset = () =>  {
    GameBoard.resetBoard();
    _scoreFlag = 1;
  };
    //const isWon = GameBoard.winPattern();
    //const draw = GameBoard.drawDetection();
    //if (isWon || draw) 
   
  const resetScore = () => {
    _score.player1 = 0;
    _score.player2 = 0;
    _scoreFlag = 1;
  }
  

  const updateScore = () => {
    const isWon = GameBoard.winPattern();
    console.log(isWon);
    if(_scoreFlag === 1){
      if(isWon === "player1 wins") _score.player1++;
      if(isWon === "player2 wins") _score.player2++;
      _scoreFlag = 0;
    }
  }

  const getScore = () => ({..._score});


  const player1 = _createPlayer("player1", "X");
  const player2 = _createPlayer("player2", "O");
  return {move, gameOver, getScore, reset, resetScore, updateScore};
})();

const DisplayController = (() => {
  
  const clickHandler = (e) => {
    const id = e.target.id;
    const idx = Number(id.slice(1));
    Game.move(idx);
    if(Game.gameOver()) {
      Game.updateScore();
      scoreUpdate();
    }
    renderBoard();
  }
  
  const scoreUpdate = () => {
    const over = Game.gameOver();
    el.player1.textContent = `X: ${Game.getScore().player1}`;
    el.player2.textContent = `O: ${Game.getScore().player2}`
    if (over === "draw" ) el.draw.textContent = "draw";
  }
  const clearDraw = () => {
    el.draw.textContent = "";
  }
  const renderBoard = () => {
    
    const board = GameBoard.getBoard();  
    el.boardCells.forEach((cell, idx) => {
      cell.textContent = board[idx];
    });
  }

  return {renderBoard, clickHandler, scoreUpdate, clearDraw};
})();

/*const gridMap = 
  Object.fromEntries(Array.from({ length: 9}, (_, i) => [`p${i}`, i]));*/

//console.log(gridMap)
//console.log(GameBoard.printBoard());
//console.log(Game.gameOver());

gameGrid.addEventListener("click", (e) => {
 DisplayController.clickHandler(e);
 //DisplayController.scoreUpdate();
 
});

el.resetBtn.addEventListener("click", () => {
  Game.reset();
  DisplayController.renderBoard();
  DisplayController.clearDraw();
})

el.resetScoreBtn.addEventListener("click", () => {
  Game.reset();
  Game.resetScore();
  
  DisplayController.scoreUpdate();
  
  DisplayController.renderBoard();
  DisplayController.clearDraw();
})












