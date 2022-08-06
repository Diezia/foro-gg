import React, { ChangeEvent, useState } from 'react';

type Login = {
    username: string,
    password: string,
}

const LoginForm = () => {
    const [user, setLogin] = useState<Login>({
        username: '',
        password: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const selectedField = e.target.name;
        setLogin({
            ...user,
            [selectedField]: value
        })
    } 

    return(
        <>
            <form>
                <label> <p>Username:</p>
                    <input value={user.username} onChange={handleChange} type="text" name="username" id="login_user"/>
                </label>
                <label> <p>Password:</p>
                    <input value={user.password} onChange={handleChange} type="password" name="password" id="login_password"/>
                </label>
                {user.password.length < 1 ? <p>The password is empty</p> : <label><input type="submit" value="Submit"/></label>}
            </form>
        </>
    )
}

export default LoginForm
