import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { uid } from 'uid';
import dayjs from 'dayjs';



interface SendMessageProps {
    scroll: React.RefObject<HTMLSpanElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({scroll}) => {

    const user = useSelector((state: RootState) => state.api.doUser);
    
    const [message, setMessage] = useState({
        messageId: '',
        senderId: user?.email || '', 
        username: '',
        recipient: '',
        content: '',
        timestamp: '',
        recieved: false,
        read: false,

    }); 
    
    // Skapar en state för meddelandet som sätts till en tom sträng

    // Skapar en sendMessage funktion som körs när användaren klickar på button Submit

    // sendMessage är en asynkron funktion som kollar om användaren har skrivit något i input fältet och säger till om hen inte gjort det. 

    // Om meddelandet inte är en tom sträng så skickas användarens inloggade uid, namn, profilbild och meddelandet till firebase databasen. 

    // Sen används addDoc från firebase för att lägga till meddelandet i collectionen messages i databasen. Som vi sen kommer ha tillgång till via db importen från firebase-config.tsx filen och om den collection inte finns kommer den att skapas automatiskt. 

    // Det kommer också skapa en ny dokument i collectionen med ett unikt id som är skapat av firebase. Dessa keys är unika för varje dokument och kan användas för att identifiera dokumenten och läsa eller skriva till dem.


    const sendMessage = async (event: any) => { 
        const saveMessage = {
            ...message,
            messageId: uid(),
            senderId: user?.email || '', //skickarens email
            recipient: '', //mottagares email
            timestamp: dayjs().format(),
        }
        event.preventDefault();
        if (message.content.trim() === '') {
            alert('Please enter a message');
            return;
        }

        await addDoc(collection(db, 'messages'), saveMessage);
        setMessage({
            ...message,
            content: ''
        });
        scroll.current?.scrollIntoView({ behavior: 'smooth' });

    };


  return (
      <Box component="form" display={'flex'} width={'100%'} justifyContent={'center'} px={5}  sx={{
          '& .SendMessage-root': { m: 1, minWidth: '100%', borderRadius: '0', height:'5em' } 
        }}
        noValidate
        autoComplete="off" onSubmit={(event) => sendMessage(event)}>
            <TextField  sx={{borderRadius: '10px 0px 0px 0px', backgroundColor: '#333', flex: '1'}}
                id='filled-basic'
                label='Write message'
                variant='filled'
                multiline
                maxRows={4}
                value={message.content}
                onChange={(e: any) => setMessage ({
                    ...message,
                    content: e.target.value,
                })}
                onKeyDown={(e:any) => {
                    if (e.keyCode === 13) {
                        sendMessage(e);
                    }
                }}
                />
            <Button variant="contained" sx={{borderRadius: '0px 10px 0px 0px', color: '#fff', width:'2em'}} endIcon={<SendIcon sx={{height: '2.2em', width:'2em'}} />} type='submit' />
            <Box component="span" ref={scroll} />
    </Box>
  );
};

export default SendMessage; 