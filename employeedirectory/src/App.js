import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "./App.css";

function App() {
  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [
      {
        // group - Employees
        Header: "Employees",
        // group columns
        columns: [
          {
            Header: "Title",
            accessor: "name.title",
          },
          {
            Header: "First",
            accessor: "name.first",
          },
          {
            Header: "Last",
            accessor: "name.last",
          },
          {
            Header: "Email",
            accessor: "email"
          }
        ]
      },
    ],
    []
  );

  // data state to store the API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://randomuser.me/api/?results=10");
      setData(result.data.results);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;