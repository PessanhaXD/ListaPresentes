from fastapi import FastAPI

from app.routes.payments import router as payments_router
from app.routes.gifts import router as gifts_router
from app.routes.webhook import router as web_router


app = FastAPI(
    title="Lista Presentes API"
)

app.include_router(payments_router)
app.include_router(gifts_router)
app.include_router(web_router)