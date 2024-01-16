import { useState } from "react";
import UserContext from "../context/user/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ showNotification, toast }) {
    const navigate = useNavigate();

    const user = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleemailChange = (e) => {
        setEmail(e.target.value);
    }
    const formCheck = () => {
        if (email === "") {
            showNotification("Email can't be Empty", "error");
            return false;
        } else if (password === "") {
            showNotification("Password cant be empty", 'error');
            return false;
        }
        else return true;
    }
    const Refresh=()=>{
        setPassword("");
        setEmail("");
    }
    const handleSubmit = async () => {
        if (formCheck()) {
            const url = 'http://localhost:5000/user/auth';
            const data = {
                email: email,
                password: password
            }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();

                    if (result.success) {
                        toast.success("Logged In..")
                        const authToken = result.authToken;
                        //store it in local storage
                        localStorage.setItem('authToken', authToken);
                        
                        user.handleLogin();
                        Refresh();
                        navigate("/"); //Navigates to home page
                    }
                    else {
                        toast.error("Invalid credentials");
                        localStorage.removeItem('authToken');
                        Refresh();
                    }
                } else {
                    toast.error("Failed to login user");
                    Refresh();
                }
            } catch (error) {
                toast.error("Failed to login user");
                Refresh();
            }
        }
    }

    return (
        <>
            <h1 className="title has-text-centered mt-5">Login</h1>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" onChange={handleemailChange} value={email} placeholder="Text input" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Email input" value={password} onChange={handlePasswordChange} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
            </div>



            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </>
    );
}
