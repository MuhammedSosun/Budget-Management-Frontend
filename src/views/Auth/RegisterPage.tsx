import React from "react";
import RegisterForm from "../../components/Auth/RegisterForm";
import "./Register.scss";
import Header from "../../components/Layout/Header/Header";
function RegisterPage() {
  return (
    <div className="register-page-wrapper">
      <Header />
      <div className="brand-logo">Bütçem.</div>
      <div className="register-card-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
