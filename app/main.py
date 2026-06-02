from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.payments import router as payments_router
from app.routes.gifts import router as gifts_router
from app.routes.webhook import router as web_router
from app.routes.invitation import router as invitation_router

app = FastAPI(
    title="Lista Presentes API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://enlace-rafael-vitoria.web.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(payments_router)
app.include_router(gifts_router)
app.include_router(web_router)
app.include_router(invitation_router)