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
    leaveRoom(room: string) {
        this.socket.emit('leave', {
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
    sendImage(image: Blob, room: string, imgSize: number) {
        if (image.type.split('/')[0] === 'image' && image.size <= imgSize) {
            this.socket.emit('sendImage', {
                socketIdx: this.socket.id,
                message: image,
                room: room
            });

            return true;
        } else {
            return false;
        }
    }
    receiveMessages(handleMessage: (msg: { idx: string, message: string }) => void) {
        this.socket.on('receiveImage', (data: { idx: string, message: string }) => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                handleMessage({
                    idx: data.idx,
                    message: `@$IMG ${e.target?.result}`
                });
            }
            reader.readAsDataURL(new Blob([data.message], { type: 'images/png' }));
        });
        this.socket.on('receive', (data: { idx: string, message: string }) => {
            if (this.socket.connected) {
                handleMessage(data);
            }
        });
        this.socket.on('joinRoom', (id: string) => {
            if (this.socket.connected) {
                handleMessage({
                    idx: '#system',
                    message: `${id} 님이 대화에 참여 하였습니다.`,
                });
                this.socket.emit('headCount');
            }
        });
        this.socket.on('leaveRoom', (id: string) => {
            if (this.socket.connected) {
                handleMessage({
                    idx: '#system',
                    message: `${id} 님이 대화에서 나갔습니다.`,
                });
                this.socket.emit('headCount');
            }
        });
    }
    getHeadCount(room: string, handleCount: (data: Array<string>) => void) {
        this.socket.on('headCount', (data: { [key: string]: Array<string> }) => {
            if (this.socket.connected) {
                handleCount(data[room]);
            }
        });
    }
    receiveRoomHeadCount(handleCount: (data: { [key: string]: Array<string> }) => void) {
        this.socket.on('headCount', (data: { [key: string]: Array<string> }) => {
            if (this.socket.connected) {
                handleCount(data);
            }
        });
    }
}

export default ChatEvents;