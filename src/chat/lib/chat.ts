import { Socket } from "socket.io-client";

class ChatEvents {
    socket: Socket;
    constructor(socket: Socket) {
        this.socket = socket;
    }
    handleConnect(cb: VoidFunction) {
        this.socket.on('connect', () => {
            if (this.socket.connected) {
                cb();
            }
        });
    }
    handleDisConnect(cb: VoidFunction) {
        this.socket.on('disconnect', () => {
            cb();
        });
    }
    handleError(cb: VoidFunction) {
        this.socket.on('connect_error', () => {
            cb();
        });
    }
    joinRoom(room: string) {
        this.socket.emit('join', {
            socketIdx: this.socket.id,
            room: room
        });
    }
    sendMessage(message: string, room: string) {
        this.socket.emit('send', {
            socketIdx: this.socket.id,
            message: message,
            room: room
        });
    }
    receiveMessages(handleMessage: (msg: { idx: string, message: string }) => void) {
        this.socket.once('receive', (data: { idx: string, message: string }) => {
            if (this.socket.connected) {
                handleMessage(data);
            }
        });
        this.socket.once('joinRoom', (id: string) => {
            if (this.socket.connected) {
                handleMessage({
                    idx: '#system',
                    message: `${id} 님이 대화에 참여 하였습니다.`,
                });
            }
        });
        this.socket.once('leaveRoom', (id: string) => {
            if (this.socket.connected) {
                handleMessage({
                    idx: '#system',
                    message: `${id} 님이 대화에서 나갔습니다.`,
                });
            }
        });
    }
    clearReceive() {
        this.socket.removeAllListeners('receive');
        this.socket.removeAllListeners('joinRoom');
        this.socket.removeAllListeners('leaveRoom');
    }
}

export default ChatEvents;