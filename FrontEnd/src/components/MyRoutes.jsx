import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import About from "./About";
import SinglePost from "./SinglePost";
import Login from "./login/Login";
import Register from "./register/RegisterPage";
import Packages from "./package/Packages";

function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </>
  );
}

export default MyRoutes;
