import { Avatar, Image } from "antd";
import { formatRelative } from "date-fns";
import { getIdYouTubeVideo, validationUrl } from "../../../utils";
import ReactPlayer from "react-player";
import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export type ChatItemProps = {
  name: string | null;
  message: string;
  photoURL: string | null;
  isMe?: boolean;
  createdAt: number;
  id: string;
  isPlaying?: boolean;
  type: string;
};

export const ChatItem = ({
  name,
  message,
  isMe,
  photoURL,
  createdAt,
  id,
  isPlaying,
  type,
}: ChatItemProps) => {
  const formatDate = (seconds: number) => {
    let formattedDate = "";
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate =
        formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  };

  const videoYoutubeId = getIdYouTubeVideo(message);
  const isUrlValidation = validationUrl(message);

  const handlerPlay = () => {
    const messagesRef = doc(db, "messages", id);
    updateDoc(messagesRef, {
      isPlaying: true,
    });
  };

  const handlerPause = () => {
    const messagesRef = doc(db, "messages", id);
    updateDoc(messagesRef, {
      isPlaying: false,
    });
  };

  const renderMessage = () => {
    if (type === "image") {
      return (
        <div>
          <Image width={300} src={message} />
        </div>
      );
    }
    
    if (videoYoutubeId) {
      return (
        <ReactPlayer
          url={message}
          width="560px"
          height="315px"
          playing={isPlaying ? isPlaying : false}
          controls={true}
          onPlay={handlerPlay}
          onPause={handlerPause}
        />
      );
    }

    if (isUrlValidation) {
      return (
        <a target="_blank" rel="noreferrer" href={message}>
          {message}
        </a>
      );
    }

    return <p>{message}</p>;
  };

  return (
    <div
      className={
        type === "image"
          ? `chat-item image-message`
          : videoYoutubeId
          ? `chat-item video-message`
          : `chat-item`
      }
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Avatar src={photoURL}>
            {photoURL ? "" : name?.charAt(0).toLocaleUpperCase()}
          </Avatar>
          <p>{name}</p>
        </div>
        <p style={{ fontSize: "13px", color: "grey" }}>
          {formatDate(createdAt)}
        </p>
      </div>
      <div className={isMe ? "chat-content me" : "chat-content"}>
        {renderMessage()}
      </div>
    </div>
  );
};
