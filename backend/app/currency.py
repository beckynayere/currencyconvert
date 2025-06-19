# app/currency.py
# import httpx


# router = APIRouter()
# currency_dict = {}

# @router.on_event("startup")
# async def fetch_currency_symbols():
#     global currency_dict
#     async with httpx.AsyncClient() as client:
#         response = await client.get("https://api.exchangerate.host/symbols")
#         data = response.json()
#         currency_dict = data.get("symbols", {})

# @router.get("/symbols")
# async def get_currency_symbols():
#     return currency_dict

# @router.get("/currencies")
# async def get_currencies():
#     return currency_dict


# app/currency.py
import httpx
from fastapi import APIRouter

currency_dict = {}

async def fetch_currency_symbols():
    global currency_dict
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.exchangerate.host/symbols")
        data = response.json()
        currency_dict = data.get("symbols", {})

def get_currency_dict():
    return currency_dict
