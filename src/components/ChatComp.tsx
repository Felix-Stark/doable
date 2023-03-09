import { useRef, useEffect , useState} from "react";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import {db, auth} from '../firebase-config'
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";
import Conversation from "./Conversation";
import { Message } from "../types";




const ChatComp = () => {
   const [ messages , setMessages ] = useState<Message[]>([]);
   
   // Skapar en useEffect hook som körs när en ändring sker i chatten som till exempel när en användare skriver eller raderar ett meddelande.

   // Skapat en konstant som heter conversation som är en query som letar i databasen efter collectionen messages och använder createdAt key och returnerar 40 meddelanden (sparade meddelanden).

   // Unsubscribe är en konstant som representerar onSnapshot funktionen som lyssnar på ändringar i documenten i collectionen messages och returnerar en QuerySnapshot som innehåller alla dokument i collectionen messages. Den har en tom array som default värde. Men sätter sen en ny array med alla meddelanden som finns i databasen.

   useEffect(() => {
    const conversation = query(collection(db, 'messages'), orderBy('createdAt'), limit(40));
    const unsubscribe = onSnapshot (conversation, (QuerySnapShot) => {
      let messages: any = [];
      QuerySnapShot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });
    return unsubscribe;
    
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">        
        {messages?.map((message) => (
          <Conversation key={message.messageId} message={message} />
          ))}
      </div>
      <SendMessage  />
    </main>
  );
  
}
  export default ChatComp;
