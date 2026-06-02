from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import declarative_base

from datetime import datetime

Base = declarative_base()


class Gift(Base):

    __tablename__ = "gifts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(255),
        nullable=False
    )

    description = Column(
        String(1000)
    )

    value = Column(
        Float,
        nullable=False
    )

    image = Column(
        String(500)
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Payment(Base):

    __tablename__ = "payments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    payer_name = Column(
        String(255)
    )

    payer_whatsapp = Column(
        String(255)
    )

    mercadopago_payment_id = Column(
        String(255)
    )

    value = Column(
        Float
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class PaymentGift(Base):

    __tablename__ = "payment_gifts"

    id = Column(
        Integer,
        primary_key=True
    )

    payment_id = Column(
        Integer,
        ForeignKey(
            "payments.id"
        ),
        nullable=False
    )

    gift_id = Column(
        Integer,
        ForeignKey(
            "gifts.id"
        ),
        nullable=False
    )