import './App.css'
import {TwitterFollowCard} from './TwitterFollowCard.jsx'

export function App() {

    //creación de la función formatUserName para pasarla como prop al componente ya creado

    const formatUserName = (userName) => `@${userName}`

    //Lo que viene a continuación es la parte que se renderiza

    //Para poder devolver más de un componente, debemos crear un <React.Fragment> para hacer un wrapped o lo
    //que es lo mismo, un <> vacío. En este caso tenemos un elemento section

    return (
        <section className="App">

        <TwitterFollowCard formatUserName={formatUserName} userName="ananovoam">
          Ana Novoa
        </TwitterFollowCard>

        <TwitterFollowCard formatUserName={formatUserName} userName="frankderground" name="Frankderground">
          Frankderground
        </TwitterFollowCard> 

        </section>
    )
}