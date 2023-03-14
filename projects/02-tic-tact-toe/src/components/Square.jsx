export const Square = ({ children, isSelected, updateBoard, index }) => {

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