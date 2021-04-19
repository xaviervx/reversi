import './modalChoice.css'

function ModalChoice(props) {
    const {
        choice
    } = props
    return (
        <div className="modalBodyChoice">
            <div className="modalHeadChoice">
                Tipo de jogo
            </div>
            <div className="choice">
                <div className="btnChoice" onClick={() => choice(1)}>Player VS Player</div>
                <div className="btnChoice" onClick={() => choice(0)}>Player VS PC</div>
            </div>
        </div>
    )
}

export default ModalChoice