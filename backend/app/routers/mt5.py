from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Trade
from ..schemas import TradeCreate

router = APIRouter(
  prefix="/mt5",
  tags=["MT5"]
)

@router.post("/sync")
def sync_trade(trade: TradeCreate, db: Session = Depends(get_db)):
 existing = db.query(Trade).filter(
   Trade.ticket == trade.ticket
 ).first()

 if existing:
    return {
      "status": "duplicate"
    }

 new_trade = Trade(**trade.model_dump())

 db.add(new_trade)
 db.commit()
 db.refresh(new_trade)

 return {
    "status":"success",
    "id":new_trade.id
}