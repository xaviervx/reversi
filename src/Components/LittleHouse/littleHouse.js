import { Fragment } from 'react'
import './littleHouse.css'

function littleHouse(props) {
    const {
        currentHouse,
        putPiece,
        row,
        col,
        value,
        versus,
        currentPlayer
    } = props

    // console.log(value)
    if (currentHouse % 2 === 0) {
        if ((value === 0)) {
            if ((versus === 0) && (currentPlayer === -1)) {
                return (
                    <Fragment>
                        <div className="littleHouse clear"></div>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <div onClick={() => putPiece(`${row}`, `${col}`)} className="littleHouse clear valid"></div>
                    </Fragment>
                ) 
            }
        } else {
            return (
                <Fragment>
                    <div className="littleHouse clear"></div>
                </Fragment>
            )
        }
    } else {
        if ((value === 0)) {
            if ((versus === 0) && (currentPlayer === -1)) {
                return (
                    <Fragment>
                        <div className="littleHouse dark"></div>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <div onClick={() => putPiece(`${row}`, `${col}`)} className="littleHouse dark valid"></div>
                    </Fragment>
                )
            }
        } else {
            return (
                <Fragment>
                    <div className="littleHouse dark"></div>
                </Fragment>
            )
        }

    }

}

export default littleHouse