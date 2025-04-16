import { useParams } from "react-router-dom";
import {
  useGetBookQuery,
  useCheckOutBookMutation,
  useReturnBookMutation,
} from "./bookSlice";
import { useGetReservationsQuery } from "./userSlice";

const SingleBook = () => {
  const { id } = useParams(); //get the book id from the URL
  const { data: book, isLoading, isError, error } = useGetBookQuery(id); //fetch the book data using the id
  const [checkOutBook] = useCheckOutBookMutation();
  const [returnBook] = useReturnBookMutation();
  const { data: reservations, status } = useGetReservationsQuery();

  if (isLoading) {
    return <h1> Loading... </h1>;
  }

  if (isError) {
    return <h1>Error: {error?.status || "Unknown error"}</h1>;
  }

  if (!book) {
    return <h1>Book not found</h1>; // handle case when book is not found
  }

  const handleBookClick = async (id) => {
    try {
      const response = await checkOutBook(id).unwrap();
      localStorage.setItem("resID", response.id);
    } catch (error) {}
  };

  const handleBookReturn = async (bookID) => {
    try {
      let resID = reservations.find((e) => e.bookid == bookID).id;

      const returnResponse = await returnBook(resID).unwrap();
    } catch (error) {}
  };

  return (
    <article className="single-book">
      {" "}
      {/* Display the book details */}
      <h2>
        <strong>{book.title}</strong>
      </h2>
      <h3>
        <strong>{book.author}</strong>
      </h3>
      <img
        src={
          book.coverimage && book.coverimage.startsWith("http") // check if the cover image URL is valid
            ? book.coverimage
            : "https://placehold.co/150x250?text=No+Cover"
        }
        alt={book.title}
        className="books-cover"
      />
      <p> {book.description}</p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>
      {book.available ? (
        <button className="btn btn-outline-dark" onClick={() => handleBookClick(id)}>Check Out</button>
      ) : (
        <>
          <p>"This book is already checked out"</p>
          <button className="btn btn-outline-dark" onClick={() => handleBookReturn(id)}>Return Book</button>
        </>
      )}
    </article>
  );
};
export default SingleBook;
