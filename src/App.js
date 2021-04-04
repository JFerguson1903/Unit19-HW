import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "./App.css";

function App() {

  const columns = useMemo (
    () => [
      {
        // group - Employees
        Header: "Employees",
        // group columns
        columns: [
          {
            Header: "Photo",
            accessor: "picture.thumbnail",
            Cell: ({ cell: { value } }) => {
              return (
                <img alt={value} src={value} />
              );
            }
          },
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
          },
          {
            Header: "Phone",
            accessor: "phone"
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
      const result = await axios("https://randomuser.me/api/?results=10&nat=us");
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