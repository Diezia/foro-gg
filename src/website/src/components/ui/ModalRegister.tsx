import React from 'react'

export const ModalRegister = ({register}: any) => {
  const first = (e: any) => {
    if( e.target === register.current) {
      register.current.close()
    }
  }
  return (
    <dialog ref={register} id="dialog_register" onClick={first} style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: '#0000008a',
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        width: "300px",
        height: "100px",
        backgroundColor: 'white',

      }}>
        <h1>dialog_register</h1>
        <button onClick={() => {register.current.close()}}>Close</button>
      </div>
    </dialog>
  )
}
