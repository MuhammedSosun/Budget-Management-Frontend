import React from "react";
import RegisterForm from "../../components/Auth/RegisterForm";
import "./Register.scss";
function RegisterPage() {
  return (
    <div className="register-page-wrapper">
      <div className="brand-logo">Bütçem.</div>
      <div className="register-card-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
