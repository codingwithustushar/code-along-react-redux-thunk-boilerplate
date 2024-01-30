import React, { useEffect, useState } from "react";
import { thunk } from "redux-thunk";
import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import reducer from "./Reducer";
import { fetchUserData, showErr } from "./Action";

const store = createStore(reducer, applyMiddleware(thunk));

const fetchData = () => async () => {
  try {
    let data = await axios.get("https://jsonplaceholder.typicode.com/users");
    store.dispatch(fetchUserData(data.data));
  } catch {
    store.dispatch(showErr(error));
  }
};

const DisplayData = () => {
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState([]);
  function handleClick() {
    store.dispatch(fetchData());
    setShowData(!showData);
  }
  useEffect(() => {
    let subscribe = store.subscribe(() => setData(store.getState().users));
    return subscribe;
  }, []);
  console.log(data);
  return (
    <div>
      <button onClick={handleClick}>
        {showData ? "Hide data" : "Fetch Data"}
      </button>
      <div>
        {showData &&
          data.map((ele, i) => {
            return (
              <div
                style={{ borderTop: "1px solid black", margin: "10px" }}
                key={i}
              >
                <h3>{ele.name}</h3>
                <h3>{ele.email}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DisplayData;