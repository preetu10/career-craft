import React, { useState } from "react";
import useAuth from "../../customHooks/useAuth";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LogIn() {
  const [showPW, setShowPW] = useState(false);
  const { signInUser, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((res) => {
        console.log(res);
        toast.success("You have successfully logged in.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Incorrect email or password. Please try again.");
      });
  };
  const handleGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          image: res.user?.photoURL,
          role: "general",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            //console.log("first inserted to db");
            toast.success("You have successfully logged in!");
            navigate("/");
          } else {
            toast.success("You have successfully logged in!");
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to log in with Google. Please try again.");
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen mx-auto max-w-5xl">
      <div className="card bg-base-100  shadow-2xl py-12 w-full max-w-md shadow-[#006666]">
        <div className="card-body">
          <h1 className="text-center text-[#006666] font-semibold text-xl">
            Welcome to CareerCraft{" "}
          </h1>
          <form className="" onSubmit={handleLogin}>
            <div className="p-3 ">
              <label className="label">Enter Your Email</label>
              <br></br>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="e.g. xyz@gmail.com"
                required
                name="email"
              />
            </div>
            <div className="p-3 relative">
              <label className="label">Enter Your Password</label>
              <br></br>
              <input
                type={showPW ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="The password should contain atleast 6 characters"
                required
                name="password"
              />
              <span
                className="absolute top-13 right-8 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPW(!showPW)}
              >
                {showPW ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center justify-center">
              <button className="btn mt-4 border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md">
                Log In
              </button>
            </div>
          </form>
          <h1 className="text-center mt-4 text-lg font-medium">or</h1>
          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogle}
              className="btn mt-4 border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md"
            >
              Sign Up with Google <FaGoogle></FaGoogle>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
