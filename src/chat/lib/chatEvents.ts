import { Socket } from 'socket.io-client';
import Crypto from 'crypto-js';

class ChatEvents {
  socket: Socket;
  cryptoKey: string;

  constructor(socket: Socket, cryptoKey?: string) {
    this.socket = socket;
    this.cryptoKey = cryptoKey || '';
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
      room: room,
    });
  }
  leaveRoom(room: string) {
    this.socket.emit('leave', {
      socketIdx: this.socket.id,
      room: room,
    });
  }

  sendUserName(name: string) {
    this.on('setUserName', {
      socketIdx: this.socket.id,
      name: name,
    });
  }

  sendMessage(message: string, room: string) {
    this.emit('send', {
      socketIdx: this.socket.id,
      message: message,
      room: room,
    });
  }
  sendImage(image: Blob, room: string, imgSize: number) {
    if (image.type.split('/')[0] === 'image' && image.size <= imgSize) {
      this.socket.emit('sendImage', {
        socketIdx: this.socket.id,
        message: image,
        room: room,
      });

      return true;
    } else {
      return false;
    }
  }
  receiveMessages(
    handleMessage: (msg: { idx: string; message: string }) => void,
  ) {
    this.socket.on('receiveImage', (data: { idx: string; message: string }) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        handleMessage({
          idx: data.idx,
          message: `@$IMG ${e.target?.result}`,
        });
      };
      reader.readAsDataURL(new Blob([data.message], { type: 'images/png' }));
    });
    this.on('receive', (data: { idx: string; message: string }) => {
      if (this.socket.connected) {
        handleMessage(data);
      }
    });
    this.socket.on('joinRoom', (id: string) => {
      if (this.socket.connected) {
        handleMessage({
          idx: '#system',
          message: `${id} ?????? ????????? ?????? ???????????????.`,
        });
        this.getHeadCount();
      }
    });
    this.socket.on('leaveRoom', (id: string) => {
      if (this.socket.connected) {
        handleMessage({
          idx: '#system',
          message: `${id} ?????? ???????????? ???????????????.`,
        });
        this.getHeadCount();
      }
    });
  }

  getHeadCount() {
    this.socket.emit('headCount');
  }
  receiveHeadCount(room: string, handleCount: (data: Array<string>) => void) {
    this.socket.on('headCount', (data: { [key: string]: Array<string> }) => {
      if (this.socket.connected) {
        handleCount(data[room]);
      }
    });
  }
  receiveRoomHeadCount(
    handleCount: (data: { [key: string]: Array<string> }) => void,
  ) {
    this.socket.on('headCount', (data: { [key: string]: Array<string> }) => {
      if (this.socket.connected) {
        handleCount(data);
      }
    });
  }

  emit(eventName: string, message: Object) {
    this.socket.emit(
      eventName,
      this.cryptoKey.length > 0
        ? Crypto.AES.encrypt(JSON.stringify(message), this.cryptoKey).toString()
        : message,
    );
  }
  on(eventName: string, cb: any) {
    this.socket.on(
      eventName,
      this.cryptoKey.length > 0
        ? (data: string) =>
            cb(
              JSON.parse(
                Crypto.AES.decrypt(data, this.cryptoKey).toString(
                  Crypto.enc.Utf8,
                ),
              ),
            )
        : cb,
    );
  }
}

export default ChatEvents;
