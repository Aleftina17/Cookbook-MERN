import React from 'react'

const AuthForm = ({username, setUsername, password, setPassword, label, onSubmit, id, description}) => {
  return (
    <form className="auth_form" id={id} onSubmit={onSubmit}>
            <div className="auth_form__desc">{description}</div>
            <div className="auth_form__inputs">
                <div className="auth_form__input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder='Enter your username' value={username} className="input" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="auth_form__input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder='Enter your password' value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <button className="btn btn_primary" type="submit">{label}</button>
        </form>
  )
}

export default AuthForm