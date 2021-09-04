import React, { useState, useEffect } from "react";
import "../styles/pages/signup.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Logo from "../assets/img/logo.jpg";
import signup from "../utils/signup";
import Loader from "../components/loader";
import Swal from "sweetalert2";
import axios from "axios";
const Signup = () => {
  const initialState = {

    userMail: "",
    userName: "",
    userPhone: "",
  };
  const [form, setform] = useState(initialState);
  const [loading, setloading] = useState(false);
  const [sendingData, setsendingData] = useState(false);
  // useEffect(() => {
  //   const url =
  //     "https://basculapp.basculasyservicios.com/server/api/getLastUser.php";
  //   try {
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         let data = response.data[0];
  //         setform({
  //           ...form,
  //           clienteCode: parseInt(data.cliente) + 1,
  //           userCode: parseInt(data.user) + 1,
  //         });
  //         setloading(false);
  //       })
  //       .catch((er) => {
  //         return {};
  //       });
  //   } catch (error) {
  //     return {};
  //   }
  // }, []);



  const handleInput = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    setsendingData(true);
    let passwordOk = checkPassword() ? true : false;
    let resp = passwordOk ? await signup(form) : false;
    if (resp) {
      Swal.fire({
        title: '¡Listo!',
        text: "Tu información ha sido registrada con exito",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ingresar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href="/";
        }
      })
      setform(initialState);
    } else {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    }
    setsendingData(false);
  };
  const checkPassword = () => {
    return form.password1 === form.password2 ? true : false;
  };
  return (
    <>
      <div className="Signup">
        <div className="Signup__title">
          <Row>
            <Col md={1}>
              <img className="Signup__logo" src={Logo} alt="" />
            </Col>
            <Col md={11}>
              <h2 className="">Formulario de registro </h2>
            </Col>
          </Row>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={signupSubmit}>
            <div className="Signup__form">
            <Form.Group>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleInput}
                  name="userMail"
                  value={form.userMail}
                  className="input"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleInput}
                  name="userName"
                  value={form.userName}
                  className="input"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleInput}
                  name="password1"
                  value={form.password1}
                  className="input"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleInput}
                  name="password2"
                  value={form.password2}
                  className="input"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Telefono de contacto</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleInput}
                  name="userPhone"
                  value={form.userPhone}
                  className="input"
                  required
                />
              </Form.Group>
            </div>
            <div className="Signup__form-footer">
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={loading}
              >
                {sendingData ? "Cargando" : "Registrarse"}
              </Button>
              <div className="Signup-footer">
                Al dar click en "Registrarse", aceptas estar de acuerdo con los
                Terminos y condiciones y la Politica de privacidad
              </div>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default Signup;
