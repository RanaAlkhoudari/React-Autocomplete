import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function ClientDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [client, setClient] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  function goBack() {
    history.goBack();
  }
  return (
    <>
      <h2>
        More details about {client.first_name} {client.last_name}
      </h2>

      <div className="container">
        <div className="wrapper client-detail">
          <img src={client.photo} alt="" />
          <h3>
            Name: {client.first_name} {client.last_name}
          </h3>
          <p> Email: {client.email}</p>
          <p> Gender: {client.gender}</p>
          {client.origin === null ? (
            <p>No origin found</p>
          ) : (
            <p>Origin: {client.origin}</p>
          )}
        </div>
      </div>
      <div className="button-wrapper">
        <button onClick={goBack}>Go Back</button>
      </div>
    </>
  );
}

export default ClientDetail;
