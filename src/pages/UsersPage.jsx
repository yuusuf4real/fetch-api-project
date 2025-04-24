import React, { useEffect, useState } from 'react';
import ListComponent from '../components/ListComponent';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No users found.</div>;

  return (
    <div className="users-container">
      <h2>User List</h2>
      <ListComponent 
        items={users} 
        renderItem={(user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        )}
      />
    </div>
  );
}

export default UsersPage;
