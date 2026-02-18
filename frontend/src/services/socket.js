import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

let socket = null

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    })
  }
  return socket
}

export function connectSocket() {
  const s = getSocket()
  if (!s.connected) s.connect()
  return s
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect()
}

export function joinBoard(boardId) {
  const s = getSocket()
  s.emit('joinBoard', boardId)
}

export function leaveBoard(boardId) {
  const s = getSocket()
  s.emit('leaveBoard', boardId)
}

export { socket }
