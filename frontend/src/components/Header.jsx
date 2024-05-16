import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const [cookies, setCookies] = useCookies(['access_token'])

  const logOut = () => {
    setCookies('access_token', "")
    window.localStorage.removeItem("userID")
    navigate('/auth')
  }

  return (
    <div className='header'>
        <div className="header_nav">
        <Link to="/" className='header_nav__item'>Home</Link>
        <Link to="/recipes" className='header_nav__item'>Recipes</Link>
        <Link to="/recipes/create" className='header_nav__item'>Create recipe</Link>
        <Link to="/saved-recipes" className='header_nav__item'>Saved recipes</Link>
        {!cookies.access_token ? (
        <Link to="/auth" className='header_nav__item'>Login</Link>
      ) : (
        <button onClick={logOut} className='header_nav__item'>Logout</button>
        )}
        </div>
    </div>
  )
}

export default Header