import { useState } from 'react'
import { login } from '../../services/auth.service';
import { useNavigate } from 'react-router';

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            console.log(response.data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <input type="text" placeholder="Kullanıcı Adı" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Giriş Yap</button>
        </div>
    )
}

export default LoginForm