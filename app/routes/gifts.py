from fastapi import (
    APIRouter,
    UploadFile,
    File
)
from app.models.gift import GiftCreate

from app.services.gift_service import (
    get_gifts,
    create_gift
)


from app.services.gift_service import (
    import_gifts_from_excel
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

@router.post("/import")
async def import_gifts(
    file: UploadFile = File(...)
):
    return await import_gifts_from_excel(file)