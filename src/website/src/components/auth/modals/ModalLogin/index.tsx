import React, { RefObject, SyntheticEvent } from "react";
import LoginForm from "../../Login";
import "../../../../styles/components/_modals.scss"

interface LoginType {
	login: RefObject<HTMLDialogElement>
}

export function ModalLogin({ login }: LoginType) {
	const handleDialogClick = (e: SyntheticEvent<EventTarget>) => {
		if (e.target === login.current) {
			login.current!.close();
		}
	};
	return (
		<dialog ref={login} id="dialog_login" onClick={handleDialogClick}>
			<div id="dialog_content">
				<h1>Inicio de sesión</h1>
				<LoginForm />
			</div>
		</dialog>
	);
}
