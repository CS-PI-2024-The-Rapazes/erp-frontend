import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import PasswordField from '../../components/password-validations-field/PasswordInput';
import ConfirmPasswordField from '../../components/confirm-password-field/ConfirmPasswordInput';
import LogoSvg from '../../components/Img/logo.svg';
import { toast } from 'react-toastify';
import './Cadastre.css';
import "./../../index.css"
import { cadastre } from '../../services/LoginService';
import { useLocation, useNavigate } from "react-router-dom";
import { authenticate } from '../../services/LoginService';

const Cadastre = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromQuery = queryParams.get('email');
        const nameFromQuery = queryParams.get('name');

        if (nameFromQuery) {
            setName(nameFromQuery);
        }
        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }

    }, [location]);

    useEffect(() => {
        const isFormValid =
            email &&
            name &&
            password &&
            confirmPassword &&
            password === confirmPassword &&
            password.length >= 6;

        setIsButtonDisabled(!isFormValid);
    }, [email, name, password, confirmPassword]);

    const handlePassword = (newPassword) => {
        setPassword(newPassword);
    };

    const handleConfirmPassword = (newPassword) => {
        setConfirmPassword(newPassword);
    };

    const handleCadastreClick = async () => {
        try {
            const data = { email, password, name };
            await cadastre(data);
            const response = await authenticate(data);
            
            localStorage.setItem('token', response.token);
            navigate("/dashboard");
            toast.success("Cadastro realizado com sucesso!");
        } catch (error) {
            toast.error("Erro ao realizar cadastro.");
            setErrorMessage("Falha no cadastro. Tente novamente.");
        }
    };

    return (
        <div className="flex align-items-center justify-content-center mt-5">
            <Card className="shadow-5 border-round md:w-30rem">
                <div className="text-center mb-5">
                    <div className="logo-wrapper">
                        <div className="logo-container mb-3">
                            <img src={LogoSvg} alt="logo" />
                        </div>
                    </div>
                    <div className="text-900 text-3xl font-medium mb-3">Cadastrar</div>
                    <span className="subTitle">Cadastre sua conta.</span>
                </div>

                <div id="field-name" className="field">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-name"
                            label="Nome do usuário"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome do usuário"
                        />
                    </FormControl>
                </div>

                <div id="field-mail" className="field">
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-email"
                            label="Endereço de e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Endereço de e-mail"
                        />
                        <p className="text-500 text-sm ml-2 mt-1">Digite seu e-mail.</p>
                    </FormControl>
                </div>

                <PasswordField onPasswordChange={handlePassword} label='Digite sua Senha' />

                <ConfirmPasswordField
                    password={password}
                    onConfirmPasswordChange={handleConfirmPassword}
                />

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="flex align-items-center justify-content-center mt-5">
                    <div className="mr-2">
                        <Button
                            className="w-full btn-login"
                            onClick={handleCadastreClick}
                            iconPos="left"
                            label="Cadastrar"
                            outlined
                            disabled={isButtonDisabled}
                        />
                    </div>
                    <Button
                        icon="pi pi-times"
                        className="p-button-secondary"
                        onClick={() => window.location.href = '/'}
                        tooltip="Cancelar"
                        tooltipOptions={{ position: 'right' }}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Cadastre;
