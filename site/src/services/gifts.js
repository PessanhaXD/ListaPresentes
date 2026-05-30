import axios from 'axios';

export async function list_gifts() {
  const response = await axios.get(
    'https://listapresentes.onrender.com/gifts/',
  );

  return response.data;
}
