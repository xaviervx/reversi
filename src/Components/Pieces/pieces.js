import { Fragment } from 'react'
import './pieces.css'

function Pieces(props){
    const {
        piecePositionX,
        piecePositionY,
        value,
        valueOld,
        type,
        opacity,
        currentKey,
        lastKey
    } = props
    
    if(value !== null){
        if(value === 1){
            if (value === valueOld) {
                if (currentKey === lastKey) {
                    return (
                        <Fragment>
                            <div className={`put pieces black c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <div className={`pieces black c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        </Fragment>
                    )
                }
            } else {
                return (
                    <Fragment>
                        <div className={`pieces black flipBackBlack c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        <div className={`pieces white flipFrontBlack c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                    </Fragment>
                )
            }
        } 

        if(value === -1){
            if (value === valueOld) {
                if (currentKey === lastKey) {
                    return (
                        <Fragment>
                            <div className={`put pieces white c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <div className={`pieces white c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        </Fragment>
                    )
                }
            } else {
                return (
                    <Fragment>
                        <div className={`pieces white flipBackWhite c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                        <div className={`pieces black flipFrontWhite c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
                    </Fragment>
                )
            }
        } 

        if(value === 3){
            return (
                <div className={`pieces meio c${piecePositionX} r${piecePositionY} ${type} ${opacity}`}></div>
            )
        }
        
        return null
        
    } else {
        return null
    }
}

Pieces.defaultProps ={
    piecePositionX: 0,
    piecePositionY: 0,
    opacity: '',
    currentKey: '0-0',
    lastKey: '0-1'
}

export default Pieces