import { useState , useRef } from 'react'
import { languages } from './languages';
import {words} from './words';
import GameStatus from './gameStatus';
/*
TODO:
no messages appears when the user guesses everything correctly on first try
add a try again button
add a confetti when the user gets it all correct
upload project on github
*/

export default function AssemblyEndGame() {
  
  // const [word , setWord] = useState('react')
  const [word , setWord] = useState(()=>words[ Math.floor( Math.random() * words.length )])
  const [guesses, setGuesses] = useState([])
  const [wrongGuesses, setWrongGuesses]= useState(0)
  const numOfGuesses = guesses.length
  const isLost = wrongGuesses>8 

  let isWon = !isLost
  if (guesses.length ===0){
    isWon= false
  }
  word.split("").forEach((letter)=>{
    if(!guesses.includes(letter)){
      isWon= false
    }
  })

  console.log(isWon)
  
  
  const languagesElements= languages.map((lang, index)=>{
    let statusClass =""

    if(index <wrongGuesses){
      statusClass="dead"
      console.log(lang)
    }

    return <div key={index} style={lang} className={`language ${statusClass}`} >{lang.name}</div>
  })
  
  const currentGuessed = word.split("").map( (letter ,index)=>{

    if(isLost){
      return <div key={index} className={`letter ${guesses.includes(letter) ? "" : "wrong" }`}>
      {letter}
    </div>
    }

    return <div key={index} className='letter'>
      {guesses.includes(letter) ? letter : ""}
    </div>
  })

 

  const keyboard = 'qwertyuiopasdfghjklzxcvbnm'.split('').map((key,index) =>{
    
    let statusClass = ""
    if (guesses.includes(key)){
      if (word.includes(key)) {
        statusClass = "correct"
      }else{
        statusClass = "wrong"
      }
    }


    return <button disabled={isLost || isWon} key = {index} className={`key ${statusClass}`} onClick={()=>addGuess(key)}>
       {key}
       </button>
  })

  function addGuess(key) {
    if(guesses.includes(key)){
      return
    }
    setGuesses(prev => [...prev, key])

    word.includes(key)  ? null : setWrongGuesses(prev=> prev+1)
    
  }




  return (
      <main>
          <header>
            <h1>
              Assembly: Endgame
            </h1>
            <p>
              Guess the word in under 8 attempts to keep the <br />
              programming world safe from Assembly!
            </p>

          </header>

          <GameStatus wrongGuesses = {wrongGuesses} isLost={isLost} isWon = {isWon} />

          <section className='languages'>
            {languagesElements}
          </section>


          <section className='word'>
             {currentGuessed}
          </section>

          <section className='keyboard'>
             {keyboard}
          </section>


      </main>
  )
}
