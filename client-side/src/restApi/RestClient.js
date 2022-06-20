//external import
import axios from "axios";

const token = "";

class RestClient {
  static GetRequest = (url) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  };

  static PostRequest = (url, postJson) => {
    let config = {
      Authorization: `Bearer ${token}`,
    };

    return axios
      .post(url, postJson, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  };
}

export default RestClient;
