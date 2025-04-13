import { useGetBooksQuery } from "./bookSlice";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBooksQuery();

  if (isLoading) {
    return <h1>is loading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.status || "Unknown error"}</h1>;
  }

  return (
    <article>
      <h2 className="book-titles">Library Catalog</h2>
      <div className="books-grid">
        {data?.map((book) => (
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
        ))}
      </div>
    </article>
  );
};

export default Books;
