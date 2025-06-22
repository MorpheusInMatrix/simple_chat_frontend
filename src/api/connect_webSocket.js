let socket;

const connectWebSocket = ({ url, onMessage, onOpen }) => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(url);
  }

  socket.onopen = () => {
    console.log("WebSocket connected");
    onOpen();
  };

  socket.onmessage = (event) => {
    onMessage(event.data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("Sending message", message);
    socket.send(JSON.stringify(message));
  } else {
    console.error("WebSocket connection not open");
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export default connectWebSocket;
