from app.database.connection import (
    SessionLocal
)

from app.database.models import (
    Invitation
)


def create_invitation(
    name: str
):

    db = SessionLocal()

    guest = name.strip().lower()

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
                "error": "Já confirmado"
            }
        
        invitation = Invitation(
            name=guest
        )

        db.add(invitation)

        db.commit()

        db.refresh(invitation)

        return {
            "success": True,
            "id": invitation.id
        }

    finally:

        db.close()