import React, { useState } from 'react';
import { createUser, updateUser } from '../services/api';

interface UserFormProps {
  user?: any;
  onSuccess: (user: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser(user.id, formData).then((response) => onSuccess(response.data));
    } else {
      createUser(formData).then((response) => onSuccess(response.data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;