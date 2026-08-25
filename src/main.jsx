import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Room from "./pages/Room.jsx";
import QuestionRoom from "./pages/QuestionRoom.jsx";
import WhoAnsweredRoom from "./pages/WhoAnsweredRoom.jsx";
import TeamRoom from "./pages/TeamRoom.jsx";
import { applyTheme, getStoredTheme } from "./utils/theme";

// Applied before the first render so there's no flash of the wrong theme.
applyTheme(getStoredTheme());

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/qroom" element={<QuestionRoom />} />
        <Route path="/waroom" element={<WhoAnsweredRoom />} />
        <Route path="/teamroom" element={<TeamRoom />} />
      </Routes>
    </Router>
)
