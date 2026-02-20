import React, { useState } from "react";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    skills: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />
      <input
        type="text"
        name="skills"
        placeholder="Required Skills (comma separated)"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Job Description"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Job
      </button>
    </form>
  );
};

export default PostJob;