import React from 'react';
import CreateUser from '@/components/users/CreateUser';
import LoginUser from '@/components/users/LoginUser';
import UserList from '@/components/users/UserList';

const UsersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-8">
        <CreateUser />
        <LoginUser />
        <UserList />
      </div>
    </div>
  );
};

export default UsersPage; 