import React, { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

const Auth = () => {
  const [activeForm, setActiveForm] = useState('login')

  const handleSwitcherClick = (form) => {
    setActiveForm(form)
  }

  return (
    <div className='auth'>
      <div className="container">
        <div className="auth_switcher">
          <button 
          className={`auth_switcher__item ${activeForm === 'login' ? 'active' : ''}`} 
          id='loginSwitcher'
          onClick={() => {handleSwitcherClick('login')}}
          >Login</button>
          <button 
          className={`auth_switcher__item ${activeForm === 'register' ? 'active' : ''}`} 
          id='registerSwitcher'
          onClick={() => handleSwitcherClick('register')}
          >Register</button>
        </div>
        {activeForm === 'login' && <Login />}
        {activeForm === 'register' && <Register />}
      </div>
    </div>
  )
}

export default Auth