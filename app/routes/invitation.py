from fastapi import APIRouter

from app.models.invitation import (
    InvitationCreate
)

from app.services.invitation_service import (
    create_invitation
)

router = APIRouter(
    prefix="/invitation",
    tags=["Invitation"]
)


@router.post("/")
def create(
    invitation: InvitationCreate
):

    return create_invitation(
        invitation.name
    )