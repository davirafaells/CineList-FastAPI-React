# Arquivo: backend/app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import timedelta

from .. import schemas
from ..in_memory_db import USERS_DB
from ..security import (
    SECRET_KEY, ALGORITHM,
    verify_password, get_password_hash, create_access_token
)

router = APIRouter(tags=["Auth"])
# O tokenUrl deve ser o caminho completo da rota de login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

# --- Dependência para obter o usuário atual (COM DEBUG) ---
def get_current_user(token: str = Depends(oauth2_scheme)) -> schemas.User:
    print("\n--- [DEBUG] DEPENDÊNCIA get_current_user INICIADA ---")
    print(f"[DEBUG] Token recebido (início): {token[:30]}...")

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("[DEBUG] Tentando decodificar o token...")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"[DEBUG] Payload decodificado com sucesso: {payload}")
        
        email: str = payload.get("sub")
        if email is None:
            print("--> [ERRO] 'sub' (email) não encontrado no payload.")
            raise credentials_exception
        print(f"[DEBUG] Email extraído do token: {email}")

    except JWTError as e:
        print(f"--> [ERRO] Falha na decodificação do JWT: {e}")
        raise credentials_exception
    
    user_data_in_db = USERS_DB.get(email)
    print(f"[DEBUG] Busca no USERS_DB pelo email '{email}': {user_data_in_db}")

    if user_data_in_db is None:
        print("--> [ERRO] Usuário não encontrado no DB com o email do token.")
        raise credentials_exception
    
    print("--- [DEBUG] DEPENDÊNCIA get_current_user CONCLUÍDA COM SUCESSO ---")
    # Retorna um objeto Pydantic, não o objeto do DB que contém a senha
    return schemas.User(id=user_data_in_db.id, email=user_data_in_db.email)


# --- Rotas ---

@router.post("/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user_in: schemas.UserCreate):
    from ..in_memory_db import _user_id_counter # Importação local para evitar problemas de importação circular
    
    if user_in.email in USERS_DB:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_id = len(USERS_DB) + 1
    hashed_password = get_password_hash(user_in.password)
    user_db = schemas.UserInDB(id=new_id, email=user_in.email, hashed_password=hashed_password)
    
    USERS_DB[user_db.email] = user_db
    
    return schemas.User(id=user_db.id, email=user_db.email)

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = USERS_DB.get(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/", response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    # A lógica de busca e validação já foi feita na dependência get_current_user
    return current_user