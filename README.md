# Teste técnico - Softline - .NET 10
Projeto em C# desenvolvido como teste técnico que tem como objetivo cadastrar usuários e fazer operações CRUD para clientes e produtos.


# Stack
* .NET 10
* MySql
* JWT
* HTML
* Tailwind
* JavaScript

# Estrutura das pastas
```
API.softline/
├── api.softline/          # Projeto principal da API (controllers, DTOs, Program.cs)
│   ├── Controllers/       # AuthController, UserController, ClienteController, ProdutoController
│   ├── DTOs/              # Objetos de transferência de dados
│   ├── Services/          # TokenService (geração de JWT)
│   └── appsettings.json   # String de conexão e configurações JWT
├── domain.softline/       # Entidades do domínio (Usuario, Produto, Cliente)
├── infra.softline/        # Acesso a dados (DbContext, Repositórios, Migrations)
│   ├── Data/              # ApiDBcontext
│   ├── Migrations/        # Migrations do Entity Framework
│   └── Repositorios/      # Repositórios de acesso ao banco
└── frontend/              # Interface HTML
    ├── login.html         # Tela de login
    ├── index.html         # Dashboard principal
    ├── produtos.html      # Listagem de produtos
    ├── clientes.html      # Listagem de clientes
    └── js/                # Scripts (api.js, auth.js, etc.)
```

# Executar o projeto

1 - Ter o .NET 10 e MySql devidamente instalados no computador

2 - Configure a conexão com o banco de dados:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=softline;User=(SeuUser);Password=(SuaSenha)"
  }
}
```

2.1 - Crie o banco de dados

Abra o terminal MySQL e rode o comando:

```SQL
CREATE DATABASE softline
```

3 - Rodar as Migrations
 
As migrations criam todas as tabelas e inserem os dados iniciais (produtos e clientes de exemplo) automaticamente.
 
**A migration roda sozinha ao iniciar a API** — o `Program.cs` executa `db.Database.Migrate()` na inicialização.

Mas se preferir rodar manualmente pelo terminal, execute a partir da pasta **raiz do projeto**:
 ```bash
dotnet ef database update --project infra.softline --startup-project api.softline
```

> Isso aplicará todas as migrations na ordem:
> 1. `InitialCreate` — cria as tabelas `Usuarios`, `Produtos` e `Clientes`
> 2. `SeedData` — insere 3 produtos e 2 clientes de exemplo
> 3. `RemoveEmptySeedAndCreateAgain` — ajuste de seed
> 4. `Migration0001` — ajustes adiciona


4 - Rode o projeto
```bash
cd api.softline
dotnet run
```

A API estará disponível em: **`https://localhost:5270`**
 
O Swagger abrirá automaticamente no navegador em: **`https://localhost:5270/swagger`**

5 - Criar o primeiro usuário (obrigatório)
 
O sistema não tem usuário cadastrado por padrão. É preciso criar um via Swagger **antes** de usar o frontend.
 
5.1 — Crie o usuário inicial
 
No Swagger, localize o endpoint:
 
```
POST /User/FirstAuth
```
 
Clique em **"Try it out"**, preencha o body e clique em **"Execute"**:
 
```json
{
  "login": "admin",
  "senha": "123456"
}
```
 
5.2 — Obtenha o token JWT
 
No Swagger, localize o endpoint:
 
```
POST /Auth/login
```
 
Clique em **"Try it out"**, preencha com as mesmas credenciais e clique em **"Execute"**:
 
```json
{
  "login": "admin",
  "senha": "123456"
}
```
 
Copie o token recebido.

5.3 — Autorize o Swagger com o token
 
5.3.1 - Clique no botão **"Authorize 🔓"** no topo direito do Swagger

5.3.2 - No campo, digite: `Bearer SEU_TOKEN_AQUI`
   - Exemplo: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

5.3.3 - Clique em **"Authorize"** e depois em **"Close"**
Agora todos os endpoints protegidos estarão liberados no Swagger.

6 - Acesse o Frontend

Navegue até a pasta `frontend/` do projeto e abra o arquivo:
 
```
frontend/login.html
```
 
> Você pode abrir clicando duas vezes no arquivo no explorador de arquivos, ou arrastar para o navegador.

7 — Faça login

Na tela de login, use as credenciais criadas, clique em **"Entrar"** — você será redirecionado para a tela principal com o menu de **Produtos** e **Clientes**.
 
> **⚠️ Importante:** A API precisa estar rodando (`dotnet run`) para o frontend funcionar. Se aparecer erro de conexão, verifique se a API está ativa em `https://localhost:5270`.
