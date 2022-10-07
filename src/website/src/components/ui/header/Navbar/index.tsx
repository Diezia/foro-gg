import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalRegister } from "../../../auth/modals/ModalRegister";
import { ModalLogin } from "../../../auth/modals/ModalLogin";
import jwt from "jwt-decode";

import SearchBar from "../../../auth/SearchBar";
import "../../../../styles/components/_navbar.scss";
import { Context, RefContext } from "../../../main/App";
import { types } from "../../../../helpers/types";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface ITokenData {
	name: string;
	id: number;
}

export function Navbar() {
	const { state, dispatch } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("jwt")) {
			const tokenDecoded: ITokenData = jwt(localStorage.getItem("jwt") as string);
			dispatch({
				type: types.setUserName,
				payload: tokenDecoded.name,
			});
		}
	}, []);

	/* const register = useRef<HTMLDialogElement>(null);
	const login = useRef<HTMLDialogElement>(null); */
	const { register, login } = useContext(RefContext);
	const navigate = useNavigate()

	const handleRegisterClick = () => {
		register.current!.showModal();
	};
	function handleLoginClick() {
		login && login.current!.showModal();
	}
	function handleLogoutClick() {
		localStorage.removeItem('jwt');
		console.log("handleLogoutClick");
		// handlear navbar state
		dispatch({type: types.logout})
		// navigate to home 
		navigate("/");
	}
	return (
		<nav>
			<div className="nav">
				<div className="logo">
					<Link to="/">
						<img src="/assets/logo.png" alt="logo" id="logo" />
					</Link>
				</div>
				{/* <SearchBar /> */}
				<div className="btn">
					{!state.user ? (
						<>
							<button className="register" onClick={handleRegisterClick}>
								Registrarse
							</button>
							<button className="login" onClick={handleLoginClick}>
								Iniciar Sesión
							</button>
						</>
					) : (
						<>
							<Link to={"/create"}>
								<button>Crear post</button>
							</Link>
							<p>{state.user}</p>
							<button className="logout" onClick={handleLogoutClick}>
								Cerrar Sesión
							</button>
						</>
					)}
				</div>
			</div>

			<ModalRegister register={register} />
			<ModalLogin login={login} />
		</nav>
	);
}
