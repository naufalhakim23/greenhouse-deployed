import axios from "axios";
const API_URL = "https://dnn-model-served.herokuapp.com/api/check";
export const getPrediction = async (data) => {
  try {
    const response = await axios({
      method: "GET",
      url: API_URL,
      params: {
        data: data,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
