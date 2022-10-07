import React, { useState } from "react";
import { SyntheticEvent } from "react-draft-wysiwyg";
import { useForm } from "../../hooks/useForm";

export default function RegisterForm() {
	const [formState, handleInputChange] = useForm({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});
	const [isRegistered, setIsRegistered] = useState(false);

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify(formState),
		})
			.then(() => setIsRegistered(true))
			.catch(err => console.log(err));
	}

	return (
		<div>
			<form id="register_form">
				{isRegistered && (
					<p>
						Registro realizado con éxito! <br />
						Ya puedes iniciar sesión
					</p>
				)}
				<label>
					<input value={formState.name} onChange={handleInputChange} type="text" name="name" placeholder="Username" required />
				</label>
				<label>
					<input value={formState.email} onChange={handleInputChange} type="email" name="email" id="register_form_email" autoComplete="off" placeholder="Email" required />
				</label>
				<label>
					<input
						value={formState.password}
						onChange={handleInputChange}
						type="password"
						name="password"
						id="register_form_password_1"
						className="register_form_password"
						placeholder="Password"
						minLength={8}
						required
					/>
				</label>
				<label>
					<input
						value={formState.repeatPassword}
						onChange={handleInputChange}
						type="password"
						name="repeatPassword"
						id="fregister_form_password_2"
						className="register_form_password"
						minLength={8}
						required
						placeholder="Password"
					/>
				</label>
				{formState.password !== formState.repeatPassword && <p>Las contraseñas no coinciden!</p>}
				<label>
					<button
						value="Submit"
						id="register_submit_button"
						disabled={!formState.name || !formState.email || !formState.password || formState.password !== formState.repeatPassword}
						onClick={handleSubmit}
					>
						Registrar
					</button>
				</label>
			</form>
		</div>
	);
}
