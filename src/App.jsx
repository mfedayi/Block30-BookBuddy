import "./components/bookSlice"; // force endpoint registration
import { useState } from "react";
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
  const [token, setToken] = useState(null);
  //useGetBooksQuery(); //This will force the hook to be registered no matter what

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <BrowserRouter>
        <Navigations />
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

      <p>
        Complete the React components needed to allow users to browse a library
        catalog, check out books, review their account, and return books that
        they've finished reading.
      </p>

      <p>
        You may need to use the `token` in this top-level component in other
        components that need to know if a user has logged in or not.
      </p>

      <p>
        Don't forget to set up React Router to navigate between the different
        views of your single page application!
      </p>
    </>
  );
}

export default App;
