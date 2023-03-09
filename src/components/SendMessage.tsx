import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SendMessage = () => {
    const [message, setMessage] = useState(''); // Skapar en state för meddelandet som sätts till en tom sträng

    // Skapar en sendMessage funktion som körs när användaren klickar på button Submit

    // sendMessage är en asynkron funktion som kollar om användaren har skrivit något i input fältet och säger till om hen inte gjort det. 

    // Om meddelandet inte är en tom sträng så skickas användarens inloggade uid, namn, profilbild och meddelandet till firebase databasen. 

    // Sen används addDoc från firebase för att lägga till meddelandet i collectionen messages i databasen. Som vi sen kommer ha tillgång till via db importen från firebase-config.tsx filen och om den collection inte finns kommer den att skapas automatiskt. 

    // Det kommer också skapa en ny dokument i collectionen med ett unikt id som är skapat av firebase. Dessa keys är unika för varje dokument och kan användas för att identifiera dokumenten och läsa eller skriva till dem.

    const sendMessage = async (event: any) => { 
        event.preventDefault();
        if (message.trim() === '') {
            alert('Please enter a message');
            return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'messages'), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
        });
        setMessage('');
    };


  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message-form"> 
        <label htmlFor='messageInput' hidden>
            Write message
        </label>
        <input type='text' id='messageInput' placeholder='Write message' onChange={(e) => setMessage (e.target.value)} /> 
        {/* // onChange eventet sätter meddelandet till det som skrivs i input fältet */}
        <button type='submit'>Send</button>
    </form>
  );
};

export default SendMessage; 