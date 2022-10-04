import React, { ChangeEvent, useContext, useState } from "react";
import { types } from "../../helpers/types";
import { useForm } from "../../hooks/useForm";
import { Context } from "../main/App";
type Login = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const { state, dispatch } = useContext(Context);
	const [formState, handleInputChange, resetForm] = useForm({
		email: "",
		password: "",
	});
	const { email, password } = formState;

	function handleSubmit(e: any) {
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
			.then((res: any) => res.json())
			.then((data: any) =>
				dispatch({
					type: types.setNewToken,
					payload: data,
				})
			)
			.catch(err => console.log(err));
	}
	function randTest(e: any) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/example`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: state.token,
			},
			mode: "cors",
		})
			.then((res: any) => res.json())
			.then((data: any) => console.log(data))
			.catch(err => console.log(err));
	}
	return (
		<>
			<div>
				<form className="login_form">
					<label>
						<input value={email} onChange={handleInputChange} type="email" name="email" id="login_user" placeholder="email" required />
					</label>
					<label>
						<input value={password} onChange={handleInputChange} type="password" name="password" id="login_password" placeholder="Password" required />
					</label>

					<button value="Submit" disabled={(email && password ) ? false : true } onClick={handleSubmit}>
						Ingresar
					</button>
					<button onClick={randTest}>some</button>
				</form>
			</div>
		</>
	);
}
