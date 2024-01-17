import { useContext, useState } from "react";
import UserContext from "../context/user/UserContext";
import { useNavigate } from "react-router-dom";



export default function Signup({ toast }) {
    const user =useContext(UserContext);
    const navigate =useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const formCheck = () => {
        if (name === "") {
            toast.error("Name cant be empty")
            return false;
        }
        else if (email === "") {
            toast.error("Email cant be empty")
            return false;
        } else if (password === "") {
            toast.error("Password cant be empty");
            return false;
        }
        else return true;
    }
    const Refresh=()=>{
        setName("");
        setPassword("");
        setEmail("")
    }
    const handleSubmit = async () => {
        if(formCheck()){
            try {
                const url = "https://192.168.0.104:5000/user/new";
                const data = {
                    name: name,
                    email: email,
                    password: password
                }
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                if(response.ok){
                    const result= await response.json(); //returns promise
                    if(result.success){
                        toast.success("Logged In..");
                        localStorage.setItem('authToken',result.authToken);
                        user.handleLogin();
                        Refresh();
                        navigate("/");
                    }
                    else{
                        toast.error("Can't sign you in");
                        localStorage.removeItem('authToken');
                        Refresh();
                    }
                }
                else{
                    toast.error("Try Login..");
                    Refresh();
                }
            } catch (error) {
                toast.error("Error Signing In..");
                Refresh();
            }
        }
    }
    return (
        <>
            <h1 className="title has-text-centered mt-5">Signup</h1>

            <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" onChange={handleNameChange} value={name} placeholder="Enter name.." />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success" type="text" onChange={handleEmailChange} value={email} placeholder="Enter email.." />
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
                    <input className="input is-danger" type="email" placeholder="Enter password.." value={password} onChange={handlePasswordChange} />
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
