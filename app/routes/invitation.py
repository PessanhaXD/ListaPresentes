from fastapi import APIRouter

from app.models.invitation import (
    InvitationCreate
)

from app.services.invitation_service import (
    confirm_invitation
)

router = APIRouter(
    prefix="/invitation",
    tags=["Invitation"]
)


@router.post("/")
def confirm(
    invitation: InvitationCreate
):

    return confirm_invitation(
        invitation.name,
        invitation.confirmed
    )