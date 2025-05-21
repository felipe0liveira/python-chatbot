import time
from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="Chatbot POC")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
app.mount("/chatbot", StaticFiles(directory=static_dir, html=True), name="static")

@app.get("/health")
async def health_check():
    """Endpoint para verificar se a API está funcionando."""
    return JSONResponse({"status": "ok", "message": "Service is running"})

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    """Endpoint websocket para comunicação em tempo real com o chatbot."""
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            
            time.sleep(3)
            response = f"Você disse: {message}"
            await websocket.send_text(response)
    except Exception as e:
        print(f"Error in websocket connection: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
