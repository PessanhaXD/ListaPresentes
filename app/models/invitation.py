from pydantic import BaseModel


class InvitationCreate(BaseModel):

    name: str