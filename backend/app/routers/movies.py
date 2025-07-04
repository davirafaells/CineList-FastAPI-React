from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from .. import schemas
from ..in_memory_db import MOVIES_DB, FAVORITES_DB, WATCHLIST_DB
from .auth import get_current_user

router = APIRouter(tags=["Movies"])


### ROTAS PÚBLICAS ###

@router.get("/movies/", response_model=List[schemas.Movie])
def read_movies():
    """Retorna a lista completa de filmes disponíveis."""
    return MOVIES_DB

@router.get("/movies/{movie_id}", response_model=schemas.Movie)
def read_movie(movie_id: int):
    """Retorna os detalhes de um filme específico pelo seu ID."""
    movie = next((m for m in MOVIES_DB if m.id == movie_id), None)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


### ROTAS PRIVADAS (AUTENTICADAS) ###

# --- FAVORITES ---

@router.post("/users/me/favorites/{movie_id}", status_code=status.HTTP_201_CREATED)
def add_favorite(movie_id: int, current_user: schemas.User = Depends(get_current_user)):
    """Adiciona um filme à lista de favoritos do usuário logado."""
    if current_user.id not in FAVORITES_DB:
        FAVORITES_DB[current_user.id] = set()
    FAVORITES_DB[current_user.id].add(movie_id)
    return {"message": "Movie added to favorites"}

@router.delete("/users/me/favorites/{movie_id}", status_code=status.HTTP_200_OK)
def remove_favorite(movie_id: int, current_user: schemas.User = Depends(get_current_user)):
    """Remove um filme da lista de favoritos do usuário logado."""
    user_favorites = FAVORITES_DB.get(current_user.id)
    if user_favorites and movie_id in user_favorites:
        user_favorites.remove(movie_id)
        return {"message": "Movie removed from favorites"}
    raise HTTPException(status_code=404, detail="Favorite not found")

@router.get("/users/me/favorites", response_model=List[schemas.Movie])
def get_favorites(current_user: schemas.User = Depends(get_current_user)):
    """Retorna a lista de filmes favoritos do usuário logado."""
    favorite_ids = FAVORITES_DB.get(current_user.id, set())
    return [m for m in MOVIES_DB if m.id in favorite_ids]


# --- WATCHLIST ---

@router.post("/users/me/watchlist/{movie_id}", status_code=status.HTTP_201_CREATED)
def add_to_watchlist(movie_id: int, current_user: schemas.User = Depends(get_current_user)):
    """Adiciona um filme à watchlist do usuário logado."""
    if current_user.id not in WATCHLIST_DB:
        WATCHLIST_DB[current_user.id] = set()
    WATCHLIST_DB[current_user.id].add(movie_id)
    return {"message": "Movie added to watchlist"}

@router.delete("/users/me/watchlist/{movie_id}", status_code=status.HTTP_200_OK)
def remove_from_watchlist(movie_id: int, current_user: schemas.User = Depends(get_current_user)):
    """Remove um filme da watchlist do usuário logado."""
    user_watchlist = WATCHLIST_DB.get(current_user.id)
    if user_watchlist and movie_id in user_watchlist:
        user_watchlist.remove(movie_id)
        return {"message": "Movie removed from watchlist"}
    raise HTTPException(status_code=404, detail="Watchlist item not found")

@router.get("/users/me/watchlist", response_model=List[schemas.Movie])
def get_watchlist(current_user: schemas.User = Depends(get_current_user)):
    """Retorna a lista de filmes na watchlist do usuário logado."""
    watchlist_ids = WATCHLIST_DB.get(current_user.id, set())
    return [m for m in MOVIES_DB if m.id in watchlist_ids]