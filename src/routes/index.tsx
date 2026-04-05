import { Route, Routes } from "react-router-dom"
import LandingPage from "../views/LandingPage"
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";



const AppRouter = () => {


    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default AppRouter;