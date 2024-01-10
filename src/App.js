
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Add from './components/Add';

function App() {
  const showNotification = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Table showNotification={showNotification} toast={toast}/>} />;
          <Route exact path="/add" element={<Add showNotification={showNotification} toast={toast}/>} />;
        </Routes>
      </Router>
    </>
  );
}

export default App;
