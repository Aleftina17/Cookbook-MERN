import React, { useState } from "react";
import AuthForm from "./AuthForm";
import axios from "axios";
import { useSnackbar } from "notistack";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://cookbook-mern.onrender.com/auth/register", {
                username,
                password,
            });
            enqueueSnackbar("Registration completed. Log into your account.", { variant: "success" });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                enqueueSnackbar("User already exists", { variant: "error" });
            } else {
                console.error(error);
                enqueueSnackbar("An error occurred. Please try again.", { variant: "error" });
            }
        }
    };

    return (
        <AuthForm
            id="registerFrom"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            description="Create an account by entering your username and password"
            label="Register"
            onSubmit={onSubmit}
        />
    );
};

export default Register;
