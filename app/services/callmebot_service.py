import httpx

from urllib.parse import quote

from app.config.settings import (
CALLMEBOT_PHONE,
CALLMEBOT_API_KEY
)

async def send_whatsapp_notification(
message: str
):

    try:

        encoded_message = quote(
            message
        )

        url = (
            f"https://api.callmebot.com/whatsapp.php"
            f"?phone={CALLMEBOT_PHONE}"
            f"&text={encoded_message}"
            f"&apikey={CALLMEBOT_API_KEY}"
        )

        async with httpx.AsyncClient() as client:

            response = await client.get(
                url,
                timeout=10
            )

        if response.status_code != 200:

            return {
                "success": False,
                "error": response.text
            }

        return {
            "success": True,
            "message": "Notificação enviada corretamente para o Whatsapp."
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }