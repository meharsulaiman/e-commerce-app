import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  deleteCartItemAsync,
  selectCart,
  updateItemAsync,
} from '../features/cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  selectLoggedInUser,
  updateUserAsync,
} from '../features/auth/authSlice';
import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectPayment, setSelectPayment] = useState('card');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const productsCart = useSelector(selectCart);
  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const totalAmount = productsCart.reduce((amount, item) => {
    return item.quantity * item.price + amount;
  }, 0);
  const totalItems = productsCart.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  function handleQuantity(e, product) {
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }));
  }

  function onSubmit(data) {
    dispatch(updateUserAsync({ ...user, address: [...user.address, data] }));
  }

  function handleAddress(e) {
    console.log(e.target.value);
    setSelectedAddress(user.address[e.target.value]);
  }

  function handlePayment(e) {
    setSelectPayment(e.target.value);
  }

  function handleOrder() {
    const order = {
      items: productsCart,
      totalAmount,
      totalItems,
      user,
      paymentMethod: selectPayment,
      address: selectedAddress,
      status: 'pending', // * "delivered", "received"
    };
    dispatch(createOrderAsync(order));

    // TODO: redirect to order success page
    // TODO: clear CART
    // TODO: decrease stock on server after order
  }

  return (
    <>
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace />
      )}
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 '>
          <div className='lg:col-span-3'>
            <form
              className='bg-white py-10 px-5'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Personal Information
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Full name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('name', {
                            required: 'Name is required',
                          })}
                          id='first-name'
                          autoComplete='given-name'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.name && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Email address
                      </label>
                      <div className='mt-2'>
                        <input
                          id='email'
                          {...register('email', {
                            required: 'Email is required',
                          })}
                          type='email'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.email && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Phone
                      </label>
                      <div className='mt-2'>
                        <input
                          id='phone'
                          {...register('phone', {
                            required: 'Phone is required',
                          })}
                          type='tel'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.phone && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Street address
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('street', {
                            required: 'Street address is required',
                          })}
                          id='street-address'
                          autoComplete='street-address'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.street && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-2 sm:col-start-1'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        City
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('city', {
                            required: 'City is required',
                          })}
                          id='city'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.city && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        State / Province
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('state', {
                            required: 'State is required',
                          })}
                          id='region'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.state && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        ZIP / Postal code
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('pinCode', {
                            required: 'ZIP code is required',
                          })}
                          id='postal-code'
                          autoComplete='postal-code'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.pinCode && (
                          <p className='text-sm bg-red-500 text-red-100 rounded-lg mt-1 px-2 py-1'>
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button
                      onClick={() => reset()}
                      type='button'
                      className='text-sm font-semibold leading-6 text-gray-900'
                    >
                      reset
                    </button>
                    <button
                      type='submit'
                      className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Save address
                    </button>
                  </div>
                </div>

                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Addresses
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Choose from existing
                  </p>
                  <ul role='list' className='divide-y divide-gray-100'>
                    {user.address.map((address, index) => (
                      <li
                        key={index}
                        className='flex justify-between gap-x-6 py-5 border-b-2'
                      >
                        <div className='flex min-w-0 gap-x-4 items-center'>
                          <input
                            onChange={handleAddress}
                            id='address'
                            name='address'
                            type='radio'
                            value={index}
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {address.name}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                              {address.street}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                          <p className='text-sm leading-6 text-gray-500'>
                            Phone: {address.phone}
                          </p>
                          <p className='text-sm leading-6 text-gray-500'>
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='mt-10 space-y-10'>
                    <fieldset>
                      <legend className='text-sm font-semibold leading-6 text-gray-900'>
                        Payement Information
                      </legend>
                      <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Choose one of them
                      </p>
                      <div className='mt-6 space-y-6'>
                        <div className='flex items-center gap-x-3'>
                          <input
                            onChange={handlePayment}
                            value={'cash'}
                            id='cash-payment'
                            name='payment'
                            type='radio'
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <label
                            htmlFor='cash-payment'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Cash on delivery
                          </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                          <input
                            onChange={handlePayment}
                            value={'card'}
                            id='cardpayment'
                            name='payment'
                            type='radio'
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <label
                            htmlFor='cardpayment'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Card payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='lg:col-span-2'>
            <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
              <div className='border-b border-gray-200 pb-6 pt-24'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                  Cart
                </h1>
                <div className='mt-8'>
                  <div className='flow-root'>
                    <ul role='list' className='-my-6 divide-y divide-gray-200'>
                      {productsCart.map((product) => (
                        <li key={product.id} className='flex py-6'>
                          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className='h-full w-full object-cover object-center'
                            />
                          </div>

                          <div className='ml-4 flex flex-1 flex-col'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>
                                  <a href={product.thumbnail}>
                                    {product.title}
                                  </a>
                                </h3>
                                <p className='ml-4'>${product.price}</p>
                              </div>
                              <p className='mt-1 text-sm text-gray-500'>
                                {product.brand}
                              </p>
                            </div>
                            <div className='flex flex-1 items-end justify-between text-sm mb-2'>
                              <div className='flex items-center justify-between'>
                                <label htmlFor='qty' className='mr-5'>
                                  Qty
                                </label>
                                <select
                                  name=''
                                  id='qty'
                                  className='py-1'
                                  onChange={(e) => handleQuantity(e, product)}
                                  value={product.quantity}
                                >
                                  <option value='1'>1</option>
                                  <option value='2'>2</option>
                                  <option value='3'>3</option>
                                  <option value='4'>4</option>
                                </select>
                              </div>

                              <div className='flex'>
                                <button
                                  type='button'
                                  className='font-medium text-indigo-600 hover:text-indigo-500'
                                  onClick={() =>
                                    dispatch(deleteCartItemAsync(product.id))
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Total items in cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className='mt-0.5 text-sm text-gray-500'>
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className='mt-6'>
                    <button
                      onClick={handleOrder}
                      className='flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                    >
                      Order
                    </button>
                  </div>
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                      or{' '}
                      <Link
                        to='/'
                        type='button'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Continue Shopping
                        <span aria-hidden='true'> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
