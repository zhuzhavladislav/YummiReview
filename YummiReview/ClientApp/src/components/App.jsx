import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Header from "./Header/Header";
import Footer from "./Footer/Footer"
import Main from "./Main/Main";
import Establishments from "./Establishments/Establishments";
import './App.css';
import Post from "./Post/Post";
import Establishment from "./Establishment/Establishment";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Main />} />
        <Route path="/establishments" element={<Establishments />} />
        <Route path="/establishments/:id" element={<Establishment />} />
        <Route path="/add" element={<Post />} />
        <Route path="*" element={<p style={{ display: "flex", height: "60vh", fontSize: "4vw", fontWeight: 900, alignItems: "center", justifyContent: "center" }}>Ресурс не найден</p>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
