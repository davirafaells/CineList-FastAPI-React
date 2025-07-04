from .schemas import Movie, UserInDB
from .security import get_password_hash

# --- "Tabelas" do Banco de Dados em Memória ---
USERS_DB: dict[str, UserInDB] = {}
MOVIES_DB: list[Movie] = []
FAVORITES_DB: dict[int, set[int]] = {} # {user_id: {movie_id_1, movie_id_2}}
WATCHLIST_DB: dict[int, set[int]] = {} # {user_id: {movie_id_1, movie_id_2}}

# --- Contadores para simular IDs ---
_user_id_counter = 0
_movie_id_counter = 0

# Arquivo: backend/app/in_memory_db.py - APENAS A SEÇÃO 'populate_db'

def populate_db():
    """Função para popular o banco com dados iniciais. Executada na inicialização."""
    global _movie_id_counter, _user_id_counter

    # Limpa os dados para garantir um estado fresco a cada reinício
    USERS_DB.clear()
    MOVIES_DB.clear()
    FAVORITES_DB.clear()
    WATCHLIST_DB.clear()
    _user_id_counter = 0
    _movie_id_counter = 0

   
    initial_movies = [
        {"title": "Monstros S.A.", "director": "Pete Docter", "release_year": 2001, "synopsis": "A cidade de Monstrópolis é movida pela energia dos gritos das crianças. Os monstros James Sullivan e seu amigo Mike Wazowski são os melhores assustadores, até que acidentalmente trazem uma garotinha para o mundo deles.", "poster_url": "/static/images/monstros_sa.jpg"},
        {"title": "Matrix", "director": "Wachowskis", "release_year": 1999, "synopsis": "Um jovem programador descobre que o mundo em que vive é uma simulação e se junta a um grupo de rebeldes para lutar contra as máquinas que controlam a humanidade.", "poster_url": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"},
        {"title": "Shrek", "director": "Andrew Adamson, Vicky Jenson", "release_year": 2001, "synopsis": "Para recuperar o sossego em seu pântano, um ogro temível chamado Shrek faz um acordo com o Lorde Farquaad para resgatar a bela Princesa Fiona. Ele é acompanhado por um Burro falante e tagarela.", "poster_url": "/static/images/shrek.jpg"},
        {"title": "Cidade de Deus", "director": "Fernando Meirelles", "release_year": 2002, "synopsis": "Buscapé é um jovem pobre, negro e sensível, que cresce em um universo de muita violência. Ele vive na Cidade de Deus, favela carioca conhecida por ser um dos locais mais violentos da cidade.", "poster_url": "https://upload.wikimedia.org/wikipedia/pt/1/10/CidadedeDeus.jpg"},
        {"title": "O Rei Leão", "director": "Roger Allers, Rob Minkoff", "release_year": 1994, "synopsis": "Mufasa, o Rei Leão, e a rainha Sarabi apresentam ao reino o herdeiro do trono, Simba. O pequeno leão é envolvido nas artimanhas de seu tio Scar, o invejoso e maquiavélico irmão de Mufasa.", "poster_url": "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_FMjpg_UX1000_.jpg"},
        {"title": "Lilo & Stitch", "director": "Chris Sanders, Dean DeBlois", "release_year": 2002, "synopsis": "Lilo é uma garota havaiana que adota um 'cachorro' que ela chama de Stitch. Stitch seria o animal de estimação perfeito se não fosse, na verdade, um experimento genético que fugiu de um planeta alienígena.", "poster_url": "/static/images/lilo_stitch.jpg"},
        {"title": "Tropa de Elite", "director": "José Padilha", "release_year": 2007, "synopsis": "Nascimento, capitão do BOPE, quer sair da corporação e treinar um substituto. Paralelamente, dois aspirantes a oficiais da PM se deparam com a corrupção policial e anseiam por fazer parte do batalhão.", "poster_url": "/static/images/tropa_elite.jpg"},
        {"title": "Ainda Estou Aqui", "director": "Walter Salles", "release_year": 2024, "synopsis": "Baseado no livro de Marcelo Rubens Paiva, o filme narra a história de Eunice Paiva, que busca por seu marido desaparecido durante a ditadura militar brasileira, tornando-se uma figura proeminente na luta pela anistia.", "poster_url": "/static/images/ainda_estou_aqui.jpg"},
    ]
    for movie_data in initial_movies:
        _movie_id_counter += 1
        MOVIES_DB.append(Movie(id=_movie_id_counter, **movie_data))

    _user_id_counter += 1
    test_user = UserInDB(
        id=_user_id_counter,
        email="test@example.com",
        hashed_password=get_password_hash("1234")
    )
    USERS_DB[test_user.email] = test_user


populate_db() # Executa a função para ter dados quando o servidor iniciar