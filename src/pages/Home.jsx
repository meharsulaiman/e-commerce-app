import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../features/product/components/ProductList';

export default function Home() {
  return (
    <>
      <Navbar>Shopverse</Navbar>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <ProductList />
        </div>
      </main>
    </>
  );
}
