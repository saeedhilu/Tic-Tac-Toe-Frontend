// // services/websocketService.ts

// export class WebSocketService {
//     private socket: WebSocket | null = null;
//     private readonly username: string;

//     constructor(username: string) {
//         this.username = "saeed";
//         this.connect();
//     }

//     connect() {
//         const wsUrl = `ws://localhost:8000/ws/${this.username}/`;
//         this.socket = new WebSocket(wsUrl);

//         this.socket.onopen = () => {
//             console.log("WebSocket connection opened");
//         };

//         this.socket.onclose = () => {
//             console.log("WebSocket connection closed, reconnecting...");
//             setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
//         };

//         this.socket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };
//     }

//     sendMessage(message: string) {
//         if (this.socket && this.socket.readyState === WebSocket.OPEN) {
//             this.socket.send(JSON.stringify({ message }));
//         }
//     }

//     onMessage(callback: (message: string) => void) {
//         if (this.socket) {
//             this.socket.onmessage = (event) => {
//                 const data = JSON.parse(event.data);
//                 callback(data.message);
//             };
//         }
//     }

//     disconnect() {
//         if (this.socket) {
//             this.socket.close();
//         }
//     }
// }



export class WebSocketService {
    private socket: WebSocket | null = null;
    private readonly username: string;

    constructor(username: string) {
        console.log('current uesr name is :',username);
        
        this.username = username; // Use the username passed in the constructor
        this.connect();
    }

    connect() {
        const wsUrl = `ws://localhost:8000/ws/${this.username}/`;
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connection opened");
        };

        this.socket.onclose = () => {
            console.log("WebSocket connection closed, reconnecting...");
            setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    // Update sendMessage to include sender and receiver
    sendMessage(message: string, receiver: string) {
        console.log('message and receiver',message,receiver);
        
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ 
                message, 
                sender: this.username,  // Current user as sender
                receiver                // The recipient of the message
            }));
        }
    }

    onMessage(callback: (message: string) => void) {
        if (this.socket) {
            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                callback(data.message);  // Pass the received message to the callback
            };
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}
