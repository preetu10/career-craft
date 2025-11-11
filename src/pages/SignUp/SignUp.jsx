/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
;
export default function SignUp() {
  const [showPW, setShowPW] = useState(false);
  const { createUser, logout, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const handleRegister = (e) => {
    e.preventDefault();
    const accepted = e.target.terms.checked;
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    console.log(email,password,name,accepted)
    // const navigate = useNavigate();
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length<6) {
      toast.error(
        "Password must be at least 6 characters long"
      );
      return;
    }
    if (!accepted) {
      toast.info("Please accept our terms and conditions");
      return;
    }
    createUser(email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: name,
          photoURL:null
        })
          .then(() => {
            const userInfo = {
                name: name,
                email: email,
                password:password,
                role: "general",
              };
            axiosPublic.post("/users",userInfo)
            .then((res) => {
                if(res.data.insertedId){
                    toast.success("You have successfully registered!");
                    // navigate("/login");
              
                    logout()
                    .then(() => console.log("You have successfully logged out!"))
                    .catch((err) => console.log(err));
                }
            }) 
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong.Try again later");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("You may already have an account. Try to login.");
      });
  };
  

  const handleGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          image: res.user?.photoURL,
          role: "general",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("You have successfully logged in!");
            // navigate("/");
          } else {
            toast.success("You have successfully logged in!");
            // navigate("/");
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
            Create Your Account{" "}
          </h1>
          <form className="" onSubmit={handleRegister}>
            <div className="p-3 ">
              <label className="label">Enter Your Email</label>
              <br></br>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="e.g. xyz@gmail.com"
                name="email"
                required
              />
            </div>
            <div className="p-3">
              <label className="label">Enter Your Name</label>
              <br></br>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g. Abul Rahman"
                name="name"
                required
              />
            </div>
            <div className="p-3 relative">
              <label className="label">Enter Your Password</label>
              <input
                type={showPW ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="The password should contain at least 6 characters"
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

            <div className="p-3">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms" className="ml-3">
                I accept all terms and conditions of this website.
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button className="btn mt-4 border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md">
                Sign Up
              </button>
            </div>
            <h1 className="text-center mt-4 text-lg font-medium">or</h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleGoogle}
                className="btn mt-4 border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md"
              >
                Sign Up with Google <FaGoogle></FaGoogle>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
