import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SearchName() {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const [allClients, setAllClients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001`);
        setAllClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [value]);

  function onChange(e) {
    const input = e.currentTarget.value;
    const suggestions = allClients.filter((suggestion) => {
      const name = `${suggestion.first_name} ${suggestion.last_name}`;
      return name.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });
    setActive(0);
    setFiltered(suggestions);
    setIsShow(true);
    setValue(e.currentTarget.value);
  }

  function onKeyDown(e) {
    //Enter key
    if (e.keyCode === 13) {
      setActive(0);
      setIsShow(false);
      const newValue = `${filtered[active].first_name} ${filtered[active].last_name}`;
      setValue(newValue);
      history.push(`/detail/${filtered[active].id.$oid}`);
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
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }

              return (
                <Link key={index} to={`/detail/${suggestion.id.$oid}`}>
                  <li className={className} key={suggestion.id.$oid}>
                    {suggestion.first_name} {suggestion.last_name}
                  </li>
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
    <>
      <div className="input">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
        {renderAutocomplete()}
      </div>
    </>
  );
}
export default SearchName;
