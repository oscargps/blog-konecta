import axios from "axios";

const getDataEntry = async () => {
  let resp;
  const url = "https://konecta-blog.000webhostapp.com/api/categories.php";
  try {
    await axios.get(url).then((response) => {
      resp = response.data;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};
const createEntry = async (data) => {
  let resp;
  const url = "https://konecta-blog.000webhostapp.com/api/newEntry.php";
  let formData = new FormData();
  formData.append("data", JSON.stringify(data));
  try {
    await axios.post(url, formData).then(() => {
      resp = true;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};
const NewCover = async (file) => {
  let resp;
  const url = "https://konecta-blog.000webhostapp.com/api/newCover.php";
  let formData = new FormData();
  formData.append("cover", file);
  try {
    await axios
      .post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        resp = response.data
      });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export { getDataEntry, createEntry, NewCover };
