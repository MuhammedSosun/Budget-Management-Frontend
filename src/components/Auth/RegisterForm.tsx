import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { register } from '../../services/auth.service';
import Container from '../ui/Container/PageContainer';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            setEmailError("");
            setPasswordError("");
            setFirstNameError("");
            setLastNameError("");
            if (!email) {
                setEmailError("Lütfen e-posta adresinizi girin.");
                return;
            }
            if (password.length < 6) {
                setPasswordError("Şifre en az 6 karakter olmalıdır.");
                return;
            }
            if (!firstName) {
                setFirstNameError("Lütfen adınızı girin.");
                return;
            }
            if (!lastName) {
                setLastNameError("Lütfen soyadınızı girin.");
                return;
            }
            await register({ email, password, firstName, lastName });
            navigate("/login");
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Container size='small'>


            <div className="login-card">
                <h2 className="login-title">Kayıt Ol</h2>
                <p className="login-subtitle">Bütçeni yönetmeye başlamak için hesap oluştur.</p>
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                    <Input label='E-posta' type="email" placeholder="m@example.com" value={email} onChange={setEmail} error={emailError} />
                    <Input label='Şifre' type="password" placeholder="Password" value={password} onChange={setPassword} error={passwordError} />
                    <div className="form-row"><Input label='Ad' type="text" placeholder="First Name" value={firstName} onChange={setFirstName} error={firstNameError} />
                        <Input label='Soyad' type="text" placeholder="Last Name" value={lastName} onChange={setLastName} error={lastNameError} />
                    </div>
                    <Button variant='primary' onClick={handleRegister}>Kayıt Ol</Button>


                    <div className="login-footer">
                        Zaten hesabınız var mı? <a onClick={() => navigate("/login")}>Giriş Yap</a>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default RegisterForm