const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let board = [
    ['N', 'N', 'N'],
    ['N', 'N', 'N'],
    ['N', 'N', 'N']
]

let currentPlayer = 'X';

readInput = () => {
    return new Promise((resolve, reject) => {
        rl.question(`${currentPlayer}'s move: `, (answer) => {
            resolve(answer);
        });
    });
}

let played = 0

//controller
checkWinner = () => {
  const wins = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[2,0],[1,1],[0,2]],
  ]

  for (line in wins){
    const {a, b, c} = wins[line]
    if(board[a[0]][a[1]] != 'N' && board[a[0]][a[1]] == board[b[0]][b[1]] && board[a[0]][a[1]] == board[c[0]][c[1]]){
      return true;
    }
  }
  return false;
}

checkDraw = () => played > 8
resetGame = () => {
  board = [
      ['N', 'N', 'N'],
      ['N', 'N', 'N'],
      ['N', 'N', 'N']
  ]
  currentPlayer = 'X';
  played = 0;
}

play = async () => {
  played++
  const input = await readInput()
  let [x, y] = input.split(",")
  board[x][y] = currentPlayer;
  console.log(board);

  return checkWinner() || checkDraw();
}

//view
printBoard = () => {
    // Print the board
    for (i = 0; i < board.length; i ++){
      for( j = 0; j < board[i].length; j ++){
        rl.write(board[i][j] + " ")
      }
      rl.write("\n")
    }
}


playGame = async () => {
    printBoard();
    // Write your code that lets two people play tic tac toe
    // you might need to implement your own functions  
    let complete = false;
    while (!complete) {
      const input = await readInput()
      let [x, y] = input.split(",")
      if(board[x][y] != 'N') board[x][y] = currentPlayer;
      played++

      if(checkWinner() || checkDraw()) {
        checkDraw() ? rl.write("Draw") : rl.write(checkWinner() + " is the Winner")
        resetGame();
        complete = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        printBoard();
      }
    }
}

playGame();
