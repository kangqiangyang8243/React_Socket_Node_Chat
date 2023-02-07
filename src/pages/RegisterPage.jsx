import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.svg";
import { toast } from "react-toastify";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // if we find out there is a user logged in, redirect to the dashboard
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_USER_TOKEN)) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/register",
        {
          username: username,
          email: email,
          password: password,
          loginDate: Date.now(),
        }
      );

      if (res.data.status === false) {
        toast.error(res.data.msg);
      }
      if (res.data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          JSON.stringify(res.data.user)
        );
        toast.success("User registered successfully.");
        // console.log(res.data);
        navigate(`/setAvatar/${res.data.user._id}`);
      }
    } else {
      toast.error("Some fields are not in required.");
    }
  };
  return (
    <div className="w-full h-screen bg-[#2a2c36] flex justify-center px-10 items-center">
      <div className="bg-[#16151c] flex flex-col font-serif w-[450px] h-[600px] rounded-lg shadow-lg">
        {/* TOP */}
        <div className="flex items-center justify-center mt-10  gap-2">
          <img src={Logo} alt="logo" className="w-20 h-20" />
          <h2 className="text-white font-bold text-3xl">FREECHAT</h2>
        </div>
        {/* BOTTOM */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-grow flex flex-col items-center gap-9 mt-10 px-10 "
        >
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            autoFocus
            required
            className="Inputbox"
            placeholder="Username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="Inputbox"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="Inputbox"
            placeholder="Password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
            className="Inputbox"
            placeholder="Comfirm Password"
          />

          <button
            type="submit"
            className="w-[90%] transform duration-150 ease-linear hover:bg-purple-400 font-bold text-lg text-white rounded-lg p-2 bg-purple-500"
          >
            Create User
          </button>
          <p className="text-white whitespace-nowrap text-sm uppercase w-full text-center tracking-wider -mt-3">
            Already Have a ACCOUNT?{" "}
            <Link to="/login" className="hover:text-blue-300 text-indigo-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
