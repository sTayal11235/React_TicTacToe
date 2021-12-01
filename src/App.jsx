import React, {useState} from "react";
import Board from "./components/Board"
import Reset from './components/Reset'
import WinnerText from "./components/WinnerText";
import Xpoints from "./components/Xpoints";
import Opoints from "./components/Opoints"
import { calculateWinner }  from "./util"
import "./styles/root.scss"

const App = () => {
  
  const [ history, setHistory ] = useState([ { board : (Array(9).fill(null)), isXNext : true, winner : null, Xpoints : 0, Opoints : 0 } ])
  const [ currentMove, setCurrentMove ] = useState(0)
  const current = history[currentMove]

  console.log(history)

  const sqLeft = current.board.filter(ele => ele === null)
  const wintxt = (current.winner)?`${current.winner} Won!!! Congratulations`:(sqLeft.length)?((current.isXNext)?"X's Turn":"O's Turn"):"Game Over. It's a Tie"

  const squareValue = (pos) => {
    if(current.board[pos] !== null || current.winner !== null)  
      return
      setHistory((prev) => {
        const last = prev[prev.length - 1]

        const newBoard =  last.board.map((ele, ind) => {
              if(ind === pos){
                return (last.isXNext)?"X":"O"
              }
              return ele
          })

          let xP = last.Xpoints, oP = last.Opoints
          if(calculateWinner(newBoard) !== null){

            if(calculateWinner(newBoard) == "X")
              xP++
            else
              oP++

          }
          
          return prev.concat({ board : newBoard, isXNext : !last.isXNext, winner : calculateWinner(newBoard), Xpoints : xP, Opoints : oP })

      })

      setCurrentMove(prev => prev+1)
      
  }

  const resetBoard = () => {
    setHistory(prev => {
      const last = prev[prev.length -1]

      const newBoard = last.board.map((ele) => {
            return null
        })
      
      return prev.concat({board : newBoard, isXNext : last.isXNext, winner : null, Xpoints : last.Xpoints, Opoints : last.Opoints})
    })
    setCurrentMove(prev => prev+1)
}

 return ( 

  <div className= "app">
    <h1>Tic-Tac-Toe</h1>
    <div className = "res">
      <Board board={current.board} squareValue={squareValue} />
      <WinnerText value={wintxt}/>
      <Xpoints value={current.Xpoints}/>
      <Opoints value={current.Opoints}/>
      <Reset value={"Reset-Board"} onClick={() => resetBoard()}/>
    </div>
  </div>

  );
};

export default App