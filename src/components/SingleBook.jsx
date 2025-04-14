import { useParams } from "react-router-dom";
import { useGetBookQuery } from "./bookSlice";

const SingleBook = () => {
    const { id } = useParams(); //get the book id from the URL
    const { data, isLoading, isError, error } = useGetBookQuery(id); //fetch the book data using the id
    const book = data; // get the book data from the response

    if (isLoading) {
        return <h1> Loading... </h1>;
    }

    if (isError) {
        return <h1>Error: {error?.status || "Unknown error"}</h1>
    }

    if (!book) {
        return <h1>Book not found</h1>; // handle case when book is not found
    }

    return (
        <article className="single-book"> {/* Display the book details */}
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <img
                src={book.coverimage && book.coverimage.startsWith("http") // check if the cover image URL is valid
                    ? book.coverimage
                    : "https://placehold.co/150x250?text=No+Cover"}
                    alt={book.title}
                    className="book-cover"
            />
            <p> {book.description}</p>
            <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
        </article>
    );   
};

export default SingleBook;
