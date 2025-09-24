# PROJETO ONFLY✈️ 💙

<img src="imagens/Onfly.gif" align="center" style="width:100%;" alt="Descrição do gif">

---
## 📂 Estrutura do projeto

```text
📦 ProjetoOnfly
├── 📁 custom_nodes
│   └── 📁 Random
│       ├── 📄 icon.svg
│       ├── 📄 package.json
│       ├── 📄 package-lock.json
│       ├── 📄 random.node.js
│       └── 📄 random.node.ts
├── 📁 imagens
├── 📁 n8n_data
├── ⚙️ tsconfig.json
├── ⚙️ .gitignore
├── 🐳 docker-compose.yml
└── 📘 README.md
````



## 🛠 O que usei?

- n8n (plataforma de automação)
- Node.js + TypeScript (para criar o node customizado)
- Docker (porque a vida é mais fácil com containers)
- PostgreSQL (pra guardar os dados do n8n)

## 📋 Antes de começar

Precisa ter instalado em sua maquina:
- **[Node.js](https://nodejs.org/)** (necessário para instalar as dependências do node customizado)
- **[Docker](https://www.docker.com/)** (para rodar o n8n e o PostgreSQL em containers)
- **[Docker Compose](https://docs.docker.com/compose/)** (Já vem junto com o docker desktop)

## 🏃‍♂️ Bora rodar!

1. Primeiro, clona o repo:
```bash
git clone https://github.com/VianaLeo13/ProjetoOnfly.git
cd ProjetoOnfly
```

2. Entrar na pasta
```bash
cd custom_nodes/
cd/Random
```

3. Gerar dependencias:
```bash
npm install
```

4. Rodar o docker:
```bash
docker-compose up -d
```

Se quiser parar o docker:
 ```bash
docker-compose down
```

> 💡 **Dica**: Se mexer no código do node, só rodar `npm run build` na pasta dele e dar um `docker-compose restart n8n`

## 🔑 Acessando

Depois que tudo subir, você pode acessar:

- n8n: http://localhost:5678
- Criar sua conta no n8n
- Entrar na parte de workflow:
- <img src="imagens/Passo1.png" align="center" style="width:100%;" alt="">
- Clicar no "+" no centro:
- Pesquisar pelo node "Random"
- <img src="imagens/Passo2.png" align="center" style="width:100%;" alt="">
- Escolher um numero de minimo e maximo:
- <img src="imagens/Passo3.png" align="center" style="width:100%;" alt="">

- Clicar no botão laranja execute step
- <img src="imagens/Passo4.png" align="center" style="width:100%;" alt="">

## Fluxo:
<img src="imagens/TesteOnfly.png" align="center" style="width:100%;" alt="">

## 📦 Como o node funciona?

É bem simples! O node se conecta com a API do Random.org pra gerar números verdadeiramente aleatórios. Você só precisa configurar:

- Número mínimo
- Número máximo
- E rodar!
O node cuida de toda a comunicação com a API e validação dos dados.

## 🧪 Testes / Validação

Para garantir que o node funcionava corretamente, realizei testes em dois níveis:

1. **Testes manuais do node Random**
   - Gerei números aleatórios entre diferentes intervalos (ex.: 1-100, 50-500)
   - Confirmei que os valores retornados estavam sempre dentro do intervalo definido
   - Testei a comunicação com a API do Random.org para validar a resposta

2. **Testes dentro do Docker**
   - Subi o contêiner usando `docker-compose up -d`
   - Verifiquei se o container do n8n estava rodando corretamente
   - Consultei os logs do container (`docker-compose logs -f n8n`) para confirmar que o node customizado foi carregado sem erros
   - Executei workflows de teste dentro do n8n para garantir que o node funcionava conforme esperado

## 🤔 Problemas que pode aparecer

- **Node não aparece no n8n?** Reinicia o container que resolve: `docker-compose restart n8n`


## ⚙️ Variáveis de Ambiente e Banco de Dados

### PostgreSQL:
- `POSTGRES_USER`: n8n (usuário do banco)
- `POSTGRES_PASSWORD`: n8n (senha do banco)
- `POSTGRES_DB`: n8n (nome do banco)
- Porta: 5433 (mapeada para 5432 no container)

### N8N:
- `DB_TYPE`: postgresdb (tipo do banco de dados)
- `DB_POSTGRESDB_HOST`: postgres (host do banco)
- `DB_POSTGRESDB_PORT`: 5432 (porta do banco dentro do container)
- `DB_POSTGRESDB_DATABASE`: n8n (nome do banco)
- `DB_POSTGRESDB_USER`: n8n (usuário do banco)
- `DB_POSTGRESDB_PASSWORD`: n8n (senha do banco)
- `N8N_BASIC_AUTH_ACTIVE`: true (ativa autenticação básica)
- `N8N_BASIC_AUTH_USER`: admin (usuário do n8n)
- `N8N_BASIC_AUTH_PASSWORD`: admin (senha do n8n)
- `N8N_PORT`: 5678 (porta do n8n)
- `N8N_CUSTOM_EXTENSIONS`: /home/node/.n8n/custom (diretório de extensões)

### Volumes:
- `postgres_data`: Armazena os dados do PostgreSQL
- `./n8n_data`: Armazena os dados do N8N
- `./custom_nodes`: Armazena nós customizados

### Monitoramento e Logs:

Para verificar os logs dos serviços:
```bash
# Logs do N8N
docker-compose logs n8n

# Logs do PostgreSQL
docker-compose logs postgres

# Logs em tempo real
docker-compose logs -f
```

## OBRIGADO!

- Obrigado Onfly , pela oportunidade deste teste desafiador! 




