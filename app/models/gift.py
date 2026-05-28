from pydantic import BaseModel


class GiftCreate(BaseModel):

    name: str

    description: str

    value: float

    image: str | None = None