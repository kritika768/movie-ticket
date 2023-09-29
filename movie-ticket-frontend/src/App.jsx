import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Movie from "./components/Movie/Movie";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./components/Profile/userProfile";
import AddMovie from "./components/Movie/AddMovie";
import AdminProfile from "./components/Profile/AdminProfile";

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, []);
  return (
    <>
      <Home />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<UserProfile/>}/>
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/user-admin" element={<AdminProfile />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
