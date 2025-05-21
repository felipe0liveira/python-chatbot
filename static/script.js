document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const connectionStatus = document.getElementById("connection-status");

  let socket;

  function connect() {
    // WebSocket URL (ajuste para seu endereço real)
    socket = new WebSocket("ws://localhost:8000/ws/chat");

    socket.onopen = function (e) {
      connectionStatus.textContent = "Conectado";
      connectionStatus.classList.remove("bg-red-100", "text-red-700");
      connectionStatus.classList.add("bg-green-100", "text-green-700");
      addBotMessage("Olá! Como posso ajudar?");
    };

    socket.onmessage = function (event) {
      addBotMessage(event.data);
    };

    socket.onclose = function (event) {
      connectionStatus.textContent = "Desconectado. Tentando reconectar...";
      connectionStatus.classList.remove("bg-green-100", "text-green-700");
      connectionStatus.classList.add("bg-red-100", "text-red-700");

      // Tenta reconectar após 5 segundos
      setTimeout(connect, 5000);
    };

    socket.onerror = function (error) {
      console.error("Erro WebSocket:", error);
      connectionStatus.textContent = "Erro de conexão";
      connectionStatus.classList.remove("bg-green-100", "text-green-700");
      connectionStatus.classList.add("bg-red-100", "text-red-700");
    };
  }

  function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message-appear", "flex", "justify-end", "mb-4");
    
    const messageContent = document.createElement("div");
    messageContent.classList.add(
      "max-w-[70%]", 
      "bg-primary-500", 
      "text-white", 
      "py-2", 
      "px-4", 
      "rounded-tl-lg", 
      "rounded-bl-lg", 
      "rounded-tr-lg", 
      "shadow"
    );
    messageContent.textContent = message;
    
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.id = "typing-indicator";
    typingElement.classList.add("message-appear", "flex", "justify-start", "mb-4");
    
    const typingContent = document.createElement("div");
    typingContent.classList.add(
      "max-w-[70%]", 
      "bg-gray-100", 
      "text-gray-500", 
      "py-2", 
      "px-4", 
      "rounded-tr-lg", 
      "rounded-br-lg", 
      "rounded-bl-lg"
    );
    
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    typingContent.appendChild(typingIndicator);
    typingElement.appendChild(typingContent);
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingElement;
  }
  
  function removeTypingIndicator() {
    const typingElement = document.getElementById("typing-indicator");
    if (typingElement) {
      typingElement.remove();
    }
  }
  
  function addBotMessage(message) {
    // Remove o indicador de digitação se existir
    removeTypingIndicator();
    
    const messageElement = document.createElement("div");
    messageElement.classList.add("message-appear", "flex", "justify-start", "mb-4");
    
    const messageContent = document.createElement("div");
    messageContent.classList.add(
      "max-w-[70%]", 
      "bg-gray-200", 
      "text-gray-800", 
      "py-2", 
      "px-4", 
      "rounded-tr-lg", 
      "rounded-br-lg", 
      "rounded-bl-lg", 
      "shadow"
    );
    messageContent.textContent = message;
    
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const message = messageInput.value.trim();

    if (message && socket && socket.readyState === WebSocket.OPEN) {
      // Adiciona efeito visual ao botão
      sendButton.classList.add("btn-pulse");
      
      addUserMessage(message);
      
      // Mostra o indicador de digitação antes de receber a resposta
      showTypingIndicator();
      
      // Envia a mensagem para o servidor
      socket.send(message);
      messageInput.value = "";
      
      // Coloca o foco de volta no input
      messageInput.focus();
      
      // Remove o efeito visual após um curto período
      setTimeout(() => {
        sendButton.classList.remove("btn-pulse");
      }, 1000);
    }
  }

  sendButton.addEventListener("click", sendMessage);

  messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // Adiciona um efeito de focus no input
  messageInput.addEventListener("focus", () => {
    messageInput.parentElement.classList.add("ring-2", "ring-primary-300");
  });

  messageInput.addEventListener("blur", () => {
    messageInput.parentElement.classList.remove("ring-2", "ring-primary-300");
  });

  // Iniciar conexão WebSocket
  connect();
});
