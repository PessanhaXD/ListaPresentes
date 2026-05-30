import axios from "axios";

export async function list_gifts() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/gifts/`);

  return response.data;
}
