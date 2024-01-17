import React, { useEffect, useState } from 'react';
import UserContext from "./UserContext"; 
import { toast } from 'react-toastify';

function AuthState(props) {  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        // Check if the user is logged in based on some asynchronous operation
        const checkLoginStatus = async () => {
          try {
            // Perform your authentication check here
            // For example, you might check if there's a valid authentication token in localStorage
            const token = localStorage.getItem('authToken');
            if(token){
              setIsLoggedIn(true);  
            }else{
              setIsLoggedIn(false);
            }
    
            
          } catch (error) {
            console.error('Error checking login status:', error);
          }
        };
    
        checkLoginStatus();
      }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
        toast.success("Logged out...");
        window.location.href='/expensetrackerfrontend/login';
    };
    const handleLogin=()=>{
        setIsLoggedIn(true);
    }

    return (
        <UserContext.Provider value={{ isLoggedIn, handleLogout,handleLogin }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default AuthState;
