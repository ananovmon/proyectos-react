export const saveGameToStorage = ({ board, turn }) => {
    //Guardamos la partida
     window.localStorage.setItem('board', JSON.stringify(board))
     window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {

    //Cuando reseteamos el juego tambien debemos resetear lo que hay guardado en localStorage
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

}