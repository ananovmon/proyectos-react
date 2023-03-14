import { useState } from 'react'
import './App.css'
// import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

function App () {
  // Estados del juego.

  // El estado que inicializa el tablero (primero como un array de 9 casillas vacío) y que se irá actualizando
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')

    // ?? mira si lo primero es null o undefined
    return turnFromStorage ?? TURNS.X
  })

  // null significa que no hay ganador (lo inicializamos así)
  // false significa que hay un empate

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  // Función que actualiza los cuadrados del tablero en base a un índice
  const updateBoard = (index) => {
    // Para evitar que se sobreescibran datos, se comprueba que la casilla seleccionada esté vacía.
    // En caso de no estarlo, no se actualiza. O si hay un ganador, no se actualiza
    if (board[index] || winner) return

    // Se crea una copia del tablero porque los estados deben ser inmutables
    const newBoard = [...board]

    // En el cuadrado con el index que hemos pulsado ponemos el turno del que toque (ya sea x u o)
    newBoard[index] = turn
    setBoard(newBoard)

    // Se actualiza de esta forma el estado del turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Cuando actualizamos el tablero, revisamos si tenemos ganador
    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      // confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <section className='game'>
        {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >

              {square}

            </Square>
          )
        })
      }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
