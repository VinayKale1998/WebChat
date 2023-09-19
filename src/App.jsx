import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import { socket } from "./Socket";
import { useEffect } from "react";
import {createBrowserRouter,RouterProvider,useNavigate} from "react-router-dom"
import Login from "./components/Login";
import ChatPage from "./Pages/ChatPage";


function App() {


  
  const [connected,setConnected] = useState(socket.connected);
  const [loggedIn,setLoggedIn] = useState(false);
  const [user,setUser]= useState(null);
  const [loginError,setLoginError] = useState(null);
  const [groupUsers, setGroupUsers] = useState([]);
  const[messages, setMessages] = useState([]);
  



  useEffect(()=>{


    function onConnect()

    {
      setConnected(socket.connected);
      console.log("Connected")

    }
    function onDisconnect()

    {
      setConnected(false);
      
    }

    function loginHandler(data) {

      console.log("Logged in");

      setLoggedIn(true);
      setUser(data.user);
      console.log("user is ",data.user);
    }

    function errorHandler(data){

   setLoginError(data);
    }


    function enterHandler(data)
    {
      
      console.log(data.message)
    }

    function groupUsersHandler(data)
    {
      setGroupUsers(data);
    }
    function messageHandler(message)

    {
      console.log(message.message)
      setMessages(prev=>[...prev,message])
    }
    socket.on("connect",onConnect);
    socket.on("disconnect",onDisconnect)


    socket.on("loggedIn",loginHandler)
    socket.on("loginError",errorHandler)
    socket.on("entered", enterHandler);
    socket.on("groupUsers", groupUsersHandler);
    socket.on("message",messageHandler)

    return ()=>{
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);


    }
 
  },[]);


  const router = createBrowserRouter([
    {
      path:'/', element:<LoginPage connected={connected} ></LoginPage>,
      children:[

        {
          index:true,
          element:<Login loggedIn={loggedIn} loginError={loginError}></Login>

        },
        {
          path:"/:group/:user",
          element:<ChatPage groupUsers={groupUsers} user={user} messages={messages}></ChatPage>
        }
      ]
    },
    
  ])

  return (<RouterProvider router={router}></RouterProvider>);
}

export default App;
