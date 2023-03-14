import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

//Todas las posibles combinaciones que hacen ganar a uno de los dos jugadores
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]



const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected': '' }`

  //En esta función se pasa el index en updateBoard para saber en qué cuadrado se ha pulsado
  const handleClick = () => {
    updateBoard(index)
  }

  // Esto es cada cuadrado. Si pulsamos en uno de ellos se ejecuta la función handleClick
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>

  )
} 


function App() {

  //Estados del juego.

  //El estado que inicializa el tablero (primero como un array de 9 casillas vacío) y que se irá actualizando 
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  // null significa que no hay ganador (lo inicializamos así)
  // false significa que hay un empate

  const[winner, setWinner] = useState(null) 

  //Función para comprobar si hay ganador pasándole un tablero concreto. Devuelve el ganador (x u o) o null
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo

      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c])
        {
          return boardToCheck[a]
        } 
    }

    //Si no tenemos ganador
    return null
  }

  //Función que actualiza los cuadrados del tablero en base a un índice
  const updateBoard = (index) => {

    //Para evitar que se sobreescibran datos, se comprueba que la casilla seleccionada esté vacía.
    //En caso de no estarlo, no se actualiza. O si hay un ganador, no se actualiza
    if(board[index] || winner) return

    //Se crea una copia del tablero porque los estados deben ser inmutables
    const newBoard = [...board]

    //En el cuadrado con el index que hemos pulsado ponemos el turno del que toque (ya sea x u o)
     newBoard[index] = turn 
     setBoard(newBoard)

     //Se actualiza de esta forma el estado del turno
     const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
     setTurn(newTurn)

     //Cuando actualizamos el tablero, revisamos si tenemos ganador
     const newWinner = checkWinner(newBoard)

     if(newWinner){
      setWinner(newWinner)
     }

  }
  

  return (
    <main className='board'>
    <h1>Tic tac toe</h1>

    <section className='game'>
      {
        board.map((_,index) =>{
          return(
            <Square key={index} 
                    index={index}
                    updateBoard={updateBoard}>

              {board[index]}

            </Square>
          )
        })
      }
    </section>

    <section className='turn'>
      <Square isSelected = {turn === TURNS.X}>
        {TURNS.X}
      </Square>

      <Square isSelected = {turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>



    {
      winner ===! null && (
         
    <section className='winner'>
      <div className='text'>
        <h2> {winner === false ? 'Empate' : 'Ganó:'}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
      </div>
    </section>
      )
    }

    </main>
  )
}

export default App
