import { Form, Input, Modal } from "antd";
import React from "react";
import { AppContext } from "../../Context/app-provider";
import { addDocument } from "../../utils";
import { AuthContext } from "../../Context/auth-provider";

export const AddRoomModel = () => {
    const {isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
    const {user} = React.useContext(AuthContext);
    const [form] = Form.useForm();
    const handlerOk = () => {
        addDocument('rooms', {...form.getFieldsValue(), members: [user?.uid]})
        setIsAddRoomVisible(false);
        form.resetFields();
    }

    const handlerCancel = () => {
        setIsAddRoomVisible(false);
        form.resetFields();
    }
    return(
        <div>
            <Modal 
                title="Tạo phòng"
                open={isAddRoomVisible}
                onOk={handlerOk}
                onCancel={handlerCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
