import { SideBar } from "../../components/side-bar";
import { ChatWrapper } from "./chats.styled";
import { Message } from "../../components/message";
import React from "react";
import { AppContext } from "../../Context/app-provider";
import { Welcome } from "../../components/welcome";

const Chats = () => {
  const { selectedRoom } = React.useContext(AppContext);
  return (
    <ChatWrapper>
      <SideBar />
      {selectedRoom ? <Message /> : <Welcome />}
    </ChatWrapper>
  );
};

export default Chats;
