import React from 'react';

export default function ForgottenPassword() {
    return(
        <div>
            <input type="text" placeholder="Ingrese su usuario" name="" id="" />
            <input type="password" placeholder= "Ingrese la nueva contraseña" name="" id="" minLength={8}/>
            <input type="password" placeholder= "Confirme la nueva contraseña" name="" id="" minLength={8}/>
            <input type="submit" value="Submit nueva contraseña" />
        </div>
    )
}
