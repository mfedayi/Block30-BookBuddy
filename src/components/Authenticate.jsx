// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";


// export default function Authenticate ({token}) {
//     const [error, setError] = useState(null);

//     async function handleClick() {
//         try {
//             const response= await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/userSlice", {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json", 
//                 Authorization: `Bearer ${token}`
//                  },

//             }); 
        
//             const result=await response.json();
//             if (response.ok === false) {
//                 throw new Error(result.message) 
//             }   
//                 setSuccessMessage(result.message)
//             } catch(error) {
//                 setError(error.message)
//             }      
  
//     }
//     return (
//       <div className="formLayout">
//               <h2>Authenticate</h2>
//               {successMessage && <p>{successMessage}</p>}
//               {error && <p>an error occured: {error}</p>}
//               <button onClick={handleClick} className="btn btn-outline-success">Authenticate Token!</button>
            
//       </div>
//     );
//   }