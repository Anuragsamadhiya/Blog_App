import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:9000/api/v1/user/register', {
        Username,
        email,
        password,
      });

      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      alert('Signup failed: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3 className="mb-4">Signup</h3>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" value={Username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-success w-100">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
