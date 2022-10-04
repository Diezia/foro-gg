import React, { ChangeEvent, useContext, useState } from "react";
import { types } from "../../helpers/types";
import { Context } from "../main/App";
import ForgottenPassword from "./ForgottenPassword";
type Login = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const {state, dispatch} = useContext(Context);

	const [user, setLogin] = useState<Login>({
		email: "",
		password: "",
	});

	const [forgotPassword, setForgotPassword] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const selectedField = e.target.name;
		setLogin({
			...user,
			[selectedField]: value,
		});
	};
	/* ESTADO PARA COMPONENTE FORGOTTENPASSWORD*/
	const handleChangePassword = () => {
		if (forgotPassword == true) {
			setForgotPassword(false);

		} else {
			setForgotPassword(true)
		}
	}
	/* TERMINA ACA EL HANDELING DEL COMPONENTE FORGOTTENPASSWORD */
	function handleSubmit(e:any) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({
				email: user.email,
				password: user.password
			})
		})
		.then((res: any) => res.json())
		.then((data:any) => dispatch({
			type: types.setNewToken,
			payload: data
		}))
		.catch((err) => console.log(err))
	}
	function randTest(e:any) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/example`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': state.token
			},
			mode: 'cors'
		})
		.then((res: any) => res.json())
		.then((data:any) => console.log(data))
		.catch((err) => console.log(err))
	}
	return (
		<>
			<div> { forgotPassword == false ? <form className="login_form"><label>
						{" "}
						<input value={user.email} onChange={handleChange} type="email" name="email" id="login_user" placeholder="email" required />
					</label>
					<label>
						{" "}
						<input value={user.password} onChange={handleChange} type="password" name="password" id="login_password" placeholder="Password" required />
					</label>
					{user.password.length < 1 ? (
						<p>Ingresa tu usuario y contraseña</p>
					) : (
						<label>
							<button value="Submit" onClick={handleSubmit}>

								Ingresar
							</button>
							<button onClick={randTest}>borrar after test</button>
						</label>
					)}
					<label>
						{" "}
						<div>
							<label>
							{" "}
							<button onClick={handleChangePassword}>¿Olvidaste tu contraseña?</button>
							</label>
						</div>
					</label> </form> : <form className="login_form">
						<ForgottenPassword /> 
						<div>
							<label>
								{" "}
								<button onClick={handleChangePassword}>¿Te acordaste de tu contraseña?</button>
							</label>
						</div>
						</form>
							}
				</div>
				
			
		</>
	);
}
