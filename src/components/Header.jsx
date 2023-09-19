import logo from "./icons8-chat-96.png";

const Header = ({connected}) => {
  return (
    <div className="header ">
      <nav className="flex w-full min-h-[10vh] bg-gray-200 justify-start items-center px-3 py-1">
     
        <ul className="flex items-center justify-start">
        <img src={logo} className="object-fill w-10 h-10 md:w-14 md:h-14"></img>
          <h1 className="text-md sm:text-lg md:text-3xl font-bold text-blue-600 transition-transform ">
            WeChat
          </h1>
          <h1 className="text-md sm:text-lg md:text-1xl font-bold text-blue-600 transition-transform right-1 absolute">
            { connected? "Socket Connected":"Socket disconnected"}
          </h1>
        </ul>{" "}
      </nav>
    </div>
  );
};

export default Header;
