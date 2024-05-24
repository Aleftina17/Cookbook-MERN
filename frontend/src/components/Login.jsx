import React, {useState} from "react";
import AuthForm from "./AuthForm";
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:5555/auth/login', {
          username,
          password
        })

        setCookies("access_token", response)
        window.localStorage.setItem("userID", response.data.userID)
        navigate('/recipes')

      } catch (error) {
        console.log(error)
      }
    }

    return <AuthForm 
    id='loginFrom'
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={setPassword} 
    description="Please enter your username and password to log in"
    label='Login'
    onSubmit={onSubmit}
    />;
};

export default Login;
