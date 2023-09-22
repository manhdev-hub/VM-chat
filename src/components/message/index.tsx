import { BodyChat } from "./BodyChat";
import { Header } from "./Header";
import { MessageWrapper } from "./message.style";

export const Message = () => {
    return(
        <MessageWrapper>
            <Header/>
            <BodyChat />
        </MessageWrapper>
    );
}
