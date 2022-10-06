import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/_gameblock.scss";
import { Context, RefContext } from "../main/App";
import jwtDecode from "jwt-decode";

interface ITokenData {
	name: string;
	id: number;
}

interface GameBlockTypes {
	nameGame: string;
	imageSrc: string;
	gameUrl: string;
}

export function GameBlock({ imageSrc, gameUrl, nameGame }: GameBlockTypes) {
	const { register, login } = useContext(RefContext);
	const { state, dispatch } = useContext(Context);

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
