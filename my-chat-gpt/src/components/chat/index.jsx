import React from 'react';
import {
  useMultiChatLogic, //hook que nos ayuda a mantener la logica del chat
  MultiChatSocket, // componente que se conecta al servidor de chat 
  MultiChatWindow // es el componente que muestra la ventana del chat.
} from "react-chat-engine-advanced";

import Header from "@/components/customHeader";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID, //el projectId que se utiliza para identificar el proyecto de chat que estamos utilizando.
    "AliceAI", // el nombre del usuario que estamos utilizando para conectarnos al chat
    "12345" //el token que se utiliza para autenticarse con el servidor de chat.
  )
  return (
    <div style={{flexBasis:"100%"}}>
      <MultiChatSocket {...chatProps}/>
      <MultiChatWindow 
        {...chatProps}
        style={{height: "100vh"}}
        renderChatHeader={(chat)=><Header chat={chat}/>}
      />
    </div>
  )
}

export default Chat