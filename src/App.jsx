import { useState } from "react";
import bookLogo from "./assets/books.png";
import Navigations from "./components/Navigations";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <BrowserRouter>
        <Navigations />
        <Routes>
          <Route>path="/Account"element={<Account />}</Route>
          <Route>path="/" element={<Books />}</Route>
          <Route>path="/Login"element={<Login />}</Route>
          <Route>path="/Register"element={<Register />}</Route>
          <Route>path="/SingleBook"element={<SingleBook />}</Route>
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
