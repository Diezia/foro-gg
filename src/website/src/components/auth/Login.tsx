import React, { useContext, useState } from "react";
import { SyntheticEvent } from "react";
import { types } from "../../helpers/types";
import { useForm } from "../../hooks/useForm";
import { Context } from "../main/App";

export default function LoginForm() {
	const [wrongInformation, setWrongInformation] = useState(false);
	const { dispatch } = useContext(Context);
	const [formState, handleInputChange] = useForm({
		email: "",
		password: "",
	});
	const { email, password } = formState;
	function handleLocalInputChange(e: SyntheticEvent) {
		handleInputChange(e);
		setWrongInformation(false)
	}
	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res: Response) => res.json())
			.then((data: Storage) => {
				dispatch({
					type: types.setNewToken,
					payload: data,
				});
				localStorage.setItem("jwt", data.token);
			})
			.catch(() => setWrongInformation(true));
	}

	return (
		<>
			<div>
				<form className="login_form">
					<label>
						<input value={email} onChange={handleLocalInputChange} type="email" name="email" id="login_user" placeholder="Email" required />
					</label>
					<label>
						<input value={password} onChange={handleLocalInputChange} type="password" name="password" id="login_password" placeholder="Contraseña" required />
					</label>
					<button value="Submit" disabled={!email || !password} onClick={handleSubmit}>
						Ingresar
					</button>
				</form>
				{wrongInformation ? <p>Email o contraseña incorrecta.</p> : <p></p>}
			</div>
		</>
	);
}
