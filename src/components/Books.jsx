import { useGetBooksQuery } from "./bookSlice";
import { useNavigate } from "react-router-dom";


export default function Books({ setSelectedPuppyId }) {
    const { data: allBooks, error, status, isLoading } = useGetBooksQuery();
    const navigate = useNavigate();
    const viewBook = (id) => {
      navigate(`/book/${id}`);
    };
    console.log(allBooks); // Take out later
    if (isLoading) {
      return <h1> Is loading </h1>;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    return (
    <>
    <article>
        <h2>Library Catalog</h2>
            <ul>
            {isLoading && <li>Loading books...</li>}
              {allBooks.books.map((p) => (
                <li key={p.id}>
                  <h3>
                    #{p.id} {p.title} by {p.author} 
                  </h3>
                  <figure>
                    <img src={p.imageUrl} alt={p.name} />
                  </figure>
                  <button type = "button" onClick={() => navigate(`/books/${p.id}`)}>
                    See details
                  </button>
                </li>
                ))}
            </ul> 
          </article>
    </>
);
}

//Test comment

