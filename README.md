# POC Chatbot

Uma prova de conceito simples de um chatbot usando FastAPI com WebSockets.

## Funcionalidades

- Endpoint de health check (`/health`)
- Comunicação em tempo real via WebSocket (`/ws/chat`)
- Interface web simples para interagir com o chatbot

## Como executar

### 1. Crie um env python

```bash
python -m venv .venv
source .venv/bin/activate # acesse o venv
```

### 2. Instale as dependências

```bash
pip install -r requirements.txt
```

### 3. Execute o servidor

```bash
python main.py
```

O servidor será iniciado na porta 8000.

### 3. Acesse a interface

Abra seu navegador e acesse:

```
http://localhost:8000/chatbot
```

## Estrutura do projeto

- `main.py` - Aplicação FastAPI com as rotas e lógica do backend
- `requirements.txt` - Dependências do projeto
- `static/index.html` - Interface web para interagir com o chatbot

## Endpoints

- `GET /health` - Health check (retorna status do serviço)
- `WebSocket /ws/chat` - Endpoint WebSocket para comunicação em tempo real
