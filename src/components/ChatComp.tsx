import { useRef, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { Message } from "../types";
import { Box } from '@mui/system';
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";


const ChatComp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const conversation = query(collection(db, "messages"), orderBy("createdAt"), limit(50));

    const unsubscribe = onSnapshot(conversation, (QuerySnapShot) => {
      let messages: any = [];
      QuerySnapShot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return unsubscribe;
  }, []);

  return (
    <Box >
      <Box sx={{ maxWidth: '75vh', overflow: 'hidden'}}>
        {messages?.map((message) => (
          // Är detta fel relaterat till att jag använder mig av en array med objekt? Eller till jag använder google auth?
          <Messages key={message.id} message={message} />  
        ))}
        <Box component="span" ref={scroll} ></Box>
      </Box>
      <Box >
        <SendMessage scroll={scroll} />
      </Box>
    </Box>
  );
};

export default ChatComp;
