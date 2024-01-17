import React from 'react';
import { useState, useEffect } from 'react';
// import UserContext from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';
import '../css/table.css';



const Table = ({ showNotification, toast }) => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  // const user = useContext(UserContext);
  const fetchData = async () => {

    try {
      const token = localStorage.getItem('authToken');
      const url = "http://192.168.0.104:5000/expense/getAll";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token
        }
      });

      if(response.ok){
        const result = await response.json();
      setData(result);
      if (result.length === 0) {
        setIsEmpty(true);
      }
      }
      else{
        toast.info("Please Login");
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    
  },[fetchData]);
  

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete selected item?")) {
      // const response = await fetch(`http://localhost:5000/expense/delete/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // });
      const response = await toast.promise(
        fetch(`http://192.168.0.104:5000/expense/delete/${id}`, {
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
    <div className="table-container">
      {isEmpty ? (
        <>
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <img className="has-text-centered" src='./EmptyTable.gif' alt='Add New Expense'/>
          <h2 className='is-size-3 has-text-grey-light has-text-centered'>Add an Expense to get started..</h2>
        </div>
      </>
      
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th >
              <th>Amount</th>
              <th>Date</th>
              <th className="is-hidden-mobile">Purpose</th>
              <th>Type</th>
              <th>Delete</th>
            </tr >
          </thead >
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.amount}</td>
                <td>{row.date}</td>
                <td className="is-hidden-mobile">{row.purpose}</td>
                <td>{row.type}</td>
                <td><button className="button is-danger" onClick={() => handleDelete(row._id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table >
      )}
    </div>
  );
};

export default Table;
