import React from "react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { user } = useAuth();
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  const { isPending, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isPending)
    return (
      <span className=" mx-auto mt-24 loading loading-dots loading-lg"></span>
    );
  console.log(userInfo);
  return (
    <div>
      <div className="h-3/4 px-12 py-24 my-12 border-2 border-[#006666] shadow-2xl shadow-[#009999] flex-row items-center justify-center  ">
        <div>
          <h1>Name: {userInfo?.name}</h1>
        </div>

        <div>
          <h1>Email: {userInfo?.email}</h1>
        </div>
        <Link to="/dashboard/resume-matcher"><button className='btn mt-4 border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md'>
          Go to Resume Matcher
        </button></Link>
      </div>
    </div>
  );
}
