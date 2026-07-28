from pydantic import BaseModel
from datetime import datetime


class TradeCreate(BaseModel):
    ticket: str
    symbol: str
    trade_type: str
    volume: float
    entry_price: float
    exit_price: float
    profit: float
    broker: str
    open_time: datetime
    close_time: datetime