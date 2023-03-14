 import { WINNER_COMBOS } from "../constants"
 
 //Función para comprobar si hay ganador pasándole un tablero concreto. Devuelve el ganador (x u o) o null
  export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo

      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c])
        {
          return boardToCheck[a]
        } 
    }

    //Si no tenemos ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    //revisamos si ha terminado el juego cuando todos los cuadrados del tablero son diferente a null
     return newBoard.every((square) => square !== null)
  }
