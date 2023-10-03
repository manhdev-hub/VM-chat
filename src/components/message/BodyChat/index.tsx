import {
  FileImageOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputRef,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../../Context/app-provider";
import { AuthContext } from "../../../Context/auth-provider";
import { PRIMARY_COLOR } from "../../../constants";
import { db, storage } from "../../../firebase/config";
import { addDocument, dataURLtoFile, getIdYouTubeVideo } from "../../../utils";
import { BodyChatWrapper } from "./body-chat.styled";
import { ChatItem } from "./chat-item";

const uploadButton = (
  <div>
    <FileImageOutlined />
  </div>
);

export const BodyChat = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { selectedRoom, messages } = React.useContext(AppContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false);
  const { user } = React.useContext(AuthContext);
  const [form] = useForm();
  const messageListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlerOnSubmit = async () => {
    if (!selectedRoom) return;
    const roomsRef = doc(db, "rooms", selectedRoom.id);
    if (fileList.length > 0) {
      fileList.forEach(async (file) => {
        if (!file) return;
        const fileName = `images/${file.name + uuidv4()}`;
        const imageRef = ref(storage, fileName);
        const metadata = {
          contentType: file.type,
        };
        await uploadBytes(imageRef, file.originFileObj as any, metadata).then(
          (snapshot) => {
            setFileList([]);
          }
        );

        await getDownloadURL(ref(storage, fileName))
          .then(async (url) => {
            const requestMessage = {
              text: url,
              roomId: selectedRoom?.id,
              photoURL: user?.photoURL,
              displayName: user?.displayName,
              uid: user?.uid,
              type: "image",
            };
            await addDocument("messages", requestMessage);
            await updateDoc(roomsRef, {
              lastMessage: url,
            });
          })
          .catch((error) => {
            console.log("error", error);
            return null;
          });
      });
    }
    if (inputValue?.trim() === "") return;
    const videoYoutubeId = getIdYouTubeVideo(inputValue);
    const requestMessage: any = {
      text: inputValue,
      roomId: selectedRoom?.id,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
      uid: user?.uid,
      type: "text",
    };
    if (videoYoutubeId) requestMessage["isPlaying"] = false;
    await addDocument("messages", requestMessage);
    await updateDoc(roomsRef, {
      lastMessage: inputValue,
    });
    setInputValue("");
    form.resetFields(["message"]);
    setIsShowEmoji(false);
  };

  React.useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    inputRef.current?.focus();
  };

  const toggleEmoji = (e: any) => {
    setIsShowEmoji(!isShowEmoji);
  };

  const handlerEmojiSelected = React.useCallback(
    (emojiData: EmojiClickData) => {
      form.setFieldValue("message", inputValue.concat(emojiData.emoji));
      setInputValue(inputValue.concat(emojiData.emoji));
    },
    [form, inputValue]
  );

  React.useEffect(() => {
    document.querySelector(".body-chat")?.addEventListener("click", () => {
      setIsShowEmoji(false);
    });
  }, []);

  React.useEffect(() => {
    document.onpaste = function (event) {
      const items = event.clipboardData?.items;
      for (let index in items) {
        const item = items[index as unknown as number];
        if (item.kind === "file") {
          const blob = item.getAsFile();
          const reader = new FileReader();
          if (!blob) return;
          reader.onload = function (event) {
            if(!event.target) return;
            const fileData : any = dataURLtoFile(event.target.result as string, `screenshot${uuidv4()}.png`);
            fileData.originFileObj = fileData;
            fileData.thumbUrl = event.target.result;
            setFileList([fileData as any]);
            console.log("reader", fileData)
          };
          reader.readAsDataURL(blob);
        }
      }
    };
  }, []);

  return (
    <BodyChatWrapper>
      <div className="body-chat">
        <div className="list-chat" ref={messageListRef}>
          {messages.map((message) => (
            <ChatItem
              key={message.id}
              id={message.id}
              name={message?.displayName}
              message={message.text}
              isMe={message.uid === user?.uid}
              photoURL={message.photoURL}
              createdAt={message.createdAt?.seconds}
              isPlaying={message?.isPlaying}
              type={message.type}
            />
          ))}
        </div>
        <Form className="send-message" form={form}>
          <Form.Item name="message">
            <div
              style={{ display: "flex", alignItems: "center", gap: 2 }}
              className="upload-image"
            >
              <div className="upload-image">
                <Upload
                  action="/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>
              <Input
                ref={inputRef}
                placeholder="Write a message"
                onChange={handlerInputChange}
                onPressEnter={handlerOnSubmit}
                autoComplete="off"
                value={inputValue}
                autoFocus
                prefix={
                  <div className="send-button">
                    <SmileOutlined
                      onClick={toggleEmoji}
                      style={{ fontSize: "20px", position: "relative" }}
                    />
                    {isShowEmoji && (
                      <EmojiPicker onEmojiClick={handlerEmojiSelected} />
                    )}
                  </div>
                }
                suffix={
                  <Button className="send-button" onClick={handlerOnSubmit}>
                    <SendOutlined
                      style={{ fontSize: "20px", color: PRIMARY_COLOR }}
                    />
                  </Button>
                }
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </BodyChatWrapper>
  );
};
