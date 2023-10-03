import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { signInWithPopup } from "firebase/auth";
import { auth, fbProvider } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../utils";

const { Title } = Typography;

const Login = () => {
  const handlerFbLogin = async () => {
    const { _tokenResponse, user }: any = await signInWithPopup(
      auth,
      fbProvider
    );
    if (_tokenResponse.isNewUser) {
      addDocument("user", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: _tokenResponse.providerId,
        keywords: generateKeywords(user.displayName),
        friends: [],
      });
    }
  };

  return (
    <div className="login">
      <Row justify="center" style={{ height: 800 }}>
        <Col md={{span: 8}} xs={{span: 22}}>
          <Title style={{ textAlign: "center" }} level={3}>
            VM Chat
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 5 }}
            icon={<GoogleCircleFilled style={{ color: "#DB4437" }} />}
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            style={{ width: "100%" }}
            icon={<FacebookFilled style={{ color: "#4267B2" }} />}
            onClick={handlerFbLogin}
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
