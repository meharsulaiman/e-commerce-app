import React from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../features/user/components/UserProfile';

export default function UserProfilePage() {
  return (
    <>
      <Navbar>User Profile</Navbar>
      <UserProfile />
    </>
  );
}
