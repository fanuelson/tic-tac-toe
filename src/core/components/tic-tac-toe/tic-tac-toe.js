import React, { useReducer } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import SweetAlert from 'sweetalert2-react'
import OXComponent from './xo-component'
import ticTacToeReducer, { initialState } from './tic-tac-toe.reducer'

import winnerCongratulationsImage from '#imgs/winner-congratulations.gif'
import drawImage from '#imgs/draw-image.gif'

import './tic-tac-toe.css'

const TicTacToe = () => {
  const [state, dispatch] = useReducer(ticTacToeReducer, initialState)

  function markPosition (i, j) {
    dispatch({ type: 'mark-position', payload: { i, j } })
  }

  function resetGame () {
    dispatch({ type: 'reset' })
  }

  function getWinnerDisplayText (winner) {
    if (winner !== -1) {
      if (winner === 3) {
        return (
          <div className='text-center mt-20 text-5xl text-yellow-500'>
                        It's a draw!!!
          </div>
        )
      } else {
        return (
          <div className='text-center mt-20 text-5xl text-green-500'>
                        Jogador {winner === 1 ? 'X' : 'O'}  ganhou!!!
          </div>
        )
      }
    } else {
      return <></>
    }
  }

  function getWinnerDisplayImage (winner) {
    const imgWinner = <img className='mx-auto' src={winnerCongratulationsImage} />
    const imgDraw = <img className='mx-auto' width='300px' src={drawImage} />
    return winner === 3 ? imgDraw : imgWinner
  }

  function getWinnerModalTitle (winner) {
    return winner === 3 ? 'Draw' : 'Congratulations'
  }

  return (

    <div>

      <div className='text-center mb-10 '>
        <div className='text-3xl inline mr-20'>Player 1 : X</div>
        <h1 className='text-3xl inline'>Player 2 : O</h1>
      </div>

      <div className='flex  w-1/6 h-20 mx-auto '>
        <div className='ttt-box w-1/3 border-r-1 border-b-2 border-black text-6xl text-center' onClick={() => markPosition(0, 0)}>
          <OXComponent markType={state.matrix[0][0]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-r-2 border-b-2 border-l-2 border-black ' onClick={() => markPosition(0, 1)}>
          <OXComponent markType={state.matrix[0][1]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-b-2 border-l-1 border-black ' onClick={() => markPosition(0, 2)}>
          <OXComponent markType={state.matrix[0][2]} currentPlayer={state.currentPlayer} />
        </div>
      </div>
      <div className='flex  w-1/6 h-20 mx-auto '>
        <div className='w-1/3 border-r-1 border-b-2 border-black ' onClick={() => markPosition(1, 0)}>
          <OXComponent markType={state.matrix[1][0]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-r-2 border-b-2 border-l-2 border-black ' onClick={() => markPosition(1, 1)}>
          <OXComponent markType={state.matrix[1][1]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-b-2 border-l-1 border-black ' onClick={() => markPosition(1, 2)}>
          <OXComponent markType={state.matrix[1][2]} currentPlayer={state.currentPlayer} />
        </div>
      </div>
      <div className='flex  w-1/6 h-20 mx-auto '>
        <div className='w-1/3 border-r-1 border-black ' onClick={() => markPosition(2, 0)}>
          <OXComponent markType={state.matrix[2][0]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-r-2 border-l-2 border-black ' onClick={() => markPosition(2, 1)}>
          <OXComponent markType={state.matrix[2][1]} currentPlayer={state.currentPlayer} />
        </div>
        <div className='w-1/3 border-l-1 border-black ' onClick={() => markPosition(2, 2)}>
          <OXComponent markType={state.matrix[2][2]} currentPlayer={state.currentPlayer} />
        </div>
      </div>

      {getWinnerDisplayText(state.winner)}

      <div className={state.winnerDiagonal} />

      <div className='text-center mt-20'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => resetGame()}>
                    Reset game
        </button>
      </div>

      <SweetAlert
        show={state.winner !== -1}
        title={getWinnerModalTitle(state.winner)}
        html={renderToStaticMarkup(
          <>
            <div className='text-center text-7xl'>
              {getWinnerDisplayImage(state.winner)}
              {getWinnerDisplayText(state.winner)}
            </div>
          </>
        )}
        onConfirm={() => {}}
      />
    </div>
  )
}

export default TicTacToe
