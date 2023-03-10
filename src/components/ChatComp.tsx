import { useRef, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { Message } from "../types";
import { Box } from '@mui/system';


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
      <Box >
        {messages?.map((message) => (
          <Messages key={message.id} message={message} />
        ))}
        <span ref={scroll} ></span>
      </Box>
      <Box >
        <SendMessage scroll={scroll} />
      </Box>
    </Box>
  );
};

export default ChatComp;
