import React, { ChangeEvent, useState } from "react";
import ForgottenPassword from "./ForgottenPassword";
type Login = {
	username: string;
	password: string;
};

export default function LoginForm() {
	const [user, setLogin] = useState<Login>({
		username: "",
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
	return (
		<>
			<div> { forgotPassword == false ? <form className="login_form"><label>
						{" "}
						<input value={user.username} onChange={handleChange} type="text" name="username" id="login_user" placeholder="Username" required />
					</label>
					<label>
						{" "}
						<input value={user.password} onChange={handleChange} type="password" name="password" id="login_password" placeholder="Password" required />
					</label>
					{user.password.length < 1 ? (
						<p>Ingresa tu usuario y contraseña</p>
					) : (
						<label>
							<button type="submit" value="Submit">
								Ingresar
							</button>
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
						</form>}
				</div>
				
			
		</>
	);
}
