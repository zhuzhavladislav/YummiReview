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
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/establishments" element={<Establishments/>} />
          <Route path="/establishment" element={<Establishment/>} />
          <Route path="/add" element={<Post/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
