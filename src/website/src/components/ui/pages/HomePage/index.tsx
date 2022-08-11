import React from "react";
import { GameBlock } from "../../GameBlock";
import { games } from "../../../../helpers/gameBlocks";

export function HomePage() {
	return (
		<div>
			<h1>Seleccionar Juego</h1>
			<div className="grid-container">
				{games.map((game, i) => {
					return <GameBlock imageSrc={game.imageSrc} key={i} gameUrl={game.gameUrl} />;
				})}
			</div>
		</div>
	);
}

export default HomePage;
