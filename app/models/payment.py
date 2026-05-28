from pydantic import BaseModel


class PaymentRequest(BaseModel):

    gift_id: int

    payer_name: str

    payer_whatsapp: str