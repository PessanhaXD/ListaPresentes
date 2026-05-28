import json
import mercadopago

from fastapi import APIRouter, Request

from app.config.settings import (
    MERCADOPAGO_ACCESS_TOKEN
)

from app.database.connection import (
    SessionLocal
)

from app.database.models import (
    Gift
)

sdk = mercadopago.SDK(
    MERCADOPAGO_ACCESS_TOKEN
)

router = APIRouter(
    prefix="/webhook",
    tags=["Webhook"]
)


@router.post("/mercadopago")
async def mercadopago_webhook(
    request: Request
):

    data = await request.json()

    print(
        "WEBHOOK:",
        data
    )

    try:

        if "data" not in data:
            return {
                "success": True
            }

        payment_id = data[
            "data"
        ][
            "id"
        ]

        print(
            "PAYMENT ID:",
            payment_id
        )

        payment_response = (
            sdk.payment().get(
                payment_id
            )
        )

        payment = payment_response[
            "response"
        ]

        print(
            "PAYMENT:",
            payment
        )

        if payment.get(
            "status"
        ) != "approved":

            print(
                "PAGAMENTO NÃO APROVADO"
            )

            return {
                "success": True
            }

        external_reference = (
            payment.get(
                "external_reference"
            )
        )

        print(
            "EXTERNAL_REFERENCE:",
            external_reference
        )

        if not external_reference:

            return {
                "success": False,
                "error": (
                    "external_reference "
                    "não encontrado"
                )
            }

        gift_ids = json.loads(
            external_reference
        )

        print(
            "GIFT_IDS:",
            gift_ids
        )

        db = SessionLocal()

        try:

            gifts = (
                db.query(Gift)
                .filter(
                    Gift.id.in_(
                        gift_ids
                    )
                )
                .all()
            )

            for gift in gifts:

                gift.purchased = True

            db.commit()

            print(
                "PRESENTES MARCADOS "
                "COMO COMPRADOS"
            )

        finally:

            db.close()

        return {
            "success": True
        }

    except Exception as e:

        print(
            "WEBHOOK ERROR:",
            str(e)
        )

        return {
            "success": False,
            "error": str(e)
        }