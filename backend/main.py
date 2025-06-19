import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CurrencyRequest(BaseModel):
    amount: float
    from_currency: str
    to_currency: str


# POST /convert
@app.post("/convert")
def convert_currency(data: CurrencyRequest):
    try:
        today = date.today().isoformat() 
        from_cur = data.from_currency.lower()
        to_cur = data.to_currency.lower()

        url = f"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{today}/v1/currencies/{from_cur}.json"
        response = requests.get(url)
        response.raise_for_status()

        json_data = response.json()
        rate = json_data[from_cur][to_cur]
        converted = round(data.amount * rate, 4)

        return {
            "query": {
                "amount": data.amount,
                "from": from_cur.upper(),
                "to": to_cur.upper()
            },
            "rate": rate,
            "converted": converted
        }

    except Exception as e:
        return {"error": str(e)}


# GET /currencies
@app.get("/currencies")
def get_supported_currencies():
    try:
        url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        response = requests.get(url)
        response.raise_for_status()

        result = response.json()
        return {
            "currencies": {code.upper(): name for code, name in result.items()}
        }

    except Exception as e:
        return {"error": str(e)}
