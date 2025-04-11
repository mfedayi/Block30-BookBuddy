import { useGetBooksQuery } from "./bookSlice";
const Books = () => {
  const { books, isLoading, isError, error } = useGetBooksQuery();

  console.log("all listed books:", books);
  if (isLoading) {
    return <h1>is loading...</h1>;
  }
  if (isError) {
    return <h1>Error: {error?.status || "Unknown error"}</h1>;
  }
  return (
    <article>
      <h2>All the Books placeholder</h2>
      <ul className="books">
        {isLoading && <li>Loading books...</li>}
        {books.map((book) => {
          return (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <h3>{book.author}</h3>
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
