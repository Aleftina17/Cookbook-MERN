import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

const Auth = () => {
  return (
    <div className='auth'>
      <div className="container">
        <Login />
        <Register />
      </div>
    </div>
  )
}

export default Auth