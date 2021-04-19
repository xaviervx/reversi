import Pieces from '../../Pieces/pieces'
import './modalWinner.css'

function ModalWinner(props) {
    const {
        restart,
        winner, 
        tie,
        versus
    } = props
    return (
        <div className="modalBody">
            <div className="modalHead">
                {tie ? 'Empate' : (versus === 0) && (winner === -1) ? 'Que pena você perdeu' : 'Parabéns'}
            </div>
            <div className="playerWinner">
                {tie ? 'Houve um empate entre os jogadores' : winner === 1 ? 'Jogador 1 Venceu' : 'Jogador 2 Venceu'}
                <div className="divPiece">
                    {tie ?
                        <Pieces value={3} valueOld={3} type='normal meio'/>
                    : 
                        <Pieces value={winner} valueOld={winner} type='normal'/>
                    }
                    
                </div>
            </div>
            <div className="divButton">
                <div className="btnRestartModal" onClick={() => restart()}>Reiniciar</div>
            </div>
        </div>
    )
}

export default ModalWinner