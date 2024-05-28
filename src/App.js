import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import SetDatabase from "./pages/SetDatabase";

import './App.css';
//import './Appwrite.js'


export default function App() {
  return (
    <BrowserRouter basename="/R6Suiran_Timeshock">
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/Quiz`} element={<Quiz />} />
        <Route path={`/SetDatabase`} element={<SetDatabase />} />
      </Routes>
    </BrowserRouter>
  );
}