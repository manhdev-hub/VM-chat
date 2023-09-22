import { Avatar } from "antd";
import { WelcomeWrapper } from "./welcome.style";
import { AuthContext } from "../../Context/auth-provider";
import React from "react";
import { PRIMARY_COLOR } from "../../constants";

export const Welcome = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <WelcomeWrapper>
      <div className="header">
        <div style={{border: "2px solid", borderColor: PRIMARY_COLOR, borderRadius: "50%"}}>
            <Avatar src={user?.photoURL} size={80}>
            {user?.photoURL
                ? ""
                : user?.displayName?.charAt(0).toLocaleUpperCase()}
            </Avatar>
        </div>
        <div>
            <p>Welcome</p>
            <h1>{user?.displayName ?? `User ${user?.uid}`}</h1>
        </div>
      </div>
      <h1 className="title">Hãy bắt đầu cuộc trò chuyện của bạn</h1>
    </WelcomeWrapper>
  );
};
