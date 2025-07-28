// import React, { useState } from 'react';
// import axios from 'axios';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); // ✅ list of categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
            const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:9000/api/v1/get/categories', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // ✅ FIXED HERE
      }
    });
        setCategories(res.data); // Adjust key based on your API response
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    fetchCategories();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const blogData = {
    title,
    description,
    category
  };

  try {
    const token = localStorage.getItem('token');

    const res = await axios.post('http://localhost:9000/api/v1/blog/addblog', blogData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // ✅ FIXED HERE
      }
    });

    alert('Blog added successfully!');
    setTitle('');
    setDescription('');
    setCategory('');
  } catch (error) {
    alert('Failed to add blog: ' + error.response?.data?.message || error.message);
  }
};

  return (
      
    <div className="container col-md-6 mt-4">
      <h3>Add Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <select
  className="form-select"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat.title}>
      {cat.title}
    </option>
  ))}
</select>

        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;

