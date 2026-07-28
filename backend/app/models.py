from sqlalchemy import Column, Integer, String, Float, DateTime
from .database import Base


class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, 
                index=True)
    
    ticket = Column(String, unique=True, nullable=False)

    symbol = Column(String)

    trade_type = Column(String)

    volume = Column(Float)

    entry_price = Column(Float)

    exit_price = Column(Float)

    profit = Column(Float)

    broker = Column(String)

    open_time = Column(DateTime)

    close_time = Column(DateTime)

    account_number = Column(String)

    magic_number = Column(String)

    stop_loss = Column(Float)

    take_profit = Column(Float)

    commission = Column(Float)

    swap = Column(Float)

