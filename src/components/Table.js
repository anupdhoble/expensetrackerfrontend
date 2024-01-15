import React from 'react';
import { useState, useEffect } from 'react';




const Table = ({ showNotification, toast }) => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
   
    try {
      const response = await fetch("http://localhost:5000/expense/getAll");
        
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete selected item?")) {
      // const response = await fetch(`http://localhost:5000/expense/delete/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // });
      const response = await toast.promise(
        fetch(`http://localhost:5000/expense/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }),
        {
          pending: 'Removing...',
          success: 'Item Removed 👌',
          error: 'Error removing data 🤯'
        }
      );
      if (response.ok) {

        fetchData();
      } else {
        showNotification('Failed to delete expense. ', "error");
      }
    }
  }

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Purpose</th>
          <th>Type</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.title}</td>
            <td>{row.amount}</td>
            <td>{row.date}</td>
            <td>{row.purpose}</td>
            <td>{row.type}</td>
            <td><button className="button is-danger" onClick={() => handleDelete(row._id)}>🗑️</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
