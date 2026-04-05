import { useNavigate } from 'react-router';
import Header from '../components/Layout/Header/Header';

function LandingPage() {

    const navigate = useNavigate();



    return (
        <div>
            <Header />
            <div>
                <h1></h1>

                <button onClick={() => navigate("/login")}>Giriş Yap</button>
                <button >Kayıt Ol</button>
            </div>


        </div>
    )
}

export default LandingPage