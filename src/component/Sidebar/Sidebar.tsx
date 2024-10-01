// components/Sidebar.tsx
import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

type Chat = {
  id: number;
  name: string;
  message: string;
  time: string;
};

const chats: Chat[] = [
  { id: 1, name: 'John Doe', message: 'Hey, how are you?', time: '12:00 PM' },
  { id: 2, name: 'Jane Smith', message: 'See you soon!', time: '11:30 AM' },
  { id: 3, name: 'Mike Tyson', message: 'Let`s catch up later', time: '10:45 AM' },
  { id: 4, name: 'saeed', message: 'Let`s catch up later', time: '10:45 AM' },
  { id: 5, name: 'saeed1', message: 'Let`s catch up later', time: '10:45 AM' },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        // width: '100%',
        height: '97vh',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',

      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'grey.900',
          color: 'white',
        }}  
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Your Name" src="https://via.placeholder.com/40" />
          <Typography variant="h6" sx={{ ml: 2 }}>
            You
          </Typography>
        </Box>
        <IconButton sx={{ color: 'white' }}>
          <ChatIcon />
        </IconButton>
      </Box>

      {/* Search Section */}
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          m: 2,
          bgcolor: 'grey.200',
        }}
      >
        <SearchIcon />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search or start new chat"
          inputProps={{ 'aria-label': 'search or start new chat' }}
        />
      </Paper>

    
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List>
          {chats.map((chat) => (
              <ListItem key={chat.id} component={Link} to={`/user/${chat.name}`} >
              <ListItemAvatar>
                
                <Avatar  alt={chat.name}  src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" >
              {chat.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={chat.message}
                primaryTypographyProps={{ fontWeight: 'medium',color:'black' }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {chat.time}
              </Typography>
            </ListItem>
          
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
