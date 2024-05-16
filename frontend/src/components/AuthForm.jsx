import React from 'react'

const AuthForm = ({username, setUsername, password, setPassword, label, onSubmit}) => {
  return (
    <form className="auth_form" onSubmit={onSubmit}>
            <div className="auth_form__title">{label}</div>
            <div className="auth_form__inputs">
                <div className="auth_form__input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} className="input" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="auth_form__input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <button className="btn btn_primary" type="submit">{label}</button>
        </form>
  )
}

export default AuthForm