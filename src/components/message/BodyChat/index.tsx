import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useRef, useState } from "react";
import { AppContext } from "../../../Context/app-provider";
import { AuthContext } from "../../../Context/auth-provider";
import { PRIMARY_COLOR } from "../../../constants";
import { addDocument, getIdYouTubeVideo } from "../../../utils";
import { ChatItem } from "./chat-item";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const BodyChat = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { selectedRoom, messages } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  const [form] = useForm();
  const messageListRef = useRef<HTMLDivElement>(null);
  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlerOnSubmit = async () => {
    if (!selectedRoom) return;
    const roomsRef = doc(db, "rooms", selectedRoom.id);
    const videoYoutubeId = getIdYouTubeVideo(inputValue);
    const requestMessage : any = {
      text: inputValue,
      roomId: selectedRoom?.id,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
      uid: user?.uid,
    };
    if(videoYoutubeId) requestMessage["isPlaying"] = false;
    await addDocument("messages", requestMessage);
    await updateDoc(roomsRef, {
      lastMessage: inputValue,
    });
    form.resetFields(["message"]);
  };

  React.useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <div className="body-chat">
      <div className="list-chat" ref={messageListRef}>
        {messages.map((message) => (
          <ChatItem
            key={message.id}
            id={message.id}
            name={message?.displayName}
            message={message.text}
            isMe={message.uid === user?.uid}
            photoURL={message.photoURL}
            createdAt={message.createdAt?.seconds}
            isPlaying={message?.isPlaying}
          />
        ))}
      </div>
      <Form className="send-message" form={form}>
        <Form.Item name="message">
          <Input
            placeholder="Write a message"
            onChange={handlerInputChange}
            onPressEnter={handlerOnSubmit}
            autoFocus
            suffix={
              <Button className="send-button" onClick={handlerOnSubmit}>
                <SendOutlined
                  style={{ fontSize: "20px", color: PRIMARY_COLOR }}
                />
              </Button>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};
