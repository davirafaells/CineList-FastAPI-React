# Arquivo: backend/app/main.py - VERSÃO FINAL

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles  # <-- 1. IMPORTE StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, movies

app = FastAPI(title="CineList API")

# --- 2. MONTE O DIRETÓRIO ESTÁTICO ---
# Isso diz ao FastAPI: "Qualquer requisição que comece com /static,
# sirva a partir da pasta 'static' do projeto."
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(movies.router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "CineList API is running!"}