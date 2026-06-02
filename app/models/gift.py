from pydantic import BaseModel


class GiftCreate(BaseModel):

    name: str

    value: float

    image: str | None = None