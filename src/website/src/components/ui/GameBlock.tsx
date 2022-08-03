import React from 'react'
import { Link } from 'react-router-dom'

export const GameBlock = ({ imageSrc, gameUrl }: any) => {
  return (
    <div className='img'>
      <Link to={gameUrl}>
        <img src={imageSrc} alt="" />
      </Link>
      
    </div>
  )
}
