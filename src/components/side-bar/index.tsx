import { SideBarWrapper } from "./side-bar.style";
import { Button, Typography, Input } from "antd";
import { SettingOutlined, SearchOutlined } from "@ant-design/icons";
import { PRIMARY_COLOR } from "../../constants";
import { Group } from "./Group";
import { AllMessage } from "./Message";
import React from "react";
import {  signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AppContext } from "../../Context/app-provider";

export const SideBar = () => {
  const { Title } = Typography;
  const {isOpenChat} = React.useContext(AppContext);
  return (
    <SideBarWrapper className={isOpenChat ? "open-chat" : ""}>
      <div className="heading">
        <Title>VM Chat</Title>
        <Button onClick={() => signOut(auth)}>Đăng xuất</Button>
        <Button>
          <SettingOutlined style={{ fontSize: "16px", color: PRIMARY_COLOR }} />
        </Button>
      </div>
      <div style={{marginTop: "70px",}}>
        <p
          style={{
            color: PRIMARY_COLOR,
            fontSize: "16px",
            fontWeight: 500
          }}
        >
          Message
        </p>
        <Input
          style={{ marginTop: "30px" }}
          placeholder="Search"
          prefix={<SearchOutlined />}
          autoComplete="off"
        />
      </div>
      <Group />
      <AllMessage />
    </SideBarWrapper>
  );
};
