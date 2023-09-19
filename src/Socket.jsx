import io from "socket.io-client";


//"undefined" means the URL will be fetched from the window.location object if the NOD_ENV is prod
const URL= "http://localhost:4000";


export const socket = io(URL);