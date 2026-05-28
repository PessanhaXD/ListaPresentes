import mercadopago

from app.config.settings import (
    MERCADOPAGO_ACCESS_TOKEN
)

from app.database.connection import (
    SessionLocal
)

from app.database.models import Gift

sdk = mercadopago.SDK(
    MERCADOPAGO_ACCESS_TOKEN
)


def mp_create_payment(
    gift_id: int,
    payer_name: str,
    payer_whatsapp: str
):

    db = SessionLocal()

    try:

        gift = db.query(Gift).filter(
            Gift.id == gift_id
        ).first()

        if not gift:

            return {
                "success": False,
                "error": "Gift not found"
            }

        if gift.purchased:

            return {
                "success": False,
                "error": "Gift already purchased"
            }

        preference_data = {
            "items": [
                {
                    "title": gift.name,
                    "quantity": 1,
                    "currency_id": "BRL",
                    "unit_price": float(
                        gift.value
                    )
                }
            ]
        }

        response = sdk.preference().create(
            preference_data
        )

        preference = response["response"]

        return {
            "success": True,
            "gift_id": gift.id,
            "gift_name": gift.name,
            "payment_url": preference[
                "init_point"
            ],
            "payment_id": preference[
                "id"
            ]
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:

        db.close()