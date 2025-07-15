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

# WORKING MAIN.PY

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



# from fastapi import FastAPI, HTTPException, Request, Response
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import requests
# import os
# from dotenv import load_dotenv

# load_dotenv()

# app = FastAPI()

# # ====================== CORS CONFIGURATION ======================
# # All possible frontend origins including dynamic Vercel URLs
# allowed_origins = [
#     "http://localhost:5173",
#     "https://currencyconvert-hh79-glt-master-naver.vercel.app",
#     "https://currencyconverterry.vercel.app",
#     "https://*.vercel.app"  # Wildcard for all Vercel deployments
# ]

# # Add environment variable origins
# env_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
# allowed_origins.extend([origin.strip().rstrip('/') for origin in env_origins if origin.strip()])

# # Final cleanup
# allowed_origins = list({origin.lower() for origin in allowed_origins if origin})

# # Enhanced CORS configuration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=allowed_origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "OPTIONS"],
#     allow_headers=["*"],
#     expose_headers=["*"],
#     max_age=600
# )

# # ====================== API ENDPOINTS ======================
# class CurrencyRequest(BaseModel):
#     amount: float
#     from_currency: str
#     to_currency: str

# @app.get("/")
# async def health_check():
#     return {
#         "status": "running",
#         "docs": "/docs",
#         "endpoints": {
#             "convert": "/convert",
#             "currencies": "/currencies"
#         }
#     }

# @app.get("/currencies")
# async def get_currencies():
#     try:
#         response = requests.get(
#             "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
#             timeout=5
#         )
#         response.raise_for_status()
#         return response.json()  # Directly return {currencyCode: name} format
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Failed to fetch currencies: {str(e)}"
#         )

# @app.post("/convert")
# async def convert_currency(data: CurrencyRequest):
#     try:
#         # Simplified conversion with fixed rate for testing
#         rate = 1.2  # Example fixed conversion rate
        
#         return {
#             "from": data.from_currency.upper(),
#             "to": data.to_currency.upper(),
#             "amount": data.amount,
#             "rate": rate,
#             "converted_amount": round(data.amount * rate, 4)
#         }
#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Conversion error: {str(e)}"
#         )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



"""
FastAPI Currency Conversion API
──────────────────────────────
• GET  /currencies  - List available currency codes with names
• POST /convert     - Convert amount between currencies
"""

import os
from datetime import datetime
from typing import Dict

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI(
    title="Currency Converter API",
    version="1.0.0",
    description="Real-time currency conversion API"
)

# ======================= CORS CONFIGURATION =======================
# Allow local development and all Vercel deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600
)

# ======================= DATA MODELS =======================
class CurrencyRequest(BaseModel):
    amount: float
    from_currency: str
    to_currency: str

class ConversionResponse(BaseModel):
    query: Dict[str, str | float]
    rate: float
    converted: float

# ======================= API ENDPOINTS =======================
@app.get("/", tags=["meta"], summary="API Health Check")
async def health_check() -> Dict[str, str]:
    """Check API status and available endpoints"""
    return {
        "status": "running",
        "server_time": datetime.utcnow().isoformat() + "Z",
        "docs": "/docs",
        "endpoints": {
            "convert": "/convert",
            "currencies": "/currencies"
        },
    }

@app.get("/currencies", tags=["currency"], summary="List Available Currencies")
async def get_supported_currencies() -> Dict[str, Dict[str, str]]:
    """
    Get all supported currency codes with their full names
    Returns: { "currencies": { "USD": "United States Dollar", ... } }
    """
    try:
        response = requests.get(
            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
            timeout=5
        )
        response.raise_for_status()
        
        return {
            "currencies": {
                code.upper(): name 
                for code, name in response.json().items()
            }
        }
    except requests.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Currency API unavailable: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )

@app.post(
    "/convert", 
    tags=["currency"],
    response_model=ConversionResponse,
    summary="Convert Between Currencies"
)
async def convert_currency(body: CurrencyRequest) -> Dict:
    """
    Convert amount between currencies using real-time rates
    
    Parameters:
    - from_currency: 3-letter currency code (e.g. "USD")
    - to_currency: 3-letter currency code (e.g. "EUR")
    - amount: Amount to convert
    
    Returns: Conversion result with rate
    """
    try:
        from_cur = body.from_currency.lower()
        to_cur = body.to_currency.lower()

        # Same currency shortcut
        if from_cur == to_cur:
            return {
                "query": {
                    "amount": body.amount,
                    "from": from_cur.upper(),
                    "to": to_cur.upper()
                },
                "rate": 1.0,
                "converted": round(body.amount, 4)
            }

        # Get real-time exchange rates
        response = requests.get(
            f"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{from_cur}.json",
            timeout=5
        )
        response.raise_for_status()
        
        rates = response.json().get(from_cur, {})
        if to_cur not in rates:
            raise HTTPException(
                status_code=400,
                detail=f"Target currency {body.to_currency} not found"
            )

        rate = rates[to_cur]
        converted = round(body.amount * rate, 4)

        return {
            "query": {
                "amount": body.amount,
                "from": from_cur.upper(),
                "to": to_cur.upper()
            },
            "rate": rate,
            "converted": converted
        }

    except requests.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Exchange rate API unavailable: {str(e)}"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Conversion failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)