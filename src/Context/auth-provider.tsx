import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

interface IAuthProvider {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
  photoURL: string | null;
  friends?: User[];
  id?: string
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<IAuthProvider>(null!);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL});
        setIsLoading(false);
        navigate("/");
        return;
      }
      navigate("/login");
      setIsLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
