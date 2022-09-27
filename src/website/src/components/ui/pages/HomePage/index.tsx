import React, { useEffect } from "react";
import { GameBlock } from "../../GameBlock";
import { games } from "../../../../helpers/gameBlocks";

export function HomePage() {
	// Ejemplo de como obtener data de la api 
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch("http://localhost:8080/countposts")
			.then((res: any) => res.json())
			.then(data => console.log(data));
		};
		fetchData()
			.catch(console.error);
	}, []);
	// fin Ejemplo de como obtener data de la api 

	return (
		<div>
			<div className="bg-6">
				<div className="glitch" data-text="Selecciona tu juego!">
					Bienvenido al Foro!
				</div>
			</div>
			<div className="grid-container">
				{games.map((game, i) => {
					return <GameBlock imageSrc={game.imageSrc} key={i} gameUrl={game.gameUrl} nameGame={game.nameGame} />;
				})}
			</div>
		</div>
	);
}

export default HomePage;
