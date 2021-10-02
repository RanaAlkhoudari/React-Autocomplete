import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function OriginClients() {
  const { origin } = useParams();
  const history = useHistory();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/origin/${origin}`
        );
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [origin]);

  function goBack() {
    history.goBack();
  }
  return (
    <>
      <h2>All the clients from {origin}</h2>
      <div className="container">
        {clients.map((client, index) => {
          return (
            <div key={index} className="wrapper">
              <img src={client.photo} alt="" />
              <h3>
                Name: {client.first_name} {client.last_name}
              </h3>
              <p> Email: {client.email}</p>
              <p> Gender: {client.gender}</p>
              <p>Origin: {client.origin}</p>
            </div>
          );
        })}
      </div>
      <div className="button-wrapper">
        <button onClick={goBack}>Go Back</button>
      </div>
    </>
  );
}

export default OriginClients;
