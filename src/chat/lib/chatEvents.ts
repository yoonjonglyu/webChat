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
    getRooms(handleRooms: (data: Array<string>) => void) {
        this.socket.once('rooms', (data: Array<string>) => {
            handleRooms(data);
        });
        this.socket.emit('rooms');
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
    sendImage(image: Blob, room: string, imgSize: number = 500 * 1024) {
        if (image.type.split('/')[0] === 'image' && image.size <= imgSize) {
            console.log(image);
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                this.socket.emit('send', {
                    socketIdx: this.socket.id,
                    message: `@$IMG ${e.target?.result}`,
                    room: room
                });
            }
            reader.readAsDataURL(image);

            return true;
        } else {
            return false;
        }
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
                this.socket.emit('headCount');
            }
        });
        this.socket.once('leaveRoom', (id: string) => {
            if (this.socket.connected) {
                handleMessage({
                    idx: '#system',
                    message: `${id} 님이 대화에서 나갔습니다.`,
                });
                this.socket.emit('headCount');
            }
        });
    }
    clearReceive() {
        this.socket.removeAllListeners('receive');
        this.socket.removeAllListeners('joinRoom');
        this.socket.removeAllListeners('leaveRoom');
    }
    getHeadCount(room: string, handleCount: (data: Array<string>) => void) {
        this.socket.on('headCount', (data: { [key: string]: Array<string> }) => {
            handleCount(data[room]);
        });
    }
    clearHeadCount() {
        this.socket.removeAllListeners('headCount');
    }
}

export default ChatEvents;