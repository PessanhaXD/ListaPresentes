import axios from "axios";

export async function create_payment(
  gift_ids,
  payer_name,
  payer_whatsapp,
  payer_message,
) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/payments/create`,
    {
      gift_ids,
      payer_name,
      payer_whatsapp,
      payer_message,
    },
  );

  return response.data;
}
