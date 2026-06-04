from fastapi import APIRouter

from app.models.payment import PaymentRequest

from app.services.mercadopago_services import mp_create_payment


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/create")
def create_payment(
    payment: PaymentRequest
):

    return mp_create_payment(
        gift_ids=payment.gift_ids,
        payer_name=payment.payer_name,
        payer_whatsapp=payment.payer_whatsapp,
        payer_message=payment.payer_message
    )