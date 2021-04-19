// import { Fragment } from 'react'
import LittleHouse from '../LittleHouse/littleHouse'
// import { split, size } from 'lodash'
import Pieces from '../Pieces/pieces'
import './board.css'

const verticalAxis = ['0', '1', '2', '3', '4', '5', '6', '7']
const horizontalAxis = ['0', '1', '2', '3', '4', '5', '6', '7']

function Board(props) {
    const { 
        matrixBoard,
        matrizBoardOld,
        putPiece, 
        versus, 
        currentPlayer,
        lastKey
    } = props

    let board = []
    let piecesPositions = []

    for (let j = verticalAxis.length -1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const currentHouse = j + i + 2
            board.push(
                <LittleHouse 
                    key={`${i+10},${j+10}`} 
                    currentHouse={currentHouse} 
                    putPiece={putPiece} 
                    row={i} 
                    col={j} 
                    value={matrixBoard[`${i}-${j}`]} 
                    type='normal'
                    versus={versus}
                    currentPlayer={currentPlayer}
                />
            )
            
            piecesPositions.push(
                <Pieces 
                    key={`${i}-${j}`}
                    currentKey={`${i}-${j}`}
                    lastKey={lastKey}
                    piecePositionX={i} 
                    piecePositionY={j} 
                    value={matrixBoard[`${i}-${j}`]}
                    valueOld={matrizBoardOld[`${i}-${j}`]}
                    type='normal'
                />
            )
        }
    }
    
    return (
        <div className="board">
            {board}
            {piecesPositions}
        </div> 
    )
}

export default Board