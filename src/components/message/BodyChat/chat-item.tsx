import { Avatar } from "antd";
import { formatRelative } from "date-fns";

export type ChatItemProps = {
    name: string | null,
    message: string,
    photoURL: string | null,
    isMe?: boolean,
    createdAt: number
}

export const ChatItem = ({name, message, isMe, photoURL, createdAt}: ChatItemProps) => {
  const formatDate = (seconds: number) => {
    let formattedDate = '';
    if(seconds){
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate = formattedDate.charAt(0).toLocaleUpperCase() + formattedDate.slice(1);
    }

    return formattedDate
  }
  return (
    <div className="chat-item">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Avatar src={photoURL}>{photoURL ? '' : name?.charAt(0).toLocaleUpperCase()}</Avatar>
          <p>{name}</p>
        </div>
        <p style={{ fontSize: "13px", color: "grey" }}>{formatDate(createdAt)}</p>
      </div>
      <div className={isMe ? 'chat-content me' : 'chat-content'}>
        <p>
          {message}
        </p>
      </div>
    </div>
  );
};
