# POC Chatbot

A simple proof of concept chatbot using FastAPI with WebSockets.

## Features

- Health check endpoint (`/health`)
- Real-time communication via WebSocket (`/ws/chat`)
- Simple web interface to interact with the chatbot

## How to Run

### 1. Create a Python Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate # activate the virtual environment
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Server

```bash
python main.py
```

The server will start on port 8000.

### 4. Access the Interface

Open your browser and navigate to:

```
http://localhost:8000/chatbot
```

## Project Structure

- `main.py` - FastAPI application with backend routes and logic
- `requirements.txt` - Project dependencies
- `static/index.html` - Web interface to interact with the chatbot

## Endpoints

- `GET /health` - Health check (returns service status)
- `WebSocket /ws/chat` - WebSocket endpoint for real-time communication
