import { useState } from "react";
import { socket } from "../Socket";
import { useParams } from "react-router-dom";

function ChatPage(props) {
  const [message, setMessage] = useState("");
  const { group, userName } = useParams();

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim().length > 0)
      socket.emit("message", {
        message: message.trim(),
        group: group,
        userName: userName,
      });
  };
  return (
    <div className=" flex flex-col chat-main text-sm sm:text-sm md:text-md lg:text-xl min-w-full px-2 py-2 items-center">
      <div className="groupName w-[50%] mx-1 my-1 px-1 py-1 bg-blue-400">
        {group}{" "}
      </div>
      <div className="chat-members flex min-w-[50%] min-h-[40vh] max-h-[40vh] ">
        <div className=" flex flex-col group-members min-w-[20%] ">
          <h1 className="text-xl w-full bg-blue px-1 py-1 bg-blue-600 text-white min-h-[12%]">
            {" "}
            Active Members
          </h1>
          <div className="bg-blue-100 self-stretch min-h-[88%] overflow-y-auto">
            {" "}
            {props.groupUsers.map((user, index) => (
              <h1 key={index} className="px-1 py-1">
                {user.userName}{" "}
              </h1>
            ))}
          </div>
        </div>
        <div className="Messages px-1 py-1 min-w-[80%]   flex flex-col justify-end">
          <div className="w-full min-h-[85%] max-h-[85%] overflow-scroll">
            {" "}
            {props.messages?.length > 0 &&
              props.messages.map((message, index) => (
                <div key={index} className=" flex flex-col mx-1 my-1 px-1 py-1 rounded-md bg-gray-300 text-xs sm:text-md w-auto">
                <h1 className="font-bold  ">{message.userName}</h1>
                <h1 className="px-2">{message.message}</h1>
                </div>
              ))}
          </div>

          <div className="flex w-full min-h-[15
            %]">
            {" "}
            <input
              type="text"
              maxLength={100}
              placeholder="Type message here..."
              className="outline-none border border-1 border-blue-400 mx-1 my-1 min-w-[70%]"
              value={message}
              onChange={messageHandler}
            ></input>
            <button
              className="px-1 py-1 mx-1 my-1 bg-blue-500 rounded-md w-24"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
