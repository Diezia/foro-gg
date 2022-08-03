import React, { useRef } from 'react'
import { ModalRegister } from './ModalRegister'

export const Navbar = () => {
  const register = useRef<HTMLDialogElement>()
  const handleRegisterClick = () => { 
    register.current!.showModal()
  }
  return (
    <nav>
      <figure><img src="/assets/logo.png" alt="logo" width={100}/></figure>
      <input type="text" name="search_bar" id="search_bar" />
      <button id="register_button" onClick={handleRegisterClick}>Registrarse</button>
      <button id="login_button">Iniciar Sesión</button>
      <hr/>

      <ModalRegister register={register}/>
    </nav>
  )
}
