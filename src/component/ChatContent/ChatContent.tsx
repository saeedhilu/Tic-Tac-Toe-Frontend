import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { WebSocketService } from '../../services/Chat';
import { useParams } from 'react-router-dom';

const HomePage: React.FC = () => {
    const { username: receiverUsername } = useParams<{ username?: string }>(); // Get receiver's username from the URL
    const [senderUsername, setSenderUsername] = useState('saeed'); // State for sender's username
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [wsService, setWsService] = useState<WebSocketService | null>(null);

    useEffect(() => {
        if (!receiverUsername) {
            console.error("Receiver's username is not defined.");
            return; // Exit early if username is undefined
        }

        // Initialize WebSocket connection
        const ws = new WebSocketService(senderUsername); // Initialize with sender username
        setWsService(ws);

        // Listen for incoming messages
        ws.onMessage((receivedMessage: string) => {
            console.log('Received message:', receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        return () => {
            // Cleanup WebSocket connection on component unmount
            ws.disconnect();
        };
    }, [receiverUsername, senderUsername]); // Update effect dependencies

    const handleSendMessage = () => {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (wsService && message.trim() && senderUsername && receiverUsername) {
            wsService.sendMessage(message, receiverUsername); // Send message along with receiver's username
            setMessage(''); // Clear the input field
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
           
            <Typography variant="h6" align="center" gutterBottom>
                Talking to: {receiverUsername}
            </Typography>

            {/* Input field for sender's username */}
            <TextField
                label="Your Username"
                variant="outlined"
                fullWidth
                value={senderUsername}
                onChange={(e) => setSenderUsername(e.target.value)} // Update sender username
                sx={{ mb: 2 }}
            />

            <List sx={{ maxHeight: 300, overflowY: 'auto', mb: 3 }}>
                {messages.map((msg, index) => (
                    
                    <ListItem key={index}>
                        <ListItemText sx={{bgcolor: msg.includes(':')? '#afafdd':'#6060d7',padding:2,borderRadius:2,} } primary={msg.includes(':')?msg:`you : ${msg}`} />
                    </ListItem>
                ))}
            </List>
            <Box display="flex" gap={2}>
                <TextField
                    label="Enter your message"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
