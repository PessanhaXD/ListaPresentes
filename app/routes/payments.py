from fastapi import APIRouter

from app.models.payment import PaymentRequest

from app.services.mercadopago_services import mp_create_payment, mp_payment_status

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("/create")
def create_payment(payment: PaymentRequest):

    return mp_create_payment(
        gift_ids=payment.gift_ids,
        payer_name=payment.payer_name,
        payer_whatsapp=payment.payer_whatsapp,
        payer_message=payment.payer_message,
    )


@router.get("/status/{checkout_id}")
async def payment_status(checkout_id: str):

    return mp_payment_status(checkout_id)
