import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import TimeShock from "./pages/TimeShock";
import './App.css';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/Quiz`} element={<Quiz />} />
        <Route path={`/TimeShock`} element={<TimeShock />} />
      </Routes>
    </BrowserRouter>
  );
}