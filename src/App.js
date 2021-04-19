import React, { useState, useEffect } from 'react'
import './App.css';
import Board from './Components/Board/board.js';
import Scoreboard from './Components/Scoreboard/scoreboard'
import ModalWinner from './Components/Modal/ModalWinner/modalWinner'
import ModalChoice from './Components/Modal/ModalChoice/modalChoice'
import { forEach, split, parseInt } from 'lodash'

function getInitialValuesBoard() {
  const matrixInitial = {}
  for (let c = 0; c < 8; c++) {
    for (let r = 0; r < 8; r++) {
      matrixInitial[`${c}-${r}`] = null
    }
  }
  // Definindo as peças iniciais
  // -1 é peça branca
  matrixInitial['4-3'] = 1
  matrixInitial['3-4'] = 1
  // 1 é peça preta
  matrixInitial['4-4'] = -1
  matrixInitial['3-3'] = -1
  // Setando as primeiras casas com jogada válida
  matrixInitial['3-2'] = 0
  matrixInitial['2-3'] = 0
  matrixInitial['5-4'] = 0
  matrixInitial['4-5'] = 0

  return matrixInitial
}

function App() {
  const [matrixBoard, setMatrizBoard] = useState(getInitialValuesBoard)
  const [matrizBoardOld, setMatrizBoardOld] = useState(getInitialValuesBoard)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [pointsBlackPiece, setPointsBlackPiece] = useState(2)
  const [pointsWhitePiece, setPointsWhitePiece] = useState(2)
  const [winner, setWinner] = useState(null)
  const [tie, setTie] = useState(false)
  // Se o versus for 1 é player vs player se for 0 é vs PC
  const [versus, setVersus] = useState(null)
  const [pass, setPass] = useState(false)
  const [lastKey, setLastKey] = useState(null)

  function choice(choice) {
    setVersus(choice)
  }

  useEffect(() => {
    setWinner(getWinner())
    setPass(checkValidPlayPass())
    if ((currentPlayer === -1) && (versus === 0)) {
      if (!(pointsBlackPiece + pointsWhitePiece) === 64) {}
        playPc()
      }
  }, [currentPlayer])

  function playPc() {
    if (checkValidPlayPass()) {
       alert('Estou sem jogadas então passei a vez')
       passPlay()
    } else {
      setTimeout(function() {
        let count = 0
        forEach(matrixBoard, (value, key) => {
          if (value === 0) {
            count++
          }
        }) 
        const stop = getRandomNumber(1, count)
        count = 0
        forEach(matrixBoard, (value, key) => {
          if (value === 0) {
            count++
            if (count === stop) {
              let arrayKey = split(key, '-')
              let col = parseInt(arrayKey[0])
              let row = parseInt(arrayKey[1])
              putPiece(col, row)
            }
          }
        })
      }, 1200) 
    }
  }

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  // Função chamada para setar o numero da matriz de acordo com o player atual
  function putPiece(col, row) {
    setLastKey(`${col}-${row}`)
    matrixBoard[`${col}-${row}`] = currentPlayer
    forEach(matrixBoard, (value, key) => {
      matrizBoardOld[key] = matrixBoard[key]
      return true
    }) 
    // Aqui vai ir a função que faz as peças mudarem de cor
    changePieces(col, row)
    getPoints()
    let newCurrentPlayer
    if (currentPlayer === 1) { newCurrentPlayer = -1 } else { newCurrentPlayer = 1 }
    checkValidPlay(newCurrentPlayer)
    setCurrentPlayer(currentPlayer * -1)
  }

  function passPlay() {
    setCurrentPlayer(currentPlayer * -1)
    checkValidPlay(currentPlayer * -1)
  }

  function changePieces(col, row) {
    const keyCurrent = `${col}-${row}`
    upChange(keyCurrent)
    upRigthChange(keyCurrent)
    rigthChange(keyCurrent)
    rigthDownChange(keyCurrent)
    downChange(keyCurrent)
    downLeftChange(keyCurrent)
    leftChange(keyCurrent)
    leftUpChange(keyCurrent)
  }

  function upChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col}-${row + 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((row + 1) > 7)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (upChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function upRigthChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row + 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((row + 1) > 7) || ((col + 1) > 7)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (upRigthChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function rigthChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((col + 1) > 7)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (rigthChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function rigthDownChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row - 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((col + 1) > 7) || ((row - 1) < 0)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (rigthDownChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function downChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col}-${row - 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((row - 1) < 0)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (downChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function downLeftChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row - 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((row - 1) < 0) || ((col - 1) < 0)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (downLeftChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function leftChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((col - 1) < 0)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true;
      } else {
        if (leftChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function leftUpChange(key) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row + 1}`

    if ((matrixBoard[newKey] === null) || (matrixBoard[newKey] === 0) || ((col - 1) < 0) || ((row + 1) > 7)) {
      return false
    } else {
      if (matrixBoard[newKey] === currentPlayer) {
        return true
      } else {
        if (leftUpChange(newKey)) {
          matrixBoard[newKey] = currentPlayer
          return true
        } else {
          return false
        }
      }
    }
  }

  function getPoints() {
    let counterBlack = 0
    let counterWhite = 0
    forEach(matrixBoard, (value, key) => {
      if (value === 1) counterBlack++
      if (value === -1) counterWhite++
    })
    setPointsBlackPiece(counterBlack)
    setPointsWhitePiece(counterWhite)
    return `${counterBlack}-${counterWhite}`
  }

  function checkValidPlay(newCurrentPlayer) {
    forEach(matrixBoard, (value, key) => {
      if (value === 0) matrixBoard[key] = null
    })

    forEach(matrixBoard, (value, key) => {
      if (value === newCurrentPlayer) {
        upCheck(key, 0, newCurrentPlayer)
        upRigthCheck(key, 0, newCurrentPlayer)
        rigthCheck(key, 0, newCurrentPlayer)
        rigthDownCheck(key, 0, newCurrentPlayer)
        downCheck(key, 0, newCurrentPlayer)
        downLeftCheck(key, 0, newCurrentPlayer)
        leftCheck(key, 0, newCurrentPlayer)
        leftUpCheck(key, 0, newCurrentPlayer)
      }
    })
  }

  function upCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col}-${row + 1}`

    if ((row + 1) > 7) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      upCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
        // console.log('aaaaa')
      }
      return true
    }
    return true
  }

  function upRigthCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row + 1}`

    if (((row + 1) > 7) || ((col + 1) > 7)) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      upRigthCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function rigthCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row}`

    if ((col + 1) > 7) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      rigthCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function rigthDownCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col + 1}-${row - 1}`

    if (((col + 1) > 7) || ((row - 1) < 0)) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      rigthDownCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function downCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col}-${row - 1}`

    if ((row - 1) < 0) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      downCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function downLeftCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row - 1}`

    if (((row - 1) < 0) || ((col - 1) < 0)) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      downLeftCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function leftCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row}`

    if ((col - 1) < 0) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      leftCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function leftUpCheck(key, count, newCurrentPlayer) {
    let arrayKey = split(key, '-')
    let col = parseInt(arrayKey[0])
    let row = parseInt(arrayKey[1])
    let newKey = `${col - 1}-${row + 1}`

    if (((col - 1) < 0) || ((row + 1) > 7)) return false

    if (matrixBoard[newKey] === (newCurrentPlayer * -1)) {
      leftUpCheck(newKey, (count + 1), newCurrentPlayer)
    } else {
      if (count > 0 && matrixBoard[newKey] == null) {
        matrixBoard[newKey] = 0
      }
      return true
    }
    return true
  }

  function checkValidPlayPass() {
    let count = 0
    forEach(matrixBoard, (value) => {
      if (value === 0) {
        count++
      }
    })
    if (count > 0) {
      return false
    } else {
      return true
    }
  }

  function restart() {
    setMatrizBoard(getInitialValuesBoard)
    setMatrizBoardOld(getInitialValuesBoard)
    setWinner(null)
    setCurrentPlayer(1)
    setPointsBlackPiece(2)
    setPointsWhitePiece(2)
    setTie(false)
    setPass(false)
    setVersus(null)
    setLastKey(null)
  }

  function tieCheck() {
    if (pointsBlackPiece === pointsWhitePiece) {
      return true
    }
  }

  function getWinner() {
    if ((pointsBlackPiece + pointsWhitePiece) === 64) {
      if (tieCheck()) {
        setTie(true)
      }
      if (pointsBlackPiece > pointsWhitePiece) {
        return 1
      } else {
        return -1
      }
    }
    return null
  }

  return (
    <div className="app">
      <Scoreboard value={-1} player={2} points={pointsWhitePiece} currentPlayer={currentPlayer} />
      <Board
        matrixBoard={matrixBoard}
        matrizBoardOld={matrizBoardOld}
        putPiece={putPiece}
        versus={versus}
        currentPlayer={currentPlayer}
        lastKey={lastKey}
      />
      <Scoreboard value={1} player={1} points={pointsBlackPiece} currentPlayer={currentPlayer} restart={restart} passPlay={passPlay} />
      <div className={`modalOverlay ${winner || tie ? '' : 'displayNoneModal'}`}></div>
        <div className={`contentModal ${winner || tie ? '' : 'displayNoneModal'}`}>
          <ModalWinner restart={restart} winner={winner} tie={tie} versus={versus}/>
        </div>
      <div className={`modalOverlay ${versus === null ? '' : 'displayNoneModal'}`}></div>
        <div className={`contentModal ${versus === null ? '' : 'displayNoneModal'}`}>
          <ModalChoice choice={choice}/>
        </div>
    </div>
  )
}

export default App;