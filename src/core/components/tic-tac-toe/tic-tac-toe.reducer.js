
function getInitialMatrix () {
  const matrix = []

  for (let i = 0; i < 3; i++) {
    matrix[i] = []
    for (let j = 0; j < 3; j++) {
      matrix[i][j] = 0
    }
  }

  return matrix
}

export const initialState = {
  matrix: getInitialMatrix(),
  currentPlayer: 1,
  winner: -1,
  winnerDiagonal: null
}

function markPosition (state, i, j) {
  if (state.winner !== -1) {
    return state
  }

  const newState = { ...state }
  if (state.matrix[i][j] === 0) {
    const matrixUpdated = [...state.matrix]
    matrixUpdated[i][j] = state.currentPlayer
    newState.matrix = matrixUpdated
    newState.currentPlayer = state.currentPlayer === 1 ? 2 : 1
  }

  newState.winner = determineWinnerOrDraw(newState.matrix).winner
  newState.winnerDiagonal = determineWinnerOrDraw(newState.matrix).winnerDiagonal

  return newState
}

function resetState () {
  return { ...initialState, matrix: getInitialMatrix() }
}

const winnerPositions = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
]

function getDiagonalClass (winnerPositionArray) {
  switch (winnerPositionArray) {
    case 0:
      return 'line1'
    case 1:
      return 'line2'
    case 2:
      return 'line3'
    case 3:
      return 'line4'
    case 4:
      return 'line5'
    case 5:
      return 'line6'
    case 6:
      return 'diagonal1'
    case 7:
      return 'diagonal2'
    default:
      return null
  }
}

function determineWinnerOrDraw (matrix) {
  const result = {
    winner: -1,
    winnerDiagonal: null
  }
  for (let i = 0; i < winnerPositions.length; i++) {
    const sequence3Winner = winnerPositions[i]

    const sequenceWinner = []
    for (let j = 0; j < 2; j++) {
      const row = sequence3Winner[j][0]
      const column = sequence3Winner[j][1]

      const rowNext = sequence3Winner[j + 1][0]
      const columnNext = sequence3Winner[j + 1][1]

      if (matrix[row][column] !== 0) {
        if (matrix[row][column] === matrix[rowNext][columnNext]) {
          sequenceWinner.push(matrix[row][column])
        }
      }
    }

    if (sequenceWinner.length === 2) {
      result.winner = sequenceWinner[0]
      result.winnerDiagonal = getDiagonalClass(i)
    }
  }

  if (result.winner === -1) {
    let matrixFullfilled = true
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === 0) {
          matrixFullfilled = false
          break
        }
      }
    }
    if (matrixFullfilled) {
      result.winner = 3
    }
  }

  return result
}

function ticTacToeReducer (state, action) {
  switch (action.type) {
    case 'mark-position':
      return markPosition(state, action.payload.i, action.payload.j)
    case 'reset':
      return resetState()
    default:
      throw new Error()
  }
}

export default ticTacToeReducer
