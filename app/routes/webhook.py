import json
import mercadopago

from fastapi import APIRouter, Request

from app.config.settings import MERCADOPAGO_ACCESS_TOKEN

from app.database.connection import SessionLocal

from app.database.models import Payment, PaymentGift

from app.services.callmebot_service import send_whatsapp_notification

sdk = mercadopago.SDK(MERCADOPAGO_ACCESS_TOKEN)

router = APIRouter(prefix="/webhook", tags=["Webhook"])


@router.post("/mercadopago")
async def mercadopago_webhook(request: Request):

    try:

        data = await request.json()

        print("WEBHOOK:", data)

        if "data" not in data:

            return {"success": True}

        payment_id = data["data"]["id"]

        print("PAYMENT ID:", payment_id)

        payment_response = sdk.payment().get(payment_id)

        payment = payment_response["response"]

        print("PAYMENT:", payment)

        status = payment.get("status")

        # PAGAMENTO RECUSADO
        if status == "rejected":

            try:
                external_reference = json.loads(
                    payment.get("external_reference") or "{}"
                )
            except (json.JSONDecodeError, TypeError):
                external_reference = {}

            payer_name = external_reference.get("payer_name", "Não identificado")

            payer_whatsapp = external_reference.get("payer_whatsapp", "Não informado")

            status_detail = payment.get("status_detail", "Não informado")

            message = f"""
⚠️ PAGAMENTO RECUSADO!

👤 Cliente: {payer_name}
📱 WhatsApp: {payer_whatsapp}
💰 Valor: R$ {payment.get("transaction_amount", 0):.2f}

❌ Status: {status}
🔎 Detalhe: {status_detail}

🆔 Payment ID: {payment.get("id")}

❤️ Enlace Rafael & Vitória
"""

            notification_response = await send_whatsapp_notification(message)

            if not notification_response["success"]:
                print("CALLMEBOT ERROR:", notification_response["error"])

            return {"success": True}

        # OUTROS STATUS (PENDING, IN_PROCESS ETC.)
        if status != "approved":

            return {"success": True}

        # PAGAMENTO APROVADO
        external_reference = json.loads(payment["external_reference"])

        print("EXTERNAL_REFERENCE:", external_reference)

        gift_ids = external_reference["gift_ids"]

        payer_name = external_reference["payer_name"]

        payer_whatsapp = external_reference["payer_whatsapp"]

        payer_message = external_reference.get("payer_message", "")

        checkout_id = external_reference["checkout_id"]

        print("GIFT_IDS:", gift_ids)

        db = SessionLocal()

        try:

            existing_payment = (
                db.query(Payment)
                .filter(Payment.mercadopago_payment_id == str(payment["id"]))
                .first()
            )

            if existing_payment:

                return {"success": True}

            new_payment = Payment(
                payer_name=payer_name,
                payer_whatsapp=payer_whatsapp,
                payer_message=payer_message,
                mercadopago_payment_id=str(payment["id"]),
                value=payment["transaction_amount"],
                checkout_id=checkout_id,
            )

            db.add(new_payment)

            db.flush()

            for gift_id in gift_ids:

                payment_gift = PaymentGift(payment_id=new_payment.id, gift_id=gift_id)

                db.add(payment_gift)

            db.commit()

        finally:

            db.close()

        # NOTIFICAÇÃO DE PAGAMENTO APROVADO
        message = f"""
🎁 Novo presente confirmado!

👤 {payer_name}
📱 {payer_whatsapp}
💰 R$ {f"{payment['transaction_amount']:.2f}".replace(".", ",")}

❤️ Enlace Rafael & Vitória

💌 {payer_message}
"""

        notification_response = await send_whatsapp_notification(message)

        if not notification_response["success"]:

            print("CALLMEBOT ERROR:", notification_response["error"])

        return {"success": True}

    except Exception as e:

        print("WEBHOOK ERROR:", str(e))

        return {"success": False, "error": str(e)}
