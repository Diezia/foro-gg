import React, { RefObject, SyntheticEvent } from "react";
import Register from "../../Register";

import "../../../../styles/components/_modals.scss";

interface RegisterType {
	register: RefObject<HTMLDialogElement>;
}

export function ModalRegister({ register }: RegisterType) {
	const handleDialogClick = (e: SyntheticEvent<EventTarget>) => {
		if (e.target === register.current) {
			register.current!.close();
		}
	};
	return (
		<dialog ref={register} id="dialog_register" onClick={handleDialogClick}>
			<div id="dialog_content">
				<h1>Regristrate !</h1>
				<Register />
			</div>
		</dialog>
	);
}
