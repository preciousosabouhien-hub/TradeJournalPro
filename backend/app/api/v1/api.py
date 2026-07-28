from fastapi import APIRouter
from ...routers import trades
from ...routers import system
from ...routers import mt5

api_router = APIRouter()

api_router.include_router(system.router)
api_router.include_router(trades.router)
api_router.include_router(mt5.router)