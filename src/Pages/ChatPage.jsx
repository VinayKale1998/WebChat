import { useState } from "react"
import { socket } from "../Socket";
import { useParams } from "react-router-dom";



function ChatPage(props) {

  const[message,setMessage]= useState("");
  const params=useParams();
  const group=params.group;
  const userName= params.userName;

  const messageHandler=(event)=>{
    setMessage(event.target.value);
  }  

  const sendMessage=()=>{
    if(message.trim().length>0)
    socket.emit("message",{message:message.trim(), group:group, userName:userName});
  }
  return (
    <div className="chat-main text-sm sm:text-sm md:text-md lg:text-xl"><h1>ChatPage</h1>
    
    <div>{props.groupUsers.map((user,index)=><h1 key={index}>{user.userName} </h1>)}</div>

    <h1 className="text-3xl mx-4 my-4 text-blue-900">Messages</h1>
    <div>
    {
      props.messages?.length>0&& props.messages.map((message,index)=><h1 key={index}> {message.userName}: {message.message}</h1>)
    }
    </div>
  
    <input type="text" maxLength={100} placeholder="Type message here..."  className="outline-none border border-1 border-blue-400 mx-1 my-1" value={message}  onChange={messageHandler}></input>
    <button className="px-2 py-2 mx-1 my-1 bg-blue-500 rounded-md w-24" onClick={sendMessage}>Send</button>
    </div>
   
  )
}

export default ChatPage
