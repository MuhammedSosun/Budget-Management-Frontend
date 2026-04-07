import { Route, Routes } from "react-router-dom"
import LandingPage from "../views/LandingPage"
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";
import RegisterPage from "../views/Auth/RegisterPage";



const AppRouter = () => {


    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}

export default AppRouter;