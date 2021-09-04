import React, { useState } from "react";
import "../styles/components/loginform.css";
import Login from "../utils/login";
import Swal from "sweetalert2";
const LoginForm = (props) => {
  const [form, setValues] = useState({
    user: "",
    pw: ""
  });
  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await Login(form);
    if (resp) {
       sessionStorage.setItem('resp',true);
        window.location.href="/";
    } else {
      Swal.fire({
        title: "Información incorrecta",
        text: "Verifique y reintente",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={handleInput}
        className="form-control"
        name="user"
        placeholder="Usuario"
        required
      />
      <input
        type="password"
        onChange={handleInput}
        className="form-control"
        name="pw"
        placeholder="Contraseña"
        required
      />

      <input
        type="submit"
        value="Ingresar"
        className="btn btn-success btn-block"
      />
    </form>
  );
};

export default LoginForm;
