import json
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
    gift_ids: list[int],
    payer_name: str,
    payer_whatsapp: str
):

    db = SessionLocal()

    try:

        gifts = db.query(Gift).filter(
            Gift.id.in_(gift_ids)
        ).all()

        if len(gifts) != len(gift_ids):

            return {
                "success": False,
                "error": "Gift not found"
            }

        for gift in gifts:

            if gift.purchased:

                return {
                    "success": False,
                    "error": (
                        f"Gift {gift.id} "
                        "already purchased"
                    )
                }

        items = []

        total_value = 0

        for gift in gifts:

            total_value += gift.value

            items.append(
                {
                    "title": gift.name,
                    "quantity": 1,
                    "currency_id": "BRL",
                    "unit_price": float(
                        gift.value
                    )
                }
            )

        preference_data = {
            "items": items,
            "external_reference": json.dumps(
                gift_ids
            )
        }

        response = sdk.preference().create(
            preference_data
        )

        preference = response["response"]

        return {
            "success": True,
            "gift_ids": gift_ids,
            "total_value": total_value,
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