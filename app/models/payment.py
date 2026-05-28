from pydantic import BaseModel


class PaymentRequest(BaseModel):

    gift_ids: list[int]

    payer_name: str

    payer_whatsapp: str