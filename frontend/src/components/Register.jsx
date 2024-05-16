import React, { useState } from "react";
import AuthForm from "./AuthForm";
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios
            .post("http://localhost:5555/auth/register", {
                username,
                password
            })
            alert('Registration Completed. Now login.')
        } catch (error) {
            console.log(error)
        }
    }

    return <AuthForm 
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={setPassword} 
    label="Register"
    onSubmit={onSubmit}
     />;
};

export default Register;
