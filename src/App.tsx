import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./pages/chats";
import Login from "./pages/login";
import AuthProvider from "./Context/auth-provider";
import AppProvider from "./Context/app-provider";
import { AddRoomModel } from "./components/modals/add-room";
import { InviteMemberModel } from "./components/modals/invite-members";
import { AddFriendsModal } from "./components/modals/add-friends";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <AddRoomModel />
          <InviteMemberModel />
          <AddFriendsModal />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
