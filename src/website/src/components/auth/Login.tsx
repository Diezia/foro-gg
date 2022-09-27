import React, { ChangeEvent, useState } from "react";
type Login = {
	username: string;
	password: string;
};

export default function LoginForm() {
	const [user, setLogin] = useState<Login>({
		username: "",
		password: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const selectedField = e.target.name;
		setLogin({
			...user,
			[selectedField]: value,
		});
	};

	return (
		<>
			<form className="login_form">
				<label>
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
					<button>Eres nuevo? Registrate!</button>
				</label>

				<label>
					{" "}
					<p>Olvidé mi contraseña</p>
				</label>
			</form>
		</>
	);
}
