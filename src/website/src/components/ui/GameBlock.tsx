import React from 'react'
import { Link } from 'react-router-dom'

export const GameBlock = ({ imageSrc, gameUrl }: any) => {
  return (
    <div className="grid-container__div-img">
      <Link to={gameUrl}>
        <img className="grid-container__img" src={imageSrc} alt="" />
      </Link>
      
    </div>
  )
}
