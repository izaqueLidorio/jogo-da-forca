import { useRef } from "react"
import { useState } from "react"
import "./Game.css"

const Game = ({
     verifyletter,
     palavraEscolhida,
     categoriaEscolhida,
     letters,
     letrasAdivinhadas,
     letrasErradas,
     guesses,
     score
    }) => {
        
      const [letter, setLetter] = useState("")
      const letterInputRef = useRef (null)  

      const handleSubmit = (e) => {          //seleciona o event 
         e.preventDefault()

         verifyletter(letter)                //seleciona a letra

         setLetter("")                         //limpa o form 
 
         letterInputRef.current.focus()       //foca nele novamente
      }




      
  return (
    <div className="game">

     <p className="points">
        <span>Pontuação:{score}</span>
     </p>

     <h1>Adivinhe a Palavra</h1>
     <h3 className="tip">
       Dica sobre a palavra <span>{categoriaEscolhida}</span>
     </h3>
     <p>Voce tem {guesses} tentativas</p>

    <div className="wordContainer">
                   
       {letters.map((letter, i) =>              // SE a letra for adivinhada ent ela sera emprimida SE N
        letrasAdivinhadas.includes(letter) ? (   // sera emprimido os quadrados brancos /blankSquare     
        <span key={i} className="letter">         
          {letter}
        </span>
       ) : (
        <span key={i} className="blankSquare"></span>
       ) 
       )}
      
    </div>
    
    <div className="letterContainer">
      <p>Tente adivinhar uma letra da palavra:</p>
      <form onSubmit={handleSubmit} >
        <input 
         type="text"
         name="letter"
         maxLength='1'
         required
         onChange={(e) => setLetter(e.target.value)}
         value={letter} 
         ref={letterInputRef}
         />
        <button>Jogar</button>
      </form>
    </div>

    <div className="wrongLettersContainer">
      <p>Letras ja utilizadas</p>
      {letrasErradas.map((letter,i) => (
        <span key={i}> {letter},</span>
      ))}
     
    </div>

        

    </div>
  )
}

export default Game