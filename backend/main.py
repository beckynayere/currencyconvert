# .env

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from datetime import date
# import requests
# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# app = FastAPI()

# # Configure CORS from environment variables
# # Default to localhost:5173 if not specified in .env
# allowed_origins = os.getenv(
#     "ALLOWED_ORIGINS", 
#     "http://localhost:5173"
# ).split(",")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=allowed_origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class CurrencyRequest(BaseModel):
#     amount: float
#     from_currency: str
#     to_currency: str

# # Get the base API URL from environment variables
# # Default to the current CDN if not specified
# CURRENCY_API_BASE = os.getenv(
#     "CURRENCY_API_BASE_URL",
#     "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api"
# )

# @app.post("/convert")
# async def convert_currency(data: CurrencyRequest):
#     try:
#         today = date.today().isoformat()
#         from_cur = data.from_currency.lower()
#         to_cur = data.to_currency.lower()

#         url = f"{CURRENCY_API_BASE}@{today}/v1/currencies/{from_cur}.json"
#         response = requests.get(url)
#         response.raise_for_status()

#         json_data = response.json()
        
#         # Validate that the currencies exist in the response
#         if from_cur not in json_data or to_cur not in json_data[from_cur]:
#             raise HTTPException(
#                 status_code=400,
#                 detail=f"Currency pair {from_cur.upper()}/{to_cur.upper()} not supported"
#             )

#         rate = json_data[from_cur][to_cur]
#         converted = round(data.amount * rate, 4)

#         return {
#             "query": {
#                 "amount": data.amount,
#                 "from": from_cur.upper(),
#                 "to": to_cur.upper()
#             },
#             "rate": rate,
#             "converted": converted
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(
#             status_code=502,
#             detail=f"Currency API error: {str(e)}"
#         )
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error: {str(e)}"
#         )

# @app.get("/currencies")
# async def get_supported_currencies():
#     try:
#         url = f"{CURRENCY_API_BASE}@latest/v1/currencies.json"
#         response = requests.get(url)
#         response.raise_for_status()

#         result = response.json()
#         return {
#             "currencies": {code.upper(): name for code, name in result.items()}
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(
#             status_code=502,
#             detail=f"Currency API error: {str(e)}"
#         )
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error: {str(e)}"
#         )

# import requests
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from datetime import date

# app = FastAPI()

# # Enable CORS for frontend access
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class CurrencyRequest(BaseModel):
#     amount: float
#     from_currency: str
#     to_currency: str


# # POST /convert
# @app.post("/convert")
# def convert_currency(data: CurrencyRequest):
#     try:
#         today = date.today().isoformat() 
#         from_cur = data.from_currency.lower()
#         to_cur = data.to_currency.lower()

#         url = f"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{today}/v1/currencies/{from_cur}.json"
#         response = requests.get(url)
#         response.raise_for_status()

#         json_data = response.json()
#         rate = json_data[from_cur][to_cur]
#         converted = round(data.amount * rate, 4)

#         return {
#             "query": {
#                 "amount": data.amount,
#                 "from": from_cur.upper(),
#                 "to": to_cur.upper()
#             },
#             "rate": rate,
#             "converted": converted
#         }

#     except Exception as e:
#         return {"error": str(e)}


# # GET /currencies
# @app.get("/currencies")
# def get_supported_currencies():
#     try:
#         url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
#         response = requests.get(url)
#         response.raise_for_status()

#         result = response.json()
#         return {
#             "currencies": {code.upper(): name for code, name in result.items()}
#         }

#     except Exception as e:
#         return {"error": str(e)}


# third one WORKING FINE
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from datetime import date, timedelta
# import requests
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(","),
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class CurrencyRequest(BaseModel):
#     amount: float
#     from_currency: str
#     to_currency: str

# def get_fallback_dates():
#     today = date.today()
#     return [
#         today.isoformat(),          # Current date
#         (today - timedelta(days=1)).isoformat(),  # Yesterday
#         (today - timedelta(days=2)).isoformat(),  # 2 days ago
#         "latest"                    # Latest available
#     ]

# async def fetch_exchange_rate(from_cur, to_cur):
#     base_url = os.getenv("CURRENCY_API_BASE_URL", 
#                        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
    
#     for day in get_fallback_dates():
#         try:
#             url = f"{base_url}@{day}/v1/currencies/{from_cur}.json"
#             response = requests.get(url)
#             response.raise_for_status()
#             json_data = response.json()
#             return json_data[from_cur][to_cur]
#         except:
#             continue
    
#     raise HTTPException(
#         status_code=404,
#         detail="Could not fetch exchange rate after multiple attempts"
#     )

# @app.post("/convert")
# async def convert_currency(data: CurrencyRequest):
#     try:
#         from_cur = data.from_currency.lower()
#         to_cur = data.to_currency.lower()
        
#         rate = await fetch_exchange_rate(from_cur, to_cur)
#         converted = round(data.amount * rate, 4)

#         return {
#             "query": {
#                 "amount": data.amount,
#                 "from": from_cur.upper(),
#                 "to": to_cur.upper()
#             },
#             "rate": rate,
#             "converted": converted
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )

# @app.get("/currencies")
# async def get_supported_currencies():
#     try:
#         base_url = os.getenv("CURRENCY_API_BASE_URL",
#                            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
#         url = f"{base_url}@latest/v1/currencies.json"
#         response = requests.get(url)
#         response.raise_for_status()
        
#         result = response.json()
#         return {
#             "currencies": {code.upper(): name for code, name in result.items()}
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from datetime import date, timedelta
# import requests
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(","),
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# class CurrencyRequest(BaseModel):
#     amount: float
#     from_currency: str
#     to_currency: str

# @app.get("/")
# async def health_check():
#     return {
#         "status": "running",
#         "docs": "https://currencyconvert-brwe.onrender.com/docs",
#         "endpoints": {
#             "convert": "/convert",
#             "currencies": "/currencies"
#         }
#     }

# def get_fallback_dates():
#     today = date.today()
#     return [
#         today.isoformat(),          # Current date
#         (today - timedelta(days=1)).isoformat(),  # Yesterday
#         (today - timedelta(days=2)).isoformat(),  # 2 days ago
#         "latest"                    # Latest available
#     ]

# async def fetch_exchange_rate(from_cur, to_cur):
#     base_url = os.getenv("CURRENCY_API_BASE_URL", 
#                        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
    
#     for day in get_fallback_dates():
#         try:
#             url = f"{base_url}@{day}/v1/currencies/{from_cur}.json"
#             response = requests.get(url)
#             response.raise_for_status()
#             json_data = response.json()
#             return json_data[from_cur][to_cur]
#         except:
#             continue
    
#     raise HTTPException(
#         status_code=404,
#         detail="Could not fetch exchange rate after multiple attempts"
#     )

# @app.post("/convert")
# async def convert_currency(data: CurrencyRequest):
#     try:
#         from_cur = data.from_currency.lower()
#         to_cur = data.to_currency.lower()
        
#         rate = await fetch_exchange_rate(from_cur, to_cur)
#         converted = round(data.amount * rate, 4)

#         return {
#             "query": {
#                 "amount": data.amount,
#                 "from": from_cur.upper(),
#                 "to": to_cur.upper()
#             },
#             "rate": rate,
#             "converted": converted
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )

