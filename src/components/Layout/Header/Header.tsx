import { useNavigate } from 'react-router';
import './header.scss';
import logo from "../../../../public/logo.png"
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import Button from '../../ui/Button/Button';
function Header() {

    const navigate = useNavigate();
    const themeData = useContext(ThemeContext);
    if (!themeData) return null;
    return (
        <header className="main-header">
            <div className="header-left" onClick={() => navigate("/")}>
                <img src={logo} alt="Budget Logo" />
                <div>Budget Management</div>
            </div>

            <div className="header-right">
                <Button variant='primary'>Features</Button>
                <Button variant='primary'>How It Works</Button>
                <Button variant='primary' onClick={() => navigate("/login")}>Login</Button>
                <Button variant='primary' onClick={() => navigate("/register")}>Register</Button>
                <select>
                    <option value="tr">TR</option>
                    <option value="en">EN</option>
                </select>
                <select
                    value={themeData.theme}
                    onChange={(e) => themeData.setTheme(e.target.value as 'light' | 'dark')}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </header>
    )
}

export default Header