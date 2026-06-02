import axios from "axios";

export async function list_gifts() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/invitation`,
  );

  return response.data;
}
