import "bootstrap/dist/css/bootstrap.min.css";
import { useGetProfileQuery, useGetReservationsQuery } from "./userSlice";
import { useReturnBookMutation } from "./bookSlice";
import { useState, useEffect } from "react";

const Account = () => {
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const { status, data: reservationList } = useGetReservationsQuery();
  const [ reservations, setReservations ] = useState([]);
  const [ returnBook ] = useReturnBookMutation();

  useEffect(() => {
    if(status.toLowerCase() === "fulfilled") {
        setReservations(reservationList);
    }
  }, [status]); 

  const handleCheckInBook = async (id) => {
    try {
      await returnBook(id).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isLoading) {
    return <p>is loading...</p>;
  }

  if (error) {
    return <p>Error: {error?.status || "Error loading profile"}</p>;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="osahan-account-page-left shadow-sm bg-white h-324">
              <div className="border-bottom p-4">
                <div className="osahan-user text-center">
                  <div className="osahan-user-media">
                    <img
                      className="mb-3 rounded-pill shadow-sm mt-1"
                      src="https://t3.ftcdn.net/jpg/06/33/54/78/240_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
                      alt="profile picture"
                    ></img>
                    <div className="osahan-user-media-body">
                      <p className="mb-1">{profile?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="osahan-account-page-right shadow-sm bg-white p-4 h-400">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane  fade  active show"
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="orders-tab">
                    <div className="mainAccountContainer">
                  <h4 className="font-weight-bold mt-0 mb-4">My Books</h4>

                    {reservations?.length < 1 ? <p>No reserved books</p> 
                    : reservations.map(reservation => {
                        return (
                            <div className="bg-white card mb-4 order-list shadow-sm">
                            <div className="gold-members p-4">
                              <a href="#"></a>
                              <div className="media">
                                <a href="#">
                                  <img className="mr-4" src={reservation.coverimage}></img>
                                </a>
                                <br></br>
                                <button onClick={() => handleCheckInBook(reservation?.id)} className="btn btn-outline-dark">Return this book</button>
                                <div className="media-body">
                                  <h6 className="mb-2">
                                    <a href="#"></a>
                                  </h6>
                                  <hr></hr>
                                  <div className="float-right">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    })
                  }
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;