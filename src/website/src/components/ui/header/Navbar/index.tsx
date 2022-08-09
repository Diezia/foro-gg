import React, { useRef } from "react";
import { ModalRegister } from "../../../auth/modals/ModalRegister";
import { ModalLogin } from "../../../auth/modals/ModalLogin";
import { Link } from "react-router-dom";

export function Navbar() {
	const register = useRef<HTMLDialogElement>(null);
	const login = useRef<HTMLDialogElement>(null);
	const handleRegisterClick = () => {

		register.current!.showModal();
	};
	const handleLoginClick = () => {
		login && login.current!.showModal();
	};
	return (
		<nav>
			<Link to="/">
				<img src="/assets/logo.png" alt="logo" id="logo" />
			</Link>
			<div className="wrap">
				<div className="search">
					<input type="text" className="searchTerm" id="input_text"></input>
					<button type="submit" className="searchButton">
						!
					</button>
				</div>
			</div>
			<div className="btn">
				<button id="register_button" className="third" onClick={handleRegisterClick}>
					Registrarse
				</button>
				<button id="login_button" className="third" onClick={handleLoginClick}>
					Iniciar Sesión
				</button>
			</div>
			<hr />

			<ModalRegister register={register} />
			<ModalLogin login={login} />
		</nav>
	);
}
