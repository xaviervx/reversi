import Pieces from '../Pieces/pieces'
import './scoreboard.css'

function Scoreboard(props){
    const {
        value,
        player,
        points,
        currentPlayer,
        restart,
        passPlay
    } = props

    let active = ''
    
    if(value === currentPlayer){
        active = 'active'
    } else {
        active = 'disabled'
    }
    
    return (
        <div className="scoreboardBody">
            <div className={`display ${value === 1 ? 'textBlack' : 'textWhite'}`}>
                <Pieces value={value} valueOld={value} type='little' opacity={active}/>
                <span className="namePlayer">Jogador {player}</span>
                <span className="points">N° peças: {points}</span>
                <div className={`btnRestart ${value !== 1 ? 'displayNone' : ''}`} onClick={() => restart()}>Reiniciar</div>
                <div className={`btnPass ${value !== 1 ? 'displayNone' : ''}`} onClick={() => passPlay()}>Passar vez</div> 
            </div>
        </div>
    )
}

export default Scoreboard