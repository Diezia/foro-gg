import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/_gameblock.scss";
import { RefContext } from "../main/App";

interface GameBlockTypes {
	nameGame: string;
	imageSrc: string;
	gameUrl: string;
}

export function GameBlock({ imageSrc, gameUrl, nameGame }: GameBlockTypes) {
	const { login } = useContext(RefContext);

	return (
		<>
			{localStorage.getItem("jwt") ? (
				<div className="grid-container__div-img">
					<Link to={`games/${gameUrl}`}>
						<img className="grid-container__img" src={imageSrc} alt={nameGame} />
					</Link>
				</div>
			) : (
				<div
					className="grid-container__div-img"
					onClick={() => {
						login.current.showModal();
					}}
				>
					<img className="grid-container__img" src={imageSrc} alt={nameGame} />
				</div>
			)}
		</>
	);
}
