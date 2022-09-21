import React from "react";
import { Link } from "react-router-dom";
import '../../styles/components/_gameblock.scss'


interface GameBlockTypes {
	imageSrc: string;
	gameUrl: string;
}

export function GameBlock({ imageSrc, gameUrl }: GameBlockTypes) {
	return (
		<div className="grid-container__div-img">
			<Link to={gameUrl}>
				<img className="grid-container__img" src={imageSrc} alt="" />
			</Link>
		</div>
	);
}
