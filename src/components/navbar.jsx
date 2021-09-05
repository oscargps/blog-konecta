import React, { useState } from "react";
import "../styles/components/navbar.css";
import Logo from "../assets/img/logo.jpg";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
// import getInfo from "../utils/getInfo";
import Swal from "sweetalert2";
// import ChangePassword from "./changePassword";
import NewEntry from "./newentry";
import { Button } from "bootstrap";

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShow2(false);
  };
  let user = JSON.parse(sessionStorage.getItem("resp"));
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Desea cerra la sesión actual?",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Salir`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="Navbar">
      <img className="Navbar-logo" src={Logo} alt="" />
      <h3 className="Navbar-title">KONECTA Blog</h3>
      <div className="Navbar-Menu">
        <button
          className="btn btn-success btn-sm"
          onClick={() => setShow2(true)}
        >
          Nueva entrada
        </button>
        <DropdownButton
          variant="outline-light"
          size="sm"
          title={user.name}
          id="dropdown-menu-align-right"
        >
          {user.type == "administrator" && (
            <Dropdown.Item onClick={() => window.location.href ="/panel-admin"}>
              Panel de administrador
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => setShow(true)}>
            Cambiar contraseña
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
        </DropdownButton>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* <ChangePassword /> */}</Modal.Body>
        </Modal>
        <Modal show={show2} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear entrada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEntry onFinish={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
