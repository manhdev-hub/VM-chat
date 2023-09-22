import { Avatar, Form, Modal, Select, Space, Spin } from "antd";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React from "react";
import { AppContext } from "../../Context/app-provider";
import { db } from "../../firebase/config";
import { AuthContext, User } from "../../Context/auth-provider";
import { addDocument } from "../../utils";

type Option = {
  label: string;
  value: string;
  photoURL: string;
};

type AddFriends = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

const { Option } = Select;

const DebounceSelect = ({
  fetchOptions,
  timeout = 300,
  currentMembers,
  ...props
}: any) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);

  const debounceFetch = React.useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions: Option[]) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, timeout);
  }, [fetchOptions, timeout]);

  return (
    <Select
      labelInValue
      onSearch={debounceFetch}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value} label={opt.label}>
          <Space>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0).toLocaleUpperCase()}
            </Avatar>
            {opt.label}
          </Space>
        </Option>
      ))}
    </Select>
  );
};

export const AddFriendsModal = () => {
  const { isAddFriendsVisible, setIsAddFriendsVisible } =
    React.useContext(AppContext);
  const { users: allUsers } = React.useContext(AppContext);
  const { user } = React.useContext(AuthContext);
  const [searchUserList, setSearchUserList] = React.useState<Option[]>([]);
  const [users, setUsers] = React.useState<AddFriends[]>([]);
  const [form] = Form.useForm();
  const [value, setValue] = React.useState<Option[]>([]);
  const handlerOk = async () => {
    if (users.length > 0 && user?.uid && user) {
      const userFilter: any = allUsers.find((u) => u.uid === user.uid);
      const usersRef = doc(db, "user", userFilter.id);
      users.map(async (u) => {
        const userFriendFilter: any = allUsers.find((uf) => uf.uid === u.uid);
        const friendsRef = doc(db, "user", userFriendFilter.id);
        addDocument("rooms", {
          name: user.displayName + u.displayName,
          members: [user?.uid, u.uid],
          isFriendRoom: true,
        });
        await updateDoc(usersRef, {
          friends: [u],
        });
        await updateDoc(friendsRef, {
          friends: [user],
        });
      });
    }
    setIsAddFriendsVisible(false);
    form.resetFields();
  };

  const handlerCancel = () => {
    setIsAddFriendsVisible(false);
    form.resetFields();
  };

  const fetchUserList = async (search: string, currentMembers: string[]) => {
    let documents: Option[] = [];
    let user: AddFriends[] = [];
    const q = query(
      collection(db, "user"),
      where("keywords", "array-contains", search),
      orderBy("displayName"),
      limit(20)
    );
    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        documents.push({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        });
        user.push({
          displayName: doc.data().displayName,
          email: doc.data().email,
          photoURL: doc.data().photoURL,
          uid: doc.data().uid,
        });
      });
      setSearchUserList(documents);
      setUsers(user);
    });
    return documents;
  };

  return (
    <div>
      <Modal
        title="Tìm thêm bạn bè"
        open={isAddFriendsVisible}
        onOk={handlerOk}
        onCancel={handlerCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên bạn bè"
            value={value}
            placeholder="Nhập tên người dùng"
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => setValue(newValue)}
            style={{ width: "100%" }}
          />
        </Form>
      </Modal>
    </div>
  );
};
