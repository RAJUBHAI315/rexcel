import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Data } from "./pages/Data";
import { ToastContainer } from "react-toastify";
import CustomToast from "./components/CustomToast";
import "react-toastify/dist/ReactToastify.css";
import { CustomNav } from "./components/CustomNavbar";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <CustomNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      <CustomToast />
    </>
  );
}

export default App;
