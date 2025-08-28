# 🎬 Projeto Filmes

Sistema completo para gerenciamento de filmes, com frontend em **React** e backend em **Laravel**, integrados a um banco de dados **MySQL**.  
O projeto oferece uma API RESTful e uma interface moderna para cadastro, listagem e visualização de filmes.

---

## 📌 Descrição

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em desenvolvimento fullstack utilizando Laravel + React.  
Permite o gerenciamento de um catálogo de filmes, com título, ano, sinopse, imagem e outros atributos.

---

## ✅ Funcionalidades

- 📥 Cadastro de filmes
- 📃 Listagem de filmes
- ✏️ Edição de filmes
- 🔍 Visualização de detalhes
- 🔐 Autenticação com JWT
- 🧩 Integração total entre frontend e backend

---

## 🧰 Tecnologias Utilizadas

- ⚙️ **Laravel**
- ⚛️ **React + Vite**
- 🐬 **MySQL**
- 📦 **Docker & Docker Compose**
- 🧪 **Axios**, **React Router**

---

Acesse o projeto no link abaixo ou, se desejar rodar ele localmente em sua máquina, siga as instruções abaixo.

🔗 https://filmes-lemon-beta.vercel.app

## 🚀 Passos para Executar o Projeto

```bash
# Opção 1: Rodar com Docker

# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repositório

# Execute o comando a seguir tanto na pasta api e app
cp .env.example .env

# Suba os containers
sudo docker compose up --build -d

#excute
sudo docker exec -it php bash
composer install
php artisan key:generate
php artisan jwt:secret
php artisan config:clear
php artisan migrate

# Opção 2: Rodar manualmente (sem Docker)

# 1. Backend (Laravel)

cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Configure o .env com as informações do seu banco local:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nomedoseubanco
DB_USERNAME=root
DB_PASSWORD=suasenhadobanco

# Em seguida, rode as migrations:

php artisan migrate

# Inicie o servidor:

php artisan serve

# 2. Frontend (React + Vite)

cd app
npm install

# Crie um arquivo chamado ".env" na raiz da pasta app e adicione a seguinte linha:

VITE_API_URL=http://localhost:8000/api/v1

# Inicie o servidor:
npm run dev
