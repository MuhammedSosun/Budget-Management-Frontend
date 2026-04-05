import React from 'react'
import { useNavigate } from 'react-router';

function Unauthorized() {

    const navigate = useNavigate();
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>Bu sayfaya erişim yetkiniz yok.</p>
            <button onClick={() => navigate("/login")}>Giriş Yap</button>
        </div>
    )
}

export default Unauthorized