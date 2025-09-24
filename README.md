# PROJETO ONFLY

<img src="Onfly.gif" align="center" style="width:100%;" alt="Descrição do gif">

---

## 🚀 O que é isso?

E aí! Desenvolvi este node personalizado para o n8n que gera números aleatórios usando a API do Random.org. Ele é perfeito para quando você precisa de números verdadeiramente aleatórios nos seus workflows.

## 🛠 O que usei?

- n8n (nossa querida plataforma de automação)
- Node.js + TypeScript (para criar o node customizado)
- Docker (porque a vida é mais fácil com containers)
- PostgreSQL (pra guardar os dados do n8n)

## 📋 Antes de começar

Só precisa ter instalado:
- Docker
- Docker Compose

Não precisa ter Node.js instalado na sua máquina! Todo o ambiente de desenvolvimento roda dentro do Docker. 😉

## 🏃‍♂️ Bora rodar!

1. Primeiro, clona o repo:
```bash
git clone https://github.com/VianaLeo13/ProjetoOnfly.git
cd ProjetoOnfly
```

2. Só rodar o Docker:
```bash
docker-compose up -d
```

> 💡 **Nota**: Os arquivos já estão prontos pra uso! Se quiser desenvolver, todo o código do node customizado está em `custom_nodes/Random`

3. Roda tudo com Docker:
```bash
docker-compose up -d
```

> 💡 **Dica**: Se mexer no código do node, só rodar `npm run build` na pasta dele e dar um `docker-compose restart n8n`

## 🔑 Acessando

Depois que tudo subir, você pode acessar:

- n8n: http://localhost:5678
  - user: admin
  - senha: admin

## 📦 Como o node funciona?

É bem simples! O node se conecta com a API do Random.org pra gerar números verdadeiramente aleatórios. Você só precisa configurar:

- Número mínimo
- Número máximo
- E pronto! 🎉

O node cuida de toda a comunicação com a API e validação dos dados.

## 🤔 Problemas comuns

- **Node não aparece no n8n?** Reinicia o container que resolve: `docker-compose restart n8n`
- **Erro de permissão?** Relaxa, configurei tudo pra se ajustar automaticamente
- **Quer modificar o código?** Cola na pasta `custom_nodes/Random`, faz sua mágica, e não esquece de compilar!

## 💡 Dicas

1. **Desenvolvimento**: 
   - O código do node tá bem documentado
   - Use como base pra criar outros nodes
   - Teste bastante antes de subir pra prod

2. **Segurança**: 
   - Mude as senhas do admin em produção, ok? 
   - Edita o `docker-compose.yml` pra isso

## 🤝 Precisa de ajuda?

Só abrir uma issue aqui no GitHub! Tô sempre por aqui pra ajudar. 😉
