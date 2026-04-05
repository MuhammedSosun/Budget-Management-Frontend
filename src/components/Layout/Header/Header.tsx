import { useNavigate } from 'react-router';
import './header.scss';
import logo from "../../../../public/logo.png"
function Header() {

    const navigate = useNavigate();


    return (
        <header className="main-header">
            <div className="header-left" onClick={() => navigate("/")}>
                <img src={logo} alt="Budget Logo" />
                <div>Budget Management</div>
            </div>

            <div className="header-right">
                <button>Features</button>
                <button>How It Works</button>
                <button onClick={() => navigate("/login")}>Giriş Yap</button>
                <button onClick={() => navigate("/register")}>Kayıt Ol</button>
                <select>
                    <option value="tr">TR</option>
                    <option value="en">EN</option>
                </select>
                <select>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </header>
    )
}

export default Header