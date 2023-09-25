import { Avatar, Typography } from "antd";

type MessageItemProps = {
  name?: string | null;
  lastMessage: string;
  id: string;
  handlerSelectedFriend: (friendId: string) => void;
};

export const MessageItem = ({ name, lastMessage, id,handlerSelectedFriend }: MessageItemProps) => {
  const selectedFriendId = () => {
    handlerSelectedFriend(id)
  }
  return (
    <div className="message-item" onClick={selectedFriendId}>
      <div>
        <Avatar
          style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          size="large"
        >
          {name?.charAt(0).toUpperCase()}
        </Avatar>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <div style={{maxWidth: "178px"}}>
          <p style={{marginBottom: "5px", fontWeight: 500}}>{name}</p>
          <p style={{fontSize: "15px"}}>{lastMessage}</p>
        </div>
        <p>1:30PM</p>
      </div>
    </div>
  );
};
