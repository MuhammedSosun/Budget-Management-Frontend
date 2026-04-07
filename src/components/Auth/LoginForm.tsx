import { useState } from 'react'
import { login } from '../../services/auth.service';
import { useNavigate } from 'react-router';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Container from '../ui/Container/PageContainer';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setEmailError("");
            setPasswordError("");
            if (!email) {
                setEmailError("Lütfen e-posta adresinizi girin.");
                return;
            }
            if (password.length < 6) {
                setPasswordError("Şifre en az 6 karakter olmalıdır.");
                return;
            }
            const response = await login({ email, password });
            console.log(response.data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Container size='small'>
            <div>
                <Input
                    label="E-posta"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={setEmail}
                    error={emailError}
                />
                <Input
                    label="Şifre"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
                />
                <Button variant='primary' type='submit' onClick={handleLogin}>
                    Giriş Yap
                </Button>
            </div>
        </Container>
    )
}

export default LoginForm