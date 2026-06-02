from fastapi import APIRouter

from app.models.gift import GiftCreate

from app.services.gift_service import (
    get_gifts,
    create_gift
)

router = APIRouter(
    prefix="/gifts",
    tags=["Gifts"]
)


@router.get("/")
def list_gifts():

    return get_gifts()


@router.post("/")
def add_gift(
    gift: GiftCreate
):

    return create_gift(
        name=gift.name,
        value=gift.value,
        image=gift.image
    )