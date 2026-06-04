import json
import mercadopago
import re

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
    payer_whatsapp: str,
    payer_message: str
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
        
        payer_whatsapp = re.sub(
            r"\D",
            "",
            payer_whatsapp
        )

        if len(payer_whatsapp) != 11:
            return {
                'success': False,
                'error':'Whatsapp não preenchido corretamente, digite "DDD + Número de Telefone" '
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
                {
                    "gift_ids": gift_ids,
                    "payer_name": payer_name,
                    "payer_whatsapp": payer_whatsapp,
                    "payer_message": payer_message
                }
            ),
            "notification_url":
                "https://listapresentes.onrender.com/webhook/mercadopago"
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