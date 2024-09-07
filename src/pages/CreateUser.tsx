import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name,
        email,
        phone,
      });
      alert('User created successfully: ' + JSON.stringify(response.data));
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      alert('Failed to create user.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;