import "./GameOver.css"

const GameOver = ({restart, score, palavraEscolhida}) => {



  return (
    <div>
      
      <h3>fim de jogo</h3>
      <h2>
         Asua pontuação foi de: <span>{score}</span>
      </h2>
      <h2>
        Apalavra era = {palavraEscolhida}
      </h2>
     <button onClick={restart}>Restart the game</button>

    </div>
  )
}

export default GameOver