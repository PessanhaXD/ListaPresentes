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

        existing_invitation = (
            db.query(Invitation)
            .filter(
                Invitation.name == guest
            )
            .first()
        )

        if existing_invitation:

            return {
                "success": False,
                "error": "Presença já confirmada"
            }

        invitation = Invitation(
            name=guest
        )

        db.add(invitation)

        db.commit()

        db.refresh(invitation)

        return {
            "success": True,
            "message": "Presença confirmada",
            "id": invitation.id
        }

    finally:

        db.close()