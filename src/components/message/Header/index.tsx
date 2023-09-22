import { Avatar, Button, Tooltip } from "antd";
import React from "react";
import { AppContext } from "../../../Context/app-provider";
import { UserAddOutlined } from "@ant-design/icons";
import { PRIMARY_COLOR } from "../../../constants";
import { AuthContext } from "../../../Context/auth-provider";

export const Header = () => {
  const { selectedRoom, members, users, setIsInviteMembersVisible } =
    React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);

  const handlerVisibleInviteModal = () => {
    setIsInviteMembersVisible(true);
  };

  const friendId = React.useMemo(() => {
    return selectedRoom?.members.find((member) => member !== user?.uid);
  }, [selectedRoom?.members, user?.uid]);

  const friend = React.useMemo(() => {
    return users.find((user) => user.uid === friendId);
  }, [friendId, users]);

  return (
    <div className="message-header">
      {selectedRoom?.isFriendRoom ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={friend?.photoURL}>
            {friend?.photoURL
              ? ""
              : friend?.displayName
              ? friend.displayName.charAt(0).toLocaleUpperCase()
              : "U"}
          </Avatar>
          <div>
            <p style={{ fontWeight: 500 }}>{friend?.displayName}</p>
            <p
              style={{
                color: PRIMARY_COLOR,
                fontSize: "12px",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              Online
            </p>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p
              style={{ marginBottom: "5px", fontWeight: 700, fontSize: "20px" }}
            >
              {selectedRoom?.name}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {selectedRoom?.description}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              icon={<UserAddOutlined />}
              onClick={handlerVisibleInviteModal}
              style={{ border: 0 }}
            >
              Mời
            </Button>
            <Avatar.Group
              maxCount={2}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {members.map((member) => (
                <Tooltip key={member.uid} title={member.displayName}>
                  <Avatar
                    src={member.photoURL}
                    style={{ backgroundColor: "#87d068" }}
                  >
                    {member.photoURL
                      ? ""
                      : member.displayName?.charAt(0).toLocaleUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </>
      )}
    </div>
  );
};
