from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Trade
from ..schemas import TradeCreate, TradeUpdate

router = APIRouter(prefix="/trades",
        tags=["Trades"])

#@router.post("/ping")
#def ping_mt5():
 #   return{
  #      "status": "success",
  # }

@router.post("/")
def create_trade(trade: TradeCreate, db:Session = Depends(get_db)):
    new_trade = Trade(
        ticket=trade.ticket,
        symbol=trade.symbol,
        trade_type=trade.trade_type,
        volume=trade.volume,
        entry_price=trade.entry_price,
        exit_price=trade.exit_price,
        profit=trade.profit,
        broker=trade.broker,
        open_time=trade.open_time,
        close_time=trade.close_time,
    )

    db.add(new_trade)
    db.commit()
    db.refresh(new_trade)

    return {
        "message": "Trade saved successfully!",
        "id": new_trade.id,
    }


@router.get("/")
def get_trades(db: Session = Depends(get_db)):
    return db.query(Trade).all()

@router.patch("/{trade_id}")
def update_trade_notes(
    trade_id: int,
    trade_update: TradeUpdate,
    db: Session = Depends(get_db)
):
    trade = db.query(Trade).filter(
        Trade.id == trade_id
    ).first()

    if trade is None:
        return {
            "status": "error",
            "message": "Trade not found"
        }

    trade.notes = trade_update.notes
    trade.strategy = trade_update.strategy

    db.commit()
    db.refresh(trade)

    return {
        "status" : "success",
        "message" : "Notes updated",
        "trade"   : trade
    }