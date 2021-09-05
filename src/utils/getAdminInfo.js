import axios from "axios";


const getAdminInfo = async () => {
    let resp;
    const url = "https://konecta-blog.000webhostapp.com/api/getAdminInfo.php";
    try {
      await axios.get(url).then((response) => {
        resp = response.data;
      });
    } catch (error) {
      resp = false;
    }
    return resp;



}

export {getAdminInfo}