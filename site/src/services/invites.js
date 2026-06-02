import axios from "axios";

export async function create_confirmation(fullName) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/invitation`,
    {
      name: fullName,
    },
  );

  return response.data;
}
