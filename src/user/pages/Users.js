import React from 'react';
import UsersList from '../components/UsersList';



// Goal: output a list of users, viewable by anyone;
function Users() {
  // Array of objects (dummy data);
  const USERS = [
    {
      id: 'u1',
      name: 'Vita',
      image: "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      places: 3
    }
  ];

  return <UsersList items={USERS}/>;
}

export default Users;
