import json
import mercadopago

from fastapi import (
    APIRouter,
    Request
)

from app.config.settings import (
    MERCADOPAGO_ACCESS_TOKEN
)

from app.database.connection import (
    SessionLocal
)

from app.database.models import (
    Gift,
    Payment
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

        external_reference = json.loads(
            payment[
                "external_reference"
            ]
        )

        print(
            "EXTERNAL_REFERENCE:",
            external_reference
        )

        gift_ids = external_reference[
            "gift_ids"
        ]

        payer_name = external_reference[
            "payer_name"
        ]

        payer_whatsapp = external_reference[
            "payer_whatsapp"
        ]

        print(
            "GIFT_IDS:",
            gift_ids
        )

        db = SessionLocal()

        try:

            existing_payment = (
                db.query(Payment)
                .filter(
                    Payment.mercadopago_payment_id
                    == str(
                        payment["id"]
                    )
                )
                .first()
            )

            if existing_payment:

                print(
                    "PAGAMENTO JÁ PROCESSADO"
                )

                return {
                    "success": True
                }

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

            print(
                "PRESENTES MARCADOS COMO COMPRADOS"
            )

            new_payment = Payment(
                gift_id=gift_ids[0],
                payer_name=payer_name,
                payer_whatsapp=payer_whatsapp,
                mercadopago_payment_id=str(
                    payment["id"]
                ),
                value=payment[
                    "transaction_amount"
                ]
            )

            db.add(
                new_payment
            )

            db.commit()

            print(
                "PAGAMENTO SALVO"
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