import WebSocket from "ws";
import messagesConstant, { MESSAGES } from "../domain/constants/messages.constant";

const { P2P_PORT = 5000, PEERS } = process.env;
const peers = PEERS ? PEERS.split(',') : []

class P2PService {

    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = []
    }

    listen() {
        const server = new WebSocket.Server({ port: P2P_PORT })
        server.on('connection', (socket) => this.onConnection(socket))

        peers.forEach((peer) => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.onConnection(socket));
        });

        console.log(`Service P2P working at port: ${P2P_PORT}`);
    }

    onConnection(socket) {
        const { blockchain: { blocks } } = this
        console.info(`[ws:socket] connected`);
        this.sockets.push(socket);

        socket.on('message', (message) => {
            const { type, value } = JSON.parse(message);

            try {
                if (type === MESSAGES.BLOCKS) this.blockchain.replace(value)
            } catch (error) {
                console.log(`[ws:message] error ${error}`);
            }

            console.log("Message: ", { type, value });

            // this.broadcast(type, value);
        })

        socket.send(JSON.stringify({ type: MESSAGES.BLOCKS, value: blocks }));

    }

    sync() {
        const { blockchain: { blocks } } = this;
        this.broadcast(MESSAGES.BLOCKS, blocks)
    }

    broadcast(type, value) {
        console.log(`[ws:broadcast] ${type}...`);
        const message = JSON.stringify({ type, value })
        this.sockets.forEach(socket => socket.send(message))
    }

}

export default P2PService;