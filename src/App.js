import './App.css';

import { useCallback, useEffect, useState } from 'react'; 

//componente
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

// data
import {wordsList} from "./data/Words"


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]



function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [Words] = useState(wordsList)

  const [palavraEscolhida, setPalavraEscolhida] = useState("")
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
  const [letters, setLetters] = useState([])

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])   //letras adivinhadas
  const [letrasErradas, sertletrasErradas] = useState([])      //letras erradas
  const [palpites, setpalpites] = useState(3)                  //tentativas
  const [score, setScore] = useState(0)                      //recorde
  

  const palavraEscolhidaEcategoria = useCallback(  () => {
    // escolher uma categoria aleatoria
    const categories = Object.keys(Words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // escolher uma palavra aleatoria
    const word =
     Words[category][Math.floor(Math.random() * Words[category].length)]
    console.log(word)

    return{word, category}
  },[Words])
 


  // função que vai iniciar o state do jogo (start game)
  const startGame = useCallback( () => {                                    
    // limpar letras
    liparLetrasStates ()

   // função que vai sortear uma palavra e uma categoria 
   const {word, category} = palavraEscolhidaEcategoria()       
   
   let wordLetters = word.split("")                            // criando um array de letras
   wordLetters = wordLetters.map((i) => i.toLowerCase())       //aqui estou mapeando a let usando um metodo para deixar a primeira letra minuscula
   
   console.log ( word, category)
   console.log(wordLetters)

   //Prencher o state
   setPalavraEscolhida(word)
   setCategoriaEscolhida(category)
   setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[palavraEscolhidaEcategoria])

  
  // process the letter input (pegar a letra do input)
   const verifyletter = (letter) => {
    
    const normalizarLetra = letter.toLowerCase()

    //checar se a letra ja foi utilizada
    if(letrasAdivinhadas.includes(normalizarLetra)  ||//ou
      letrasErradas.includes(normalizarLetra) 
      ) {
        return
      }
    
      //colocar a letra ou remover a chance
    if(letters.includes(normalizarLetra)) {
      setLetrasAdivinhadas((actualLetrasAdivinhadas) => [         //colocar a letra certa na tela
        ...actualLetrasAdivinhadas,
        normalizarLetra,
      ])

                
    } 
    else {
      
        sertletrasErradas((actualletrasErradas) => [          //colocar a letra errada como ja utilizadas
          ...actualletrasErradas,
          normalizarLetra,
         ])
          setpalpites((actualpalpites) => actualpalpites -1)   // função q e diminui uma chance
    } 
   }

    const liparLetrasStates = () => {
      setLetrasAdivinhadas([])
      sertletrasErradas([])
    }
   
     //useeffect ira monitorar as tentativas e quando ela for = oi menor que zero ele mudara o state do game e da um reset
   useEffect(() => {           
    if(palpites <= 0) {

       liparLetrasStates()
    
       setGameStage(stages[2].name)
    }
   },[palpites])
  
   // restart the gamer , resetar o game
   const restart = () => {
    setScore(0)
    setpalpites(3)

    setGameStage(stages[0].name)
   }


   // checar condição de vitória
   useEffect(() => {
    const unicasLetras = [...new Set(letters)]

    // condição de vitoria
    if (letrasAdivinhadas.length === unicasLetras.length) {
       //set score // pontuação
       setScore((actualScore) => actualScore += 10)

       //restart do game e iserir nova palavra
       startGame()
       
    }
   }, [letrasAdivinhadas, letters, startGame])

 
  return (
    <div className="App">
     
       
          {gameStage ==='start' && <StartScreen startGame={startGame}/>}

          {gameStage ==='game' && <Game 
           verifyletter={verifyletter}
           palavraEscolhida={palavraEscolhida}
           categoriaEscolhida={categoriaEscolhida}
           letters={letters} 
           letrasAdivinhadas={letrasAdivinhadas}
           letrasErradas={letrasErradas}
           palpites={palpites}
           score={score}
           />}

            {gameStage ==='end' && <GameOver restart={restart} score={score}  palavraEscolhida={palavraEscolhida} />}

     
    </div>
  );
}

export default App;
