from pydantic import BaseModel
from datetime import datetime
from typing import Optional


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
    strategy:Optional[str] = None


class TradeUpdate(BaseModel):
    notes: Optional[str] = None
    strategy: Optional[str] = None