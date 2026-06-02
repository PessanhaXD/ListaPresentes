from app.database.connection import SessionLocal
from app.database.models import Gift


def get_gifts():

    db = SessionLocal()

    try:

        return db.query(Gift).all()

    finally:

        db.close()


def create_gift(
    name: str,
    value: float,
    image: str | None = None
):

    db = SessionLocal()

    try:

        gift = Gift(
            name=name,
            value=value,
            image=image
        )

        db.add(gift)

        db.commit()

        db.refresh(gift)

        return gift

    finally:

        db.close()