from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from app.models.invitation import (
    InvitationConfirm
)

from app.services.invitation_service import (
    confirm_invitation,
    import_invitations_from_excel
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


@router.post("/import")
async def import_invitations(
    file: UploadFile = File(...)
):

    return await import_invitations_from_excel(
        file
    )