import React, { useEffect } from "react";
import "../styles/pages/login.css";
import Logo from "../assets/img/logo.jpg";

import LoginForm from "../components/loginform";
const LogPage = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <div className="Login">
    <div className="Login-form ">

        <img className="Login-form__img" src={Logo} alt="" />
    <h3>Konecta Blog</h3>
        <LoginForm />
    <p>¿Primera vez?</p>
    <a onClick={()=> window.location.href="/signup"}  > Registrarse </a>
    </div>
    </div>
  );
};

export default LogPage;