# @app.get("/currencies")
# async def get_supported_currencies():
#     try:
#         base_url = os.getenv("CURRENCY_API_BASE_URL",
#                            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
#         url = f"{base_url}@latest/v1/currencies.json"
#         response = requests.get(url)
#         response.raise_for_status()
        
#         result = response.json()
#         return {
#             "currencies": {code.upper(): name for code, name in result.items()}
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, timedelta
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS properly
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
# Clean up origins by stripping whitespace and removing empty strings
allowed_origins = [origin.strip() for origin in allowed_origins if origin.strip()]

allowed_origins = [
    "http://localhost:5173",  # Local development
    "https://currencyconvertterm-langa.vercel.app",  # Correct production URL
      # Typo-fallback (remove after fixing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class CurrencyRequest(BaseModel):
    amount: float
    from_currency: str
    to_currency: str

@app.get("/")
async def health_check():
    return {
        "status": "running",
        "docs": "/docs",  # Changed to relative path
        "endpoints": {
            "convert": "/convert",
            "currencies": "/currencies"
        }
    }

def get_fallback_dates():
    today = date.today()
    return [
        today.isoformat(),          # Current date
        (today - timedelta(days=1)).isoformat(),  # Yesterday
        (today - timedelta(days=2)).isoformat(),  # 2 days ago
        "latest"                    # Latest available
    ]

async def fetch_exchange_rate(from_cur: str, to_cur: str):
    base_url = os.getenv("CURRENCY_API_BASE_URL", 
                       "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
    
    for day in get_fallback_dates():
        try:
            url = f"{base_url}@{day}/v1/currencies/{from_cur}.json"
            response = requests.get(url, timeout=5)  # Added timeout
            response.raise_for_status()
            json_data = response.json()
            return float(json_data[from_cur][to_cur])  # Ensure float return
        except (requests.RequestException, KeyError, ValueError) as e:
            continue
    
    raise HTTPException(
        status_code=404,
        detail="Could not fetch exchange rate after multiple attempts"
    )

@app.post("/convert")
async def convert_currency(data: CurrencyRequest):
    try:
        from_cur = data.from_currency.lower()
        to_cur = data.to_currency.lower()
        
        if from_cur == to_cur:
            return {
                "query": {
                    "amount": data.amount,
                    "from": from_cur.upper(),
                    "to": to_cur.upper()
                },
                "rate": 1.0,
                "converted": data.amount
            }
        
        rate = await fetch_exchange_rate(from_cur, to_cur)
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
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Conversion error: {str(e)}"
        )

@app.get("/currencies")
async def get_supported_currencies():
    try:
        base_url = os.getenv("CURRENCY_API_BASE_URL",
                           "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api")
        url = f"{base_url}@latest/v1/currencies.json"
        response = requests.get(url, timeout=5)  # Added timeout
        response.raise_for_status()
        
        result = response.json()
        return {
            "currencies": {code.upper(): name for code, name in result.items()}
        }
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to fetch currencies: {str(e)}"
        )