import React from 'react';
import Navbar from '../components/Navbar';
import UserOrders from '../features/user/components/UserOrders';

export default function () {
  return (
    <>
      <Navbar>User Orders</Navbar>
      <UserOrders />
    </>
  );
}
