import "./Login.css";
import "./../../index.css";
import React, { useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import SimplePasswordField from "../../components/password-field/SimplePasswordField";
import { authenticate } from '../../services/LoginService';
import LogoSvg from '../../components/Img/logo.svg';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleLoginClick = async () => {
        try {
            const data = { email, password };
            const response = await authenticate(data);
            
            localStorage.setItem('token', response.token);
            
            toast.success("Login realizado com sucesso!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Email e/ou senha inválido(s).");
        }
    };

    const handleCadastreClick = () => {
        navigate("/cadastre");
    };

    return (
        <Card className="shadow-5 border-round md:w-30rem">
            <div className="text-center mb-5">
                <div className="logo-wrapper">
                    <div className="logo-container mb-3">
                        <img src={LogoSvg} alt="logo" />
                    </div>
                </div>
                <div className="text-900 text-3xl font-medium mb-3">Entrar</div>
            </div>
            <div id="field-email" className="field">
                <FormControl fullWidth>
                    <TextField
                        onChange={handleEmailChange}
                        id="outlined-email"
                        name="email"
                        label="E-mail | Usuário"
                        placeholder="Endereço de e-mail ou nome de usuário"
                        required
                    />
                </FormControl>
            </div>

            <SimplePasswordField onChange={handlePasswordChange} />

            <div className="flex align-items-center justify-content-between mb-6">
                <Link className="font-medFium ml-2 no-underline text-blue-500 text-right cursor-pointer" to="/recover-password" target="_blank">Esqueceu a senha?</Link>
            </div>

            <div className="mt-5 mb-5 flex justify-content-between">
                <Button
                    onClick={handleLoginClick}
                    className="w-full btn-login mr-2"
                    label="Continuar"
                    icon="pi pi-user"
                    iconPos="left"
                    severity="secondary"
                    outlined
                />
                <Button
                    onClick={handleCadastreClick}
                    className="w-full btn-login"
                    label="Cadastrar"
                    icon="pi pi-user-plus"
                    iconPos="left"
                    severity="secondary"
                    outlined
                />
            </div>
        </Card>
    );
};

export default Login;
