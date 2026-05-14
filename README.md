# Movie Plots - Frontend & Backend

Este projeto é uma aplicação web que exibe enredos de filmes, com layout responsivo em formato de carrossel de cards, funcionalidade de tradução e um rodapé em destaque. O projeto é dividido em duas partes: o **Frontend** (HTML/CSS/JS) e o **Backend** (Node.js).

## 🚀 Como começar

Siga as instruções abaixo para configurar o projeto na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/) (normalmente já vem com o Node.js)

### 🔧 Instalação e Execução

Você pode **Clonar** o repositório diretamente ou fazer um **Fork** se desejar contribuir com melhorias.

#### 1. Fazendo um Fork (Recomendado para contribuições)

1. Acesse a página do repositório no GitHub.
2. No canto superior direito da página, clique no botão **Fork**.
3. Isso criará uma cópia do repositório na sua própria conta do GitHub.

#### 2. Clonando o Repositório

Abra o terminal e execute o comando abaixo para clonar o repositório para a sua máquina (substitua a URL pela do seu Fork, caso tenha feito um):

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
```

#### 3. Configurando o Backend

O backend fornece a API e os dados necessários para o frontend.

1. Navegue até a pasta do backend:

   ```bash
   cd NOME_DO_REPOSITORIO/movie_plots_backend
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz da pasta `movie_plots_backend` (se houver variáveis necessárias) e adicione a configuração de porta:

   ```env
   PORT=4000
   ```

4. Inicie o servidor:

   ```bash
   npm start
   # ou 'node server.js'
   ```

   O backend estará rodando em `http://localhost:4000`.

#### 4. Configurando o Frontend

1. Abra um **novo terminal** e navegue até a pasta do frontend:

   ```bash
   cd NOME_DO_REPOSITORIO/movie_plots_frontend
   ```

2. Como o frontend é composto por arquivos estáticos (HTML, CSS, JS), você pode utilizar uma extensão como o **Live Server** no VSCode.
   - Abra o arquivo `index.html` no VSCode.
   - Clique com o botão direito e selecione **"Open with Live Server"**.

   - ```bash

   npx serve .

   ```

   - O Frontend estará rodando em `http://localhost:3000`.

   - O projeto abrirá no seu navegador, consumindo a API local do backend que está rodando na porta 4000.

---

## 🛠️ Tecnologias Utilizadas

## 🔗 Links Úteis

- **Frontend:** HTML5, CSS3 (Responsivo com CSS Grid/Flexbox), JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **API:** [http://www.omdbapi.com/](http://www.omdbapi.com/)

---

## 🤝 Como Contribuir e Acrescentar Melhorias Futuras

Contribuições são extremamente bem-vindas e incentivadas! Se você tem uma ideia para melhorar o projeto, siga o fluxo abaixo:

1. **Faça um Fork do projeto** (veja as instruções acima)
2. **Crie uma Branch para sua Feature**

   ```bash
   git checkout -b feature/MinhaNovaMelhoria
   ```

3. **Faça o Commit de suas mudanças**

   ```bash
   git commit -m 'Feat: Adiciona uma nova funcionalidade incrível'
   ```

4. **Faça o Push para a sua Branch**

   ```bash
   git push origin feature/MinhaNovaMelhoria
   ```

5. **Abra um Pull Request** no repositório original explicando suas alterações.

### 💡 Ideias para Melhorias Futuras

- Adicionar um sistema de paginação para carregar mais filmes.
- Adicionar um botão de "Dark Mode" (Modo Escuro).
- Exibir os trailers dos filmes quando o usuário clicar no card.

---

## 📝 Licença

Distribuído sob a licença MIT. Sinta-se livre para usar e modificar.
