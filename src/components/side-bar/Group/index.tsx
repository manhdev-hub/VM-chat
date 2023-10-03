import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { AppContext } from "../../../Context/app-provider";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export const Group = () => {
  const screens = useBreakpoint();
  const { rooms, setIsAddRoomVisible, setSelectedRoomId, setIsOpenChat } =
    React.useContext(AppContext);
  const handlerAddRoomVisible = () => {
    setIsAddRoomVisible(true);
  };

  const handlerSelectedRoom = (roomId: string) => {
    if(screens.sm || screens.xl || screens.xs || screens.xxl){
      setIsOpenChat(true);
    }
    setSelectedRoomId(roomId);
  };

  const filterRooms = rooms.filter((room) => room.isFriendRoom !== true);

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "grey", fontWeight: 500 }}>Groups</p>
        <Button
          size="small"
          style={{ border: 0 }}
          icon={<PlusOutlined />}
          onClick={handlerAddRoomVisible}
        />
      </div>
      <div className="listGroup">
        {filterRooms.length > 0 ? (
          filterRooms.map((room: any) => (
            <p
              style={{ marginBottom: "10px" }}
              onClick={() => handlerSelectedRoom(room.id)}
              key={room.id}
            >
              {room.name}
            </p>
          ))
        ) : (
          <div>
            <p>Hiện tại bạn chưa có nhóm nào!</p>
          </div>
        )}
      </div>
    </div>
  );
};
