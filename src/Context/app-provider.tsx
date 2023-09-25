import React, { useState } from "react";
import { ConditionType, useFireStore } from "../hooks/useFirestore";
import { AuthContext, User } from "./auth-provider";

export interface Room {
  name: string;
  description: string;
  members: string[];
  createdAt: string;
  id: string
  isFriendRoom?: boolean;
  lastMessage?: string;
}

export type MessageType = {
  displayName: string | null;
  photoURL: string | null;
  roomId: string;
  text: string;
  uid: string;
  createdAt: any;
  id: string;
  isPlaying?: boolean;
};


export interface Friend {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  members: string[];
  createdAt: string;
  id: string
}

export interface IAppProvider {
  rooms: Room[];
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoomId: string;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>;
  isInviteMembersVisible: boolean;
  setIsInviteMembersVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoom?: Room;
  members: User[];
  searchUserList: User[];
  setSearchUserList: React.Dispatch<React.SetStateAction<User[]>>;
  isAddFriendsVisible: boolean;
  setIsAddFriendsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  users: User[];
  messages: MessageType[];
}

export const AppContext = React.createContext<IAppProvider>(null!);

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const { user } = React.useContext(AuthContext);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMembersVisible, setIsInviteMembersVisible] = useState(false);
  const [isAddFriendsVisible, setIsAddFriendsVisible] = useState(false);
  const [searchUserList, setSearchUserList] = useState<User[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");


  const roomsCondition: ConditionType = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.uid ?? "0",
    };
  }, [user?.uid]);
  const rooms: Room[] = useFireStore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );

  const userCondition: ConditionType = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: selectedRoom?.members ? 'in' : '==',
      compareValue: selectedRoom?.members ? selectedRoom.members : [],
    };
  }, [selectedRoom?.members]);

  const members = useFireStore("user", userCondition);

  const users = useFireStore("user");

  
  const condition: ConditionType = React.useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom ? selectedRoom?.id : [],
    };
  }, [selectedRoom]);

  const messages: MessageType[] = useFireStore("messages", condition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMembersVisible,
        setIsInviteMembersVisible,
        searchUserList,
        setSearchUserList,
        isAddFriendsVisible,
        setIsAddFriendsVisible,
        users,
        messages
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
