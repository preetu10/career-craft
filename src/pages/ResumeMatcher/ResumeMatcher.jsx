import React, { useState } from "react";
// import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAxiosPublic from "../../customHooks/useAxiosPublic";

export default function ResumeMatcher() {
   const [output, setOutput] = useState();
  const [jobDesc, setJobDesc] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [file, setFile] = useState(null);
  // const axiosSecure = useAxiosSecure();
  const axiosPublic=useAxiosPublic();
  // const handlePrompt = async () => {
  //   const res = await axiosPublic.get("/prompts");
  //   console.log(res.data);
  //   setOutput(res?.data?.text);
  // };
     const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
       setFile(selectedFile);
       
    //   toast.success("Resume uploaded successfully!");
    } else {
      toast.warn("Please upload a PDF file.");
    }
  };
   const handleUpload = async () => {
     console.log("Uploaded file:", file);
    if (!file) return toast.warn("Please select a PDF file.");
    if (!jobDesc.trim()) return toast.warn("Please enter a job description.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    try {
      const res = await axiosPublic.post("/resume-match", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res)
    setOutput(res?.data?.percentage); // backend response
    setAiResponse(res?.data?.aiAdvice)
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
   return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 my-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8 border border-[#b2d8d8]">
        {/* Title */}
        <h1 className="text-center text-[#006666] font-bold text-3xl mb-2">
          Resume Matcher
        </h1>
        <p className="text-center text-[#009999] font-medium mb-6">
          Check how well your resume matches the job requirements
        </p>

        {/* Job Description Textarea */}
        <div className="mb-6">
          <label
            htmlFor="requirements"
            className="block text-[#004c4c] font-semibold mb-2"
          >
            Enter Job Description
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            required
            placeholder="Paste the full job description here..."
            className="w-full h-40 border-2 border-[#66b2b2] rounded-md p-3 focus:outline-none focus:border-[#009999] resize-none"
          ></textarea>
        </div>

        {/* Upload Resume */}
        <div className="mb-6 flex flex-col items-start">
          <label
            htmlFor="resume"
            className="btn border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md cursor-pointer hover:bg-[#e0f2f2]"
          >
            Upload Resume (PDF)
          </label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </div>

        {/* Match Button */}
        <div className="text-center">
          <button
            className="btn border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md px-6 py-2 hover:bg-[#e0f2f2]"
            onClick={handleUpload}
          >
            Analyze Match
          </button>
        </div>
         {/* Match Button */}
        {/* <div className="text-center mt-3">
          <button
            className="btn border-2 border-[#009999] text-[#006666] font-semibold text-lg rounded-md px-6 py-2 hover:bg-[#e0f2f2]"
            onClick={handlePrompt}
          >
            Test AI
          </button>
        </div> */}

        {/* Output Section */}
        {output && (
          <div>
            <div className="mt-8 bg-[#f0fafa] p-4 rounded-lg border border-[#b2d8d8]">
            <h2 className="text-[#006666] font-semibold mb-2">Matched:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{output}</p>
          </div>
          <div className="mt-8 bg-[#f0fafa] p-4 rounded-lg border border-[#b2d8d8]">
            <h2 className="text-[#006666] font-semibold mb-2">AI Response:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
          </div>
          </div>
        )}
      </div>
    </div>
  );

}
