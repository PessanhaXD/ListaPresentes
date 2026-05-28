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
        gift_id=payment.gift_id,
        payer_name=payment.payer_name,
        payer_email=payment.payer_email
    )