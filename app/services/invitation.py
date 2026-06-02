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

    try:

        existing_invitation = (
            db.query(Invitation)
            .filter(
                Invitation.name == name
            )
            .first()
        )

        if existing_invitation:

            return {
                "success": False,
                "error": "Guest already confirmed"
            }

        invitation = Invitation(
            name=name
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