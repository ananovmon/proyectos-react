import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    console.log('Projecto 3')
  })

  return (
    <>

      <h3>Proyecto 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

export default App
