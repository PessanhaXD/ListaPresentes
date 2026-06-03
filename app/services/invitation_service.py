from app.database.connection import (
    SessionLocal
)

from app.database.models import (
    Invitation
)


def confirm_invitation(
    name: str
):

    db = SessionLocal()

    guest = name.strip().title()

    try:

        invitation = (
            db.query(Invitation)
            .filter(
                Invitation.name == guest
            )
            .first()
        )

        if not invitation:

            return {
                "success": False,
                "error": "Convite não encontrado"
            }

        if invitation.confirmed:

            return {
                "success": False,
                "error": "Presença já confirmada"
            }

        invitation.confirmed = True

        db.commit()

        return {
            "success": True
        }

    finally:

        db.close()