import React from "react";
import { AppContext } from "../../Context/app-provider";
import { BodyChat } from "./BodyChat";
import { Header } from "./Header";
import { MessageWrapper } from "./message.style";

export const Message = () => {
    const {isOpenChat} = React.useContext(AppContext);
    return(
        <MessageWrapper className={isOpenChat ? "open-chat" : ""}>
            <Header/>
            <BodyChat />
        </MessageWrapper>
    );
}
