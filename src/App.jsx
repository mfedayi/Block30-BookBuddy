import "./components/bookSlice"; // force endpoint registration
import { useEffect, useState } from "react";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import Account from "./components/Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { useGetBooksQuery } from "./components/bookSlice";

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token")// retrieve token from local storage
  }); 

  return (
    <>
      <header className="app-header">
      <h1 className="app-title">
        <img id="logo-image" src={bookLogo} />
        Book Buddy
      </h1>
      </header>

      <BrowserRouter>
        <Navigations token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
