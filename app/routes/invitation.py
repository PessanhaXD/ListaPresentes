from fastapi import (
    APIRouter
)

from app.models.invitation import (
    InvitationConfirm
)

from app.services.invitation_service import (
    confirm_invitation,
)

router = APIRouter(
    prefix="/invitation",
    tags=["Invitation"]
)


@router.post("/")
def confirm(
    invitation: InvitationConfirm
):

    return confirm_invitation(
        invitation.name
    )