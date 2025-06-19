import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# ✅ CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CURRENCYSTACK_API_KEY = "ee02e01c53059b23e2e8f19dec307521"
CURRENCYSTACK_BASE_URL = "http://apilayer.net/api"
# EXCHANGE_API_URL = "https://api.exchangerate.host"


class CurrencyRequest(BaseModel):
    amount: float
    from_currency: str
    to_currency: str


@app.post("/convert")
def convert_currency(data: CurrencyRequest):
    try:
        from_currency = data.from_currency.upper()
        to_currency = data.to_currency.upper()

        params = {
            "access_key": CURRENCYSTACK_API_KEY,
            "currencies": to_currency,
            "source": from_currency,
            "format": 1
        }

        response = requests.get(f"{CURRENCYSTACK_BASE_URL}/live", params=params)
        result = response.json()

        if not result.get("success", False):
            return {"error": result.get("error", {}).get("info", "Unknown error")}

        key = f"{from_currency}{to_currency}"
        rate = result["quotes"].get(key)

        if not rate:
            return {"error": f"No rate found for {key}"}

        converted = data.amount * rate

        return {
            "query": {
                "amount": data.amount,
                "from": from_currency,
                "to": to_currency
            },
            "rate": rate,
            "converted": round(converted, 4)
        }

    except Exception as e:
        return {"error": str(e)}


@app.get("/currencies")
def get_supported_currencies():
    try:
        params = {"access_key": CURRENCYSTACK_API_KEY}
        response = requests.get(f"{CURRENCYSTACK_BASE_URL}/list", params=params)
        result = response.json()

        if not result.get("success", False):
            return {"error": result.get("error", {}).get("info", "Could not fetch currency list")}

        return result["currencies"]

    except Exception as e:
        return {"error": str(e)}

