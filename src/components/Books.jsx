import { useGetBooksQuery } from "./bookSlice";
import { useNavigate } from "react-router-dom";
const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBooksQuery();

  console.log("all listed books:", data);
  if (isLoading) {
    return <h1>is loading...</h1>;
  }
  if (isError) {
    return <h1>Error: {error?.status || "Unknown error"}</h1>;
  }
  console.log("Books data:", data);

  return (
    <article>
      <h2>All the Books placeholder</h2>
      <ul className="books">
        {isLoading && <li>Loading books...</li>}
        {data?.map((book) => {
          return (
            <li key={book.id} onClick={() => navigate(`/books/${book.id}`)}>
              <h3>{book.title}</h3>
              <h4>{book.author}</h4>
              <p>{book.description}</p>
              <figure>
                <img src={book.coverimage} alt={book.title} />
              </figure>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Books;
