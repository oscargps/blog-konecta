import axios from "axios";

const signup = async (data) => {
  let resp;
  const url = "https://konecta-blog.000webhostapp.com/api/signup.php";
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

export default signup;
