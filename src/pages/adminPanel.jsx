import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAdminInfo } from "../utils/getAdminInfo";
import { getDataEntry } from "../utils/newentry";
import Button from "react-bootstrap/Button";
import "../styles/pages/adminpanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const columnsUsers = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: "name",
      sortable: true,
    },
    {
      name: "tipo",
      selector: "type",
      sortable: true,
    },
    {
      name: "Email",
      selector: "mail",
      sortable: true,
    },
    {
      name: "Telefono",
      selector: "phone",
      sortable: true,
    },
  ];
  const columnsCategories = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: "name",
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: "desc",
      sortable: true,
    },
  ];
  useEffect(async () => {
    let users = await getAdminInfo();
    setUsers(users);
    let categories = await getDataEntry();
    setCategories(categories);
  }, []);
  return (
      <>
    <div className="panel-admin_navbar">
    <Button
                className="back-btn"
                variant="secondary"
                size="sm"
                onClick={() => (window.location.href = "/")}
              >
                Regresar
              </Button>
        <h4>Panel de administrador</h4>
    </div>
    <div className="panel-admin">
      <div className="panel-admin_table">
        <div className="panel-admin_options">
          <h3>Usuarios</h3>
          <Button variant="success"><FontAwesomeIcon icon="plus-circle" /></Button>
        </div>
        <DataTable
          striped
          highlightOnHover
          pagination={true}
          pointerOnHover
          noHeader
          paginationRowsPerPageOptions={[10, 20, 50]}
          columns={columnsUsers}
          data={users}
        />
      </div>
      <div className="panel-admin_table">
        <div className="panel-admin_options">
          <h3>Categorias</h3>
          <Button variant="success"><FontAwesomeIcon icon="plus-circle" /></Button>
        </div>
        <DataTable
          striped
          highlightOnHover
          pagination={true}
          pointerOnHover
          noHeader
          paginationRowsPerPageOptions={[10, 20, 50]}
          columns={columnsCategories}
          data={categories}
        />
      </div>
    </div>
    </>
  );
};

export default AdminPanel;
