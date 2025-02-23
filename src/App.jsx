import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar";
// import PassGenerator from "./Components/PassGenerator";
import {login, logout} from "./store/authSlice"
import { ColorRing } from "react-loader-spinner";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import conf from "./conf/conf";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    try{
      authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
          navigate('/login')
        }
      })
      .finally(() => setloading(false));
    } catch(error){
      console.log(error)
    }

  }, []);


    


  return loading ? (
    <div className="loading-wrapper w-screen h-screen flex items-center justify-center">
<ColorRing
  visible={true}
  height="150"
  width="150"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
</div>
  ) : (
    <div className="overflow-hidden min-h-screen w-full flex flex-wrap content-between bg-slate-200">
      <div className="w-full block">
        <Navbar />
        <main className="w-full">
         <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
