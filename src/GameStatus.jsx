import { getFarewellText } from './utils';
import { languages } from './languages';
import {useEffect, useState} from 'react';

export default function GameStatus({wrongGuesses, isLost , isWon}){

    if(wrongGuesses < 1){
        return null
    }
    const [fareWellText , setFareWellText] = useState(getFarewellText(languages[wrongGuesses -1].name))
    
    useEffect(()=>{
      setFareWellText(getFarewellText(languages[wrongGuesses -1].name))
    }, [wrongGuesses])

   


    return <section className={`gameStatus ${ isWon ? "won" : isLost ? "lost" : ""}`}>
    { isWon ? 
    <>
      <h1>You win!</h1> 
      <p>   Well done! 🎉</p>
    </>
     : isLost ? 
      <>
        <h1>Game over!</h1> 
        <p> You lose! Better start learning Assembly 😭</p>
      </>
    :  
      <h1>{fareWellText}</h1>
    }
  </section>

}