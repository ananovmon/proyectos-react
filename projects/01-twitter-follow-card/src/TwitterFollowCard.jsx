import {useState} from 'react'
export function TwitterFollowCard({formatUserName, userName, children}){

    const [isFollowing, setIsFollowing] = useState(false)

    //El mismo código que la línea de arriba

    //const state = useState(false)
    //const isFollowing = state[0]
    //const setIsFollowing = state[1]

    const text = isFollowing ? 'Siguiendo': 'Seguir'

    const buttonClassName = isFollowing
    ?'tw-followCard-button is-following'
    :'tw-followCard-button'

    //cuando se haga click en el botón el estado cambiará de true a false y viceversa
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
    <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img className='tw-followCard-avatar'
                alt="El avatar de un random"
                src={`https://unavatar.io/twitter/${userName}`} />

            <div className='tw-followCard-info'>
                <strong>{children}</strong>
                <span className='tw-followCard-infoUserName'>
                    {formatUserName(userName)}
                </span>
            </div>
        </header>
        <aside>
            <button className={buttonClassName} onClick={handleClick}> 
              <span className='tw-followCard-text'>{text}</span>
              <span className='tw-followCard-stopFollow'>Dejar de seguir</span> 
            </button>
        </aside>
    </article>
    )
}