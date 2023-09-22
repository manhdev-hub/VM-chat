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
import { User } from "../../Context/auth-provider";

type Option = {
  label: string;
  value: string;
  photoURL: string;
};

const { Option } = Select;

const DebounceSelect = ({ fetchOptions, timeout = 300, currentMembers, ...props }: any) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);

  const debounceFetch = React.useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, currentMembers).then((newOptions: Option[]) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, timeout);
  }, [currentMembers, fetchOptions, timeout]);

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

export const InviteMemberModel = () => {
  const { isInviteMembersVisible, setIsInviteMembersVisible } =
    React.useContext(AppContext);
  const { selectedRoom } = React.useContext(AppContext);
  const [searchUserList, setSearchUserList] = React.useState<Option[]>([]);
  const [form] = Form.useForm();
  const [value, setValue] = React.useState<Option[]>([]);
  const handlerOk = async () => {
    if (!selectedRoom) return;
    const roomsRef = doc(db, "rooms", selectedRoom.id);
    await updateDoc(roomsRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setIsInviteMembersVisible(false);
    form.resetFields();
  };

  const handlerCancel = () => {
    setIsInviteMembersVisible(false);
    form.resetFields();
  };

  const fetchUserList = async (search: string, currentMembers: string[]) => {
    let documents: Option[] = [];
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
      });
      const newDocuments = documents.filter(opt => !currentMembers.includes(opt.value));
      documents = newDocuments;
      setSearchUserList(newDocuments);
    });
    return documents;
  };

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMembersVisible}
        onOk={handlerOk}
        onCancel={handlerCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => setValue(newValue)}
            style={{ width: "100%" }}
            currentMembers={selectedRoom?.members}
          />
        </Form>
      </Modal>
    </div>
  );
};
