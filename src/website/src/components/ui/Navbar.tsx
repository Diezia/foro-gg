import React, { useRef } from 'react'
import { ModalRegister } from './ModalRegister'

export const Navbar = () => {
  const register = useRef<HTMLDialogElement>()
  const handleRegisterClick = () => { 
    register.current!.showModal()
  }
  return (
    <nav>
      <img src="/assets/logo.png" alt="logo" id="logo"/>
      <div className="wrap">
    <div className="search">
      <input type="text" className="searchTerm" id="input_text"></input>
      <button type="submit" className="searchButton">
       !
      </button>
    </div>
  </div>
  <div className='btn'>
      <button id="register_button" className='third' onClick={handleRegisterClick}>Registrarse</button>
      <button id="login_button" className='third'>Iniciar Sesión</button>
    </div>
      <hr/>

      <ModalRegister register={register}/>
    </nav>
  )
}
