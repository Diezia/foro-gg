import React, { useRef } from "react";
import { ModalRegister } from "../../../auth/modals/ModalRegister";
import { ModalLogin } from "../../../auth/modals/ModalLogin";
import { Link } from "react-router-dom";
import SearchBar from "../../../auth/SearchBar";
import "../../../../styles/components/_navbar.scss";

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
			<div className="nav">
				<div className="logo">
					<a href="/">
						<img src="/assets/logo.png" alt="logo" id="logo" />
					</a>
				</div>
				<SearchBar />
				<div className="btn">
					<button className="register" onClick={handleRegisterClick}>
						Registrarse
					</button>
					<button className="login" onClick={handleLoginClick}>
						Iniciar Sesión
					</button>
					<Link to={"/create"}>
						<button>Crear post</button>
					</Link>
				</div>
			</div>

			<ModalRegister register={register} />
			<ModalLogin login={login} />
		</nav>
	);
}
