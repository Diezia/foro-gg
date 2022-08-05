import React from 'react'
import { GameBlock } from './GameBlock'
import { games } from '../../helpers/gameBlocks'



const HomePage = () => {
  return (
    <div>
    <div className="grid-container">
      {games.map(( game, i ) => {
        return <GameBlock
          imageSrc={game.imageSrc}
          key={i}
          gameUrl={game.gameUrl}
        />
      })}
    </div>

    
</div>
    
  )
}

export default HomePage