import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { auth, db } from "../firebase-config"
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"
import ButtonBase from "@mui/material/ButtonBase"
import Stack from "@mui/material/Stack"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { createTheme } from "@mui/system"




const ChatComp = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    



  return (
    <div>ChatComp</div>
  )
}

export default ChatComp