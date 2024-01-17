import React, { Link } from "react-router-dom";
import "../css/add.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/user/UserContext";





export default function Add({ showNotification, toast }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [purpose, setPurpose] = useState('Miscellaneous');
    const [transactionType, setTransactionType] = useState("Debit");
    const user =useContext(UserContext);




    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleAmountChange = (e) => {
        if (/^\d*\.?\d*$/.test(e.target.value)) {
            // Update the amount state only if it's a valid number
            setAmount(e.target.value);
        }

    }
    const handlePurposeChange = (e) => {
        setPurpose(e.target.value);
    }
    const formCheck = () => {
        const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (title === "") {
            showNotification("Title can't be Empty", "error");
            return false;
        }
        else if (amount === "") {
            showNotification("Amount can't be empty", "error");
            return false;
        }
        else if (date === "") {
            showNotification("Date can't be Empty", "error");
            return false;
        }
        else if (!dateRegex.test(date)) {
            showNotification("Enter date in proper format", "error");
            return false;
        }
        else {
            return true;
        }
    }

    const Submit = async () => {
        const url = 'https://192.168.0.104:5000/expense/new';

        if(user.isLoggedIn){
            if (formCheck()) {
                const data = {
                    title: title,
                    amount: amount,
                    date: date,
                    purpose: purpose,
                    type: transactionType
                }
                try {
                    // POST operation
                    const token=localStorage.getItem('authToken');
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authToken':token
                        },
                        body: JSON.stringify(data)
                    });
    
                    if (response.ok) {
                        const resolveAfter1Sec = new Promise(resolve => setTimeout(resolve, 1000));
                        toast.promise(
                            resolveAfter1Sec,
                            {
                                pending: 'Adding...',
                                success: 'Expense Added Successfully 👌'
                                
                            }
                        )
                    } else {
                        showNotification('Failed to add expense. Status:', response.status);
                    }
                    navigate("/"); //Navigates to home page
                } catch (error) {
                    console.error('An error occurred while adding the expense:', error.message);
                } finally {
                    // Regardless of success or failure, refresh the form
                    Refresh();
                }
            }
        }
        else{
            toast.error("Login First");
            navigate('/login');
        }


    }

    const Refresh = () => {
        setTitle("");
        setAmount("");
        setDate("");
        setPurpose("Miscellaneous")
        setTransactionType("Debit");
    }

    return (
        <>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" onChange={handleTitleChange} value={title} type="text" placeholder="Enter title" />
                </div>
            </div>

            <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                    <input className="input" type="text" value={amount} onChange={handleAmountChange} placeholder="Enter Amount" />
                </div>
            </div>

            <div className="field">
                <label className="label">Date</label>
                <div className="control">
                    <input className="input" type="text" value={date} onChange={handleDateChange} placeholder="DD/MM/YYYY" />
                </div>
            </div>







            <div className="field">
                <label className="label">Purpose</label>
                <div className="control">
                    <div className="select">
                        <select value={purpose} onChange={handlePurposeChange}>
                            <option>Miscellaneous</option>
                            <option>Food</option>
                            <option>Bills</option>
                            <option>Party</option>
                            <option>Medical</option>
                        </select>
                    </div>
                </div>
            </div>





            <div className="field">
                <div className="control">
                    <label className="radio">
                        <input type="radio" checked={transactionType === 'Debit'} onClick={() => {
                            setTransactionType('Debit');
                        }} name="question" />
                        Debit
                    </label>
                    <label className="radio">
                        <input type="radio" checked={transactionType === 'Credit'} onClick={() => {
                            setTransactionType('Credit');
                        }} name="question" />
                        Credit
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={Submit}>Submit</button>
                </div>
                <Link to="/expensetrackerfrontend/" className="control">
                    <button className="button is-link is-light">Cancel</button>
                </Link>
            </div>
        </>
    );
}