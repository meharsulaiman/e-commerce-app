import React from 'react';
import Cart from '../features/cart/Cart';
import Navbar from '../components/Navbar';

export default function CartPage() {
  return (
    <div>
      <Navbar>Cart</Navbar>
      <Cart />
    </div>
  );
}
