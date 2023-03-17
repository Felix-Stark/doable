import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface MessageProps {
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
    createdAt: {
      toDate: () => Date;
    };
  };
}

interface ChatBubbleProps {
  alignRight: boolean;
}

const ChatBubble = styled('div')<ChatBubbleProps>(({ theme, alignRight }) => ({
  display: 'flex',
  flexDirection: alignRight ? 'row-reverse' : 'row',
  alignItems: 'flex-end',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ChatBubbleLeft = styled('img')(({ theme }) => ({
  width: '50px',
  height: '50px',
  marginRight: theme.spacing(1),
  borderRadius: '50%',
}));

const ChatBubbleRight = styled('div')<ChatBubbleProps>(({ theme, alignRight }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: alignRight ? '#E6F7FF' : '#F0F2F5',
  padding: theme.spacing(1),
  borderRadius: '10px',
  maxWidth: '60%',
}));

const Message = ({ message }: MessageProps) => {
  const [user] = useAuthState(auth);

  return (
    <ChatBubble alignRight={message.uid === user?.uid}>
      <ChatBubbleLeft sx={{width: "1.5em", height: "1.5em"}} src={message.avatar} alt="avatar" />
      <ChatBubbleRight alignRight={message.uid === user?.uid}>
        <Typography >{message.text}</Typography>
        {/* <Typography >{message.name}</Typography> */}
      </ChatBubbleRight>
    </ChatBubble>
  );
};

export default Message;
