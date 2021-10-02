import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchOrigins() {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [allClients, setAllClients] = useState([]);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/origin`);
        setAllClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function onChange(e) {
    const input = e.currentTarget.value;
    const filteredOrigin = allClients.filter((origin) => {
      if (origin === null) {
        origin = "";
      }
      return origin.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });

    setActive(0);
    setFiltered(filteredOrigin);
    setIsShow(true);
    setValue(e.currentTarget.value);
  }

  function onKeyDown(e) {
    //Enter key
    if (e.keyCode === 13) {
      setActive(0);
      setIsShow(false);
      setValue(filtered[active]);
      history.push(`/origin/${filtered[active]}`);
      //Up arrow key
    } else if (e.keyCode === 38) {
      return active === 0 ? null : setActive(active - 1);
      //Down arrow key
    } else if (e.keyCode === 40) {
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  }

  function renderAutocomplete() {
    if (isShow && value) {
      if (filtered.length) {
        return (
          <ul className="list">
            {filtered.map((origin, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <Link key={index} to={`/origin/${origin}`}>
                  <li className={className}>{origin}</li>
                </Link>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="not-found">
            <em>Not found</em>
          </div>
        );
      }
    }
  }

  return (
    <div className="input">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
      {renderAutocomplete()}
    </div>
  );
}

export default SearchOrigins;
