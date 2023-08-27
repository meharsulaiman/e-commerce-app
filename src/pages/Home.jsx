import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../features/productList/productList';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <ProductList />
        </div>
      </main>
    </>
  );
}
