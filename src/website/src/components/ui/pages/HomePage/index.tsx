import React, { useEffect, useState } from "react";
import { GameBlock } from "../../GameBlock";

export function HomePage() {
	const [state, setState]: any = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			await fetch("http://localhost:8080/api/games")
				.then((res: Response) => res.json())
				.then(data => setState(data));
		};
		fetchData().catch(console.error);
	}, []);

	return (
		<div>
			<div className="bg-6">
				<div className="glitch" data-text="Selecciona tu juego!">
					Bienvenido al Foro!
				</div>
			</div>
			<div className="grid-container">
				{state.length > 0 && state.map((game: Storage, i: number) => <GameBlock imageSrc={game.image_url} key={i} gameUrl={game.id} nameGame={game.name} />)}
			</div>
		</div>
	);
}

export default HomePage;
