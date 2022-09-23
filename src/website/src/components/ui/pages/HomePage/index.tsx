import React from "react";
import { GameBlock } from "../../GameBlock";
import { games } from "../../../../helpers/gameBlocks";

export function HomePage() {
	return (
		<div>
			<div className="bg-6">
				<div className="glitch" data-text="Selecciona tu juego!">
					Bienvenido al Foro!
				</div>
			</div>
			<div className="grid-container">
				{games.map((game, i) => {
					return <GameBlock imageSrc={game.imageSrc} key={i} gameUrl={game.gameUrl} nameGame={game.nameGame}  />;
				})}
			</div>
		</div>
	);
}

export default HomePage;
