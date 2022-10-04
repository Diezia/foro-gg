import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";

export default function RegisterForm() {
	const [formState, handleInputChange, resetForm] = useForm({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});

	function handleSubmit(e: any) {
		e.preventDefault();
		fetch(`http://localhost:8080/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify(formState),
		})
			.then((res: any) => console.log(res))
			.catch(err => console.log(err));
	}

	return (
		<div>
			<form id="register_form">
				<label>
					{" "}
					<input value={formState.name} onChange={handleInputChange} type="text" name="name" placeholder="Username" required />
				</label>
				<label>
					{" "}
					<input value={formState.email} onChange={handleInputChange} type="email" name="email" id="register_form_email" autoComplete="off" placeholder="Email" required />
				</label>
				<label>
					{" "}
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
					{" "}
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
				{formState.password !== formState.repeatPassword && (
					<p>Las contraseñas no coinciden!</p>
				)}
				<label>
					<button value="Submit" id="register_submit_button" disabled={(formState.name && formState.email && formState.password && formState.password === formState.repeatPassword) ? false : true } onClick={handleSubmit}>
						Registrar
					</button>
				</label>
			</form>
		</div>
	);
}
