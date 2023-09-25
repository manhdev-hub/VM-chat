import { Avatar } from "antd";
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
};

export const ChatItem = ({
  name,
  message,
  isMe,
  photoURL,
  createdAt,
  id,
  isPlaying,
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

  return (
    <div className={videoYoutubeId ? `chat-item video-message` : `chat-item`}>
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
        {videoYoutubeId ? (
          <ReactPlayer
            url={message}
            width="560px"
            height="315px"
            playing={isPlaying ? isPlaying : false}
            controls={true}
            onPlay={handlerPlay}
            onPause={handlerPause}
          />
        ) : isUrlValidation ? (
          <a target="_blank" rel="noreferrer" href={message}>
            {message}
          </a>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};
