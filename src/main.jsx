import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Room from "./pages/room.jsx";
import QuestionRoom from "./pages/questionroom.jsx";


createRoot(document.getElementById('root')).render(
    <Router basename='/GuessWho'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/qroom" element={<QuestionRoom />} />
      </Routes>
    </Router>
)
