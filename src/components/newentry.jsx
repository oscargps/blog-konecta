import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "./loader";
import Swal from "sweetalert2";
import { createEntry, getDataEntry, NewCover } from "../utils/newentry";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const NewEntry = (props) => {
  const {onFinish} =  props;
  let user = JSON.parse(sessionStorage.getItem("resp"));
  const initialState = {
    category: "",
    author: "",
    title: "",
    slug: "",
    shortText: "",
    largeText: "",
    pic: "",
    picFile: null,
  };
  const [form, setForm] = useState(initialState);
  const [loading, setloading] = useState(true);
  const [sendingData, setsendingData] = useState(false);
  const [categories, setCategories] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState(null);

  useEffect(async () => {
    let data = await getDataEntry();
    setCategories(data);
    setloading(false);
  }, []);
  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      author: user.id,
      category: SelectedCategory ? SelectedCategory.id : null,
      slug: string_to_slug(form.title),
    });
  };
  const handleLoad = (e) => {
    setForm({
      ...form,
      pic: e.target.value,
      picFile: e.target.files[0],
    });
  };
  const handleSubmit = async (e) => {
    let resp = false;
    e.preventDefault();
    setsendingData(true);
    let respUpPic = await NewCover(form.picFile);
    if (respUpPic.error) {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    } else {
      resp = await createEntry({ ...form, pic: respUpPic.url });
    }
    if (resp) {
      Swal.fire({
        title: "¡Listo!",
        text: "Se ha creado tu entrada",
        icon: "success",
      });
      setForm(initialState);
    } else {
      Swal.fire("¡Error!", "Si el error persiste, contacte a soporte", "error");
    }
    setsendingData(false);
    onFinish();
  };
  const string_to_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return user.id + "-" + str;
  };
  const handleSelect = (e) => {
    setSelectedCategory(JSON.parse(e));
  };
  return (
    <div className="NewEntry">
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <DropdownButton
              variant="secondary"
              size="sm"
              title={
                SelectedCategory ? SelectedCategory.name : "Seleccionar..."
              }
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
            >
              {categories.map((cat) => (
                <Dropdown.Item key={cat.id} eventKey={JSON.stringify(cat)}>
                  {cat.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group>
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              onChange={handleInput}
              name="title"
              value={form.title}
              className="input"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Resumen</Form.Label>
            <textarea
              maxLength="40"
              className="form-control"
              name="shortText"
              cols="40"
              rows="2"
              value={form.shortText}
              placeholder="Resumen"
              onChange={handleInput}
            ></textarea>
          </Form.Group>
          <Form.Group>
            <Form.Label>Texto principal</Form.Label>
            <textarea
              maxLength="500"
              className="form-control"
              name="largeText"
              cols="40"
              rows="2"
              value={form.largeText}
              placeholder="Contenido"
              onChange={handleInput}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen de Portada</Form.Label>
            <Form.Control
              type="file"
              id="pic"
              name="pic"
              onChange={handleLoad}
              accept="image/png, image/jpeg"
            />
          </Form.Group>
          <Button variant="success" type="submit" size="lg" disabled={loading}>
            {sendingData ? "Cargando" : "Enviar"}
          </Button>
        </Form>
      )}{" "}
    </div>
  );
};

export default NewEntry;
