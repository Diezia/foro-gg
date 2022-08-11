import React, { ChangeEvent, useState } from "react";

type Register = {	
	user_name: string;
	email: string;
	password: string;
	repeatPassword?: string;
};

type Submit = {
	submit: boolean;
};

export default function RegisterForm() {
	const [user, setUsername] = useState<Register>({
		user_name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;		
		const selectedField = e.target.name;
		setUsername({
			...user,
			[selectedField]: value,
		});
	};
	return (
		<div>
			<form id="register_form">
				
				<label>
					{" "}
					Username:
					<input value={user.user_name} onChange={handleChange} type="text" name="user_name" id="register_form_user" required/>
				</label>
				<label>
					{" "}
					Email:
					<input value={user.email} onChange={handleChange} type="email" name="email" id="register_form_email" autoComplete="off" required/>
				</label>
				<label>
					{" "}
					Password:
					<input value={user.password} onChange={handleChange} type="password" name="password" id="register_form_password_1" className="register_form_password" required/>
				</label>
				<label>
					{" "}
					Password:
					<input value={user.repeatPassword} onChange={handleChange} type="password" name="repeatPassword" id="fregister_form_password_2" className="register_form_password" required/>
				</label>
				{user.password != user.repeatPassword ? (
					<p>Passowrds are not equal</p>
				) : user.password.length == 0 || user.repeatPassword.length == 0 ? (
					<p>The password is empty</p>
				) : (
					<label>
						<input type="submit" value="Submit" id="register_submit_button" />
					</label>
				)}
			</form>
		</div>
	);
}
