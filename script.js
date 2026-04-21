function GameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];
  
}
let board = ["", "", "", "", "", "", "", "", ""];


const createPlayer = (name) => {
  let move;
  //GameBoard();
  console.log(board);
  if (name === "player1") {
    move = (idx) => board[idx] = "X";

  }
   if (name === "player2") {
    move = (idx) => board[idx] = "O";

  }
  return {move};
} 

const player1 = createPlayer("player1");
const player2 = createPlayer("player2");

player1.move(0); // X
player2.move(1); // O
player1.move(2); // X
player2.move(4); // O
player1.move(3); // X
player2.move(5); // O
player1.move(7); // X
player2.move(6); // O
player1.move(8); // X

console.log(board);



function gameOver(){
  if (winPattern()) {
    console.log("game over");
    return winPattern();
    
  }
if (board.every(pos => !!pos)) {
  console.log("game over");
  return "draw"; 
}
}
function winPattern () {
  const winArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [0, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let idx = 0; idx < winArr.length; idx++) {
    const item = winArr[idx];
    const result = winDetection(item);
    if (result) return result;
  }
  return null;
}

function winDetection ([x,y,z]) {
  if (board[x] === "X" && board[y] === "X" && board[z] === "X") return "player1 wins";
  if (board[x] === "O" && board[y] === "O" && board[z] === "O") return "player2 wins";
  //return "draw";
}




console.log(gameOver());

