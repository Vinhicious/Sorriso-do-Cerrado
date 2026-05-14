<p align="center">
  <img src="https://i.imgur.com/CGdLk4r.png" width="550">
</p>

<h1 align="center"> Sorriso do Cerrado - Loja de Artesanato</h1>

<p align="center"><img src="https://img.shields.io/static/v1?label=STATUS&message=%20Conclu%C3%ADdo&color=GREEN&style=for-the-badge"/></p>

<p align="center">
  Sorriso do Cerrado é uma aplicação web de e-commerce, desenvolvida por alunos da Universidade Católica de Brasília.
</p>

<p align="center">
  O objetivo principal é fornecer uma plataforma digital para que Ângela Maria, uma artesã local, possa exibir, divulgar e vender os seus produtos artesanais, conectando a sua arte com um público mais amplo e promovendo a cultura do Cerrado. O projeto inclui uma área pública para clientes e uma área administrativa segura para a gestão completa do catálogo de produtos.
</p>

##  Fases do Desenvolvimento
* Fase 1: Desenvolvimento Técnico (MVP)
    * Desenvolvido na disciplina de Programação Web.
    * Nesta fase inicial, o foco foi a construção da infraestrutura técnica e funcional do sistema.
    * Entregas Técnicas: Criação do Front-end (React), Back-end (Node.js/Express) e Banco de Dados (MySQL).
    * Funcionalidades Core: Vitrine virtual de produtos e módulo administrativo para CRUD de estoque.
    * Status: Sistema funcional e pronto para operação básica.

  Fase 2: Engenharia e Refinamento
    ***Em desenvolvimento** na disciplina de Análise e Desenvolvimento de Software.
    * Elaboração de documentos
    * Diagramas e Modelagem
    * Melhorias e novas funcionaidades

## ✨ Funcionalidades

O projeto é dividido em duas experiências principais: a do cliente visitante e a da artesã administradora.

### **Para Clientes (Público)**
* Visualização da página inicial com produtos em destaque.
* Catálogo completo de produtos com funcionalidade de busca em tempo real. 
* Página de detalhe para cada produto.
* Um carrinho de compras funcional, que persiste no navegador (`localStorage`).
* Finalização de compra simulada através de um link para o WhatsApp.

### **Para a Artesã (Área Administrativa)**
* Sistema de autenticação seguro com JWT (JSON Web Tokens) para proteger as rotas de gestão.
* Painel de controle para visualizar todos os produtos registados.
* Funcionalidade **CRUD** (Criar, Ler, Atualizar, Apagar) completa para os produtos:
    * **Adicionar** novos produtos através de um formulário.
    * **Editar** as informações de produtos existentes.
    * **Excluir** produtos do catálogo.
* Função de Logout para sair da área administrativa com segurança.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

| Área | Tecnologia |
| :--- | :--- |
| **Front-End** | React (com Vite), `react-router-dom`, `axios`, CSS Modules |
| **Back-End** | Node.js, Express.js |
| **Banco de Dados** | MySQL (com a biblioteca `mysql2`) |
| **Autenticação** | JWT (JSON Web Tokens), `bcryptjs` |

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto no seu ambiente de desenvolvimento, serão necessários dois terminais, um para o back-end e um para o front-end.

### **Pré-requisitos**
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/)
* Um servidor MySQL a correr localmente.

### **1. Back-End**
```bash
# Clone o repositório do back-end

# Entre na pasta do projeto

# Crie um ficheiro .env na raiz e configure as suas credenciais do banco de dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=suasenha
DB_NAME=sorrisodb
DB_PORT=3306

# Instale as dependências
npm install

# Inicie o servidor 
npx nodemon src/app.js
```
```
> O servidor back-end vai rodar na porta 3000.

### **2. Front-End**
```bash
# Em um novo terminal, clone o repositório do front-end

# Entre na pasta do projeto

# Instale as dependências
npm install

# Inicie a aplicação 
npx vite
```
> A aplicação front-end estará disponível em `http://localhost:5173`.

## 👩‍💻 Autores
* [Pedro Henrique Cavalcante de Sousa](https://github.com/pedrocavati)
* [Pedro Henrique Nunes de Freitas](https://github.com/henripredo40)
* [Samantha Yumi Tanaka](https://github.com/ySamantha)
* [Samuel Batista Rennó](https://github.com/SamuelBati)
* [Vinicios Trindade Costa](https://github.com/Vinhicious)
* [Wictor Emanoel Ponte Menezes](https://github.com/we-learner)
