import React from 'react'
import LoginForm from './Login'

export const ModalLogin = ({login}: any) => {
  const first = (e: any) => {
    if( e.target === login.current) {
      login.current.close()
    }
  }
  return (
    <dialog ref={login} id="dialog_login" onClick={first}>
      <div id ="dialog_content">
        <h1>Inicio de sesión</h1>
        <LoginForm />
      </div>
    </dialog>
  )
}
