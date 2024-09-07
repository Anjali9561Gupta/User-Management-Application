import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/api';
import UserForm from '../components/UserForm';
import Loader from '../utils/Loader';
import "./UserDetailPage.css";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((response) => {
        const selectedUser = response.data.find((u: any) => u.id === parseInt(id!));
        setUser(selectedUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSuccess = (updatedUser: any) => {
    setUser(updatedUser);
    navigate('/');
  };

  return (
    <div>
      <h2>User Details</h2>
      {loading ? <Loader /> : user && <UserForm user={user} onSuccess={handleSuccess} />}
    </div>
  );
};

export default UserDetailPage;