import { useGetBooksQuery } from "./bookSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; //track user input into filter bar

const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBooksQuery(); //fetch all books
  const [searchTerm, setSearchTerm] = useState(""); //state to track filtered books

  if (isLoading) {
    return <h1>is loading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.status || "Unknown error"}</h1>;
  }

  const filteredBooks = data?.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) //filter books by title
  );

  return (
    <article>
      <h2 className="book-titles">Our Library Catalog</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} //update search term
            className="search-input"
           />
        </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
            <div
              key={book.id} 
              className="book-card"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <img
                src={book.coverimage && book.coverimage.startsWith("http") 
                  ? book.coverimage
                  : "https://placehold.co/150x250?text=No+Cover"}
                alt={book.title}
                className="book-cover"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "https://placehold.co/150x250?text=No+Cover";
                }}
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
            </div>
         ))
        ) : (
          <h3> No books found matching your search</h3>
        )}
      </div>
    </article>
  );
};
export default Books;