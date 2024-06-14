import React, {useState} from "react";
import AuthForm from "./AuthForm";
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from "notistack";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const onSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post('https://cookbook-mern.onrender.com/auth/login', {
          username,
          password
        })

        setCookies("access_token", response.data.token)
        window.localStorage.setItem("userID", response.data.userID)
        navigate('/recipes')

      } catch (error) {
        console.log(error)
        enqueueSnackbar("User does not exist. Try another username or password.", {variant: 'error'})
      }
    }

    return <AuthForm 
    id='loginFrom'
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={(e) => setPassword(e.target.value)}
    description="Please enter your username and password to log in"
    label='Login'
    onSubmit={onSubmit}
    />;
};

export default Login;
