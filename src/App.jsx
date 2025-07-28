import Die from './Die.jsx'
import React from "react"
import Confetti from 'react-confetti'
function App() {
  const [dice ,setDice] =React.useState([])
  let gameWon=false
  if (
        dice.every(die => die.isHeld) && 
        dice.every(die => die.value === dice[0].value)
    ) {
        gameWon=true
    }
  function generateAllNewDice(){
    const data=[]
    for(let i=1; i<=10;i++){
      data.push({value:Math.floor(Math.random()*6)+1 , isHeld:false})
    }
    return data
  }
  
  

  React.useEffect(()=>{setDice(generateAllNewDice())},[]);
  function hold(id){
    setDice((prevDie)=>{
      return prevDie.map((die,index)=>{
        if(id==index){
          return({
            ...die,
            isHeld:!die.isHeld
          })
        }
        else{
          return{
           ...die
          }
        }
      })
    })
  }
    // const newNumbers=dice.map((die,index)=>{
    //   if(id==index){
    //       return (
    //         {
    //           ...box,
    //           isHeld:!box.isHeld
    //         }
    //       )
    //   }
    //   else{
    //     return box
    //   }

    // })
    // setDice(newNumbers)
    
  
  const numbers= dice.map((dieObj,index)=>{
    return <Die  key={index} value={dieObj.value} isHeld={dieObj.isHeld} hold={()=>hold(index)}/>
  }
)

function rollDice(){
  gameWon?
  setDice((prevDie)=>{
    return (
      prevDie.map((box)=>{
        return({
          value:Math.floor(Math.random()*6)+1,
          isHeld:false
        })
      })
    )
  })
  :setDice((prevDie)=>{
    return (
      prevDie.map((box)=>{
      if(box.isHeld===false){
        return ({
          ...box,
          value:Math.floor(Math.random()*6)+1
        })
      }
      else{
        return box
      }
    }))
  })
}
  return(
    <main>
      {gameWon&&<Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {numbers}
      </div>
        <button onClick={rollDice} className="roll-dice">{gameWon?"New Game":"Roll Dice"}</button>
    </main>
  )
}

export default App
