import React from 'react'
import { GameBlock } from './GameBlock'
import { games } from '../../helpers/gameBlocks'

const Home = () => {
  return (
    <div id="container">
      {games.map(( game, i ) => {
        return <GameBlock
          imageSrc={game.imageSrc}
          key={i}
          gameUrl={game.gameUrl}
        />
      })}
    </div>
  )
}

export default Home