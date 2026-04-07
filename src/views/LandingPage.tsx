import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header/Header";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div>
        <h1></h1>

        <button onClick={() => navigate("/login")}>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default LandingPage;
