# 🎬 CineList: Catálogo de Filmes com FastAPI e React



Projeto Full-Stack desenvolvido para criar uma plataforma interativa de catálogo de filmes. A aplicação permite que usuários criem contas, façam login, explorem um catálogo de filmes e gerenciem suas listas pessoais de "Favoritos" e "Watchlist".

---

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Sistema completo de Cadastro e Login com segurança via tokens JWT.
- **Rotas Públicas e Privadas:**
  - **Públicas:** Catálogo de filmes, páginas de login e cadastro.
  - **Privadas:** Perfil do usuário, páginas de Favoritos e Watchlist.
- **Interatividade Total:**
  - Adicione ou remova filmes de suas listas de Favoritos e Watchlist com um clique.
  - O estado dos botões é atualizado em tempo real para refletir as listas do usuário.
- **Modal de Detalhes:** Clique em qualquer filme para ver uma janela com a sinopse completa e o pôster em maior resolução, sem sair da página.
- **Notificações Modernas:** Feedback visual elegante para todas as ações do usuário (login, erros, adicionar/remover filmes) usando `react-hot-toast`.
- **Imagens Locais:** O backend serve as imagens dos pôsteres localmente para garantir estabilidade e performance.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Framework:** FastAPI (Python)
- **Segurança:** Autenticação com JWT (`python-jose`) e hashing de senhas (`passlib` com `bcrypt`).
- **Banco de Dados:** Simulação de banco de dados em memória para agilidade na demonstração.
- **Servidor:** Uvicorn

### Frontend
- **Framework:** React (Vite)
- **Linguagem:** JavaScript
- **Roteamento:** `react-router-dom`
- **Gerenciamento de Estado:** React Context API
- **Estilização:** Tailwind CSS (via CDN)
- **Comunicação com API:** Axios
- **Notificações:** `react-hot-toast`

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos
- Python 3.8+
- Node.js e npm

### Backend
1. Crie e ative um ambiente virtual:
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

2.Instale as dependências:

pip install -r requirements.txt

3.Inicie o servidor:

uvicorn app.main:app --reload --port 8000

A API estará disponível em http://127.0.0.1:8000.

Frontend
1. Em um novo terminal, navegue até a pasta frontend:
  cd frontend

2. Instale as dependências:
   npm install

3. Inicie a aplicação:
   npm run dev

Acesse http://localhost:5173 (ou a porta indicada pelo Vite) no seu navegador.
