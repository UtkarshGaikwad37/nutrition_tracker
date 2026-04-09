import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Track from "./components/Track";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Protection from "./components/Protection";
import Diet from "./components/Diet";
import Home from "./components/Home";

function App() {
  const [loggedUser, setLoggedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nutrify-item")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("nutrify-item", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("nutrify-item");
    }
  }, [loggedUser]);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={<Protection Component={Track} />} />
          <Route path="/diet" element={<Protection Component={Diet} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
