from typing import List
from fastapi import FastAPI
from config import Settings
from model import PortfolioInfo
from starlette.middleware.cors import CORSMiddleware
from make_portfolio import MakePortrolio
from current_price import fetch_all_prices
from get_news_summary import News


settings = Settings()  # 설정 인스턴스 생성
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_credentials,
    allow_methods=settings.cors_methods,
    allow_headers=settings.cors_headers,
)


@app.post("/makePortfolio/")
async def makePortfolio(portfolio_info: PortfolioInfo):
    portfolio = MakePortrolio()
    result = portfolio.make_portfolio(
        portfolio_info.tickers,
        portfolio_info.safe_asset_ratio,
        portfolio_info.initial_cash,
    )
    return result


@app.post("/currentPrice/")
async def get_current_prices(tickers: List[str]):
    prices = await fetch_all_prices(tickers)
    return {"prices": prices}


@app.post("/getNews/")
async def get_News(ticker: str):
    news = News()
    summary = await news.get_company_news(ticker)
    return {"summary": summary}
