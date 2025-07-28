import React, { useState } from 'react'
import axios from 'axios';
const Addcategory = () => {
  const[title,settitle]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title
    };

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:9000/api/v1/add/category', blogData, {
        headers: {
          'Content-Type': 'application/json', // ✅ tell server it's JSON
          Authorization: `Bearer ${token}`
        }
      });

      alert('Category added successfully!');
     
      settitle('');
    } catch (error) {
      alert('Failed to add Category: ' + error.response?.data?.message);
    }
  };
  return (
    <div>
       <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        

       

        <div className="mb-3">
          <label>Category</label>
          <input type="text" className="form-control" value={title}
            onChange={(e) => settitle(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}

export default Addcategory
