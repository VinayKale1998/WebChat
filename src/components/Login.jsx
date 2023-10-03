import { useEffect, useState } from "react";
import { socket } from "../Socket";
import {useNavigate} from "react-router-dom";
import { slideIn } from "../utils/motion";
import {motion } from "framer-motion";

const Login = ({loggedIn,loginError}) => {
  const [group, setGroup] = useState("FrontEnd");
  const [userName, setName] = useState("");

const navigate = useNavigate();

useEffect(()=>{
  if(loggedIn)  navigate(`${group}/${userName}`)
},[loggedIn])

  const groupHandler = (event) => {
    console.log(event.target.value);
    setGroup(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const Login = () => {
    if (userName.trim().length === 0) {
      alert("Please provide username");
    } else {
      console.log(userName);
      console.log(group)
      socket.emit("login", { userName, group });
    }


  };
  return (
    <motion.div variants={slideIn("up", "tween",0.1,0.3)}  initial="hidden" whileInView="show"  className="flex flex-col sm:mx-[10vw] items-center md:mx-[20vw] lg:mx-[30vw] xl:mx-[30vw] text-sm sm:text-sm md:text-md lg:text-xl  sm:my-10 h-[100vh]  border-2 sm:min-h-[50vh]   sm:max-h-[50vh]  bg-blue-100  md:min-h-[50vh]">
      <div className="min-w-full  py-2 bg-blue-600  md:text-2xl text-center text-white">
        {" "}
        Login
      </div>
      <div className="flex flex-col mx-1 my-4  min-w-[90%] sm:min-w-[70%]">
        <label htmlFor="username" className=" mx-1     text-blue-600 ">
          {" "}
          Username
        </label>
        <input
          id="username"
          className="username outline-none px-1 py-1  border border-1 border-blue-800  placeholder:text-md  h-8  mx-1 my-1"
          placeholder="Enter Username"
          onChange={nameHandler}
          value={userName}
          type="text"
          minLength={4}
          maxLength={20}
        ></input>
      </div>

      <div className="flex flex-col  mx-1 my-1  min-w-[90%] sm:min-w-[70%] ">
        <label htmlFor="group" className=" mx-1     text-blue-600">
          {" "}
          Group
        </label>
        <select
          id="group"
          className="group-select  border border-1 border-blue-800   h-8   mx-1 my-1  "
          onChange={groupHandler}
        
          defaultValue={"FrontEnd"}
        >
          <option value={"FrontEnd"}> FrontEnd </option>
          <option value={"Backend"}> Backend</option>
          <option value={"Devops"}>Devops </option>
        </select>
      </div>
    
      <div className="flex flex-col mx-1   min-w-[90%] sm:min-w-[70%] items-center my-10">
      {loginError&&<h1 className="text-red-600">{loginError.message}</h1>}
        <button
          className="enterchat bg-blue-600 rounded-md px-1 py-1 my-1  text-white font-bold w-[50%]   border border-1 border-blue-800  mx-1  hover:scale-105 hover:text-white  lg:text-xl "
          type="button"
          onClick={Login}
        >
          Enter Chat
        </button>
      </div>
    </motion.div >
  );
};

export default Login;
