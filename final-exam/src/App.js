import './App.css';
import ProductCreate from "./component/ProductCreate";
import {BrowserRouter, NavLink, Route, Router, Routes} from "react-router-dom";
import ProductFunc from "./component/ProductFunc";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <div className='navbar navbar-expand-lg navbar-light bg-light'>
            <NavLink className='navbar-brand' to={"/products"}>Danh sach san pham</NavLink>
            <NavLink className='navbar-brand' to={"/create"}>Them moi</NavLink>
          </div>
          <Routes>
            <Route path="/create" element={<ProductCreate/>} />
            <Route path="/products" element={<ProductFunc/>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </>
  );
}

export default App;
