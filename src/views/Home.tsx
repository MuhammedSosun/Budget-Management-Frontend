import React from 'react'
import { useNavigate } from 'react-router';
import { logout } from '../services/auth.service';

function Home() {


    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div>

            <h1>
                Bütçe Yönetim Sistemi
            </h1>
            <p>
                Bütçe Yönetim Sistemi, bütçenizi yönetmenize yardımcı olan bir uygulamadır.
            </p>
            <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
    )
}

export default Home