import React from 'react'
import Register from './Register'

export const ModalRegister = ({register}: any) => {
  const first = (e: any) => {
    if( e.target === register.current) {
      register.current.close()
    }
  }
  return (
    <dialog ref={register} id="dialog_register" onClick={first}>
      <div id ="dialog_content">
        <h1>Formulario de Registro</h1>
        <Register />
      </div>
    </dialog>
  )
}
