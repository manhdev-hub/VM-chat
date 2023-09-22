import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { AppContext } from "../../../Context/app-provider";
import { AuthContext } from "../../../Context/auth-provider";
import { MessageItem } from "./message-item";

export const AllMessage = () => {
  const { setIsAddFriendsVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const { rooms, users } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  const handlerAddFriendVisible = () => {
    setIsAddFriendsVisible(true);
  };

  const handlerSelectedFriend = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const friendRooms = React.useMemo(() => {
    return rooms.filter((room) => room.isFriendRoom === true);
  }, [rooms]);

  return (
    <div style={{ marginTop: "20px", marginBottom: "50px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "grey", fontWeight: 500 }}>Friends</p>
        <Button
          size="small"
          style={{ border: 0 }}
          icon={<PlusOutlined />}
          onClick={handlerAddFriendVisible}
        />
      </div>
      <div className="listMessage">
        {friendRooms.map((room) => {
          const friendId = room.members.find((member) => member !== user?.uid);
          const friend = users.find((user) => user.uid === friendId);
          return (
            <MessageItem
              key={room.id}
              name={friend?.displayName}
              lastMessage={room?.lastMessage ? room.lastMessage : ""}
              id={room.id}
              handlerSelectedFriend={handlerSelectedFriend}
            />
          );
        })}
      </div>
    </div>
  );
};
