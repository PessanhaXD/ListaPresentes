from fastapi import APIRouter
from fastapi import Request

router = APIRouter(
    prefix="/webhook",
    tags=["Webhook"]
)


@router.post("/mercadopago")
async def mercadopago_webhook(
    request: Request
):

    data = await request.json()

    print(data)

    return {
        "success": True
    }