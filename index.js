const game = document.querySelector('.game');
const winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const initial = { currentPlayer: 1, state: new Array(9).fill(0) }

//model
let gameState = { currentPlayer: 1, state: new Array(9).fill(0) };
const updateGameState = newState => { gameState = { ...gameState, ...newState } }
const getGameState = () => { return gameState }

//controller
const play = (gameState, cellindex) => {
    let { currentPlayer, state: old } = gameState
    if (old[cellindex] > 0) return gameState;
    old[cellindex] = currentPlayer
    const newState = {
        currentPlayer: currentPlayer === 1 ? 2 : 1,
        state: old
    }
    return newState;
}
const checkWin = (gameState) => {
    const { state: old } = gameState
    for (line in winners) {
        const [x, y, z] = winners[line];
        if (old[x] && old[x] === old[y] && old[x] === old[z]) {
            console.log(true)
            return true
        }
    }
    return false
}
//view
const createCellListener = cellindex => (event) => {
    let updatedState = play(getGameState(), cellindex)
    updateCell(event.target, getContent(updatedState.state[cellindex]))
    updateGameState(updatedState)
    if (checkWin(updatedState)) {
        alert("Wins")
        start(initial)
        return;
    };
}
const getContent = box => box == 0 ? "" : box === 1 ? "x" : "o"
const updateCell = (cell, value) => {
    cell.textContent = value;
}
const start = (gameState) => {
    game.innerHTML = ""
    gameState.state.forEach((box, index) => {
        const toAppend = document.createElement("div");
        toAppend.className = "game__box";
        toAppend.addEventListener('click', createCellListener(index))
        toAppend.textContent = getContent(box)
        game.appendChild(toAppend)
    })
}
start(gameState);
