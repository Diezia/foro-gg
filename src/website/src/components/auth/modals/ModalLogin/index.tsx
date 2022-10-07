import React, { RefObject, SyntheticEvent, useContext, useEffect } from "react";
import LoginForm from "../../Login";
import "../../../../styles/components/_modals.scss";
import { Context } from "../../../main/App";

interface LoginType {
	login: RefObject<HTMLDialogElement>;
}

export function ModalLogin({ login }: LoginType) {
	const { state } = useContext(Context);
	useEffect(() => {
		if (state.token) {
			login.current!.close();
		}
	}, [state.token]);

	const handleDialogClick = (e: SyntheticEvent<EventTarget>) => {
		if (e.target === login.current) {
			login.current!.close();
		}
	};

	return (
		<dialog ref={login} id="dialog_login" onClick={handleDialogClick}>
			<div id="dialog_content">
				<h1>Iniciar sesión</h1>
				<LoginForm />
			</div>
		</dialog>
	);
}
