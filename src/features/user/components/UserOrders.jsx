import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';

export default function UserOrders() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [user]);

  console.log(userOrders);
  return (
    <>
      {userOrders.map((order) => (
        <div key={order.id}>
          <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
            <div className='border-b border-gray-200 pb-4 pt-24'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                Order #{order.id}
              </h1>
              <div className='mt-8'>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {order.items.map((item) => (
                      <li key={item.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <a href={item.thumbnail}>{item.title}</a>
                              </h3>
                              <p className='ml-4'>${item.price}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {item.brand}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm mb-2'>
                            <div className='flex items-center justify-between'>
                              <label htmlFor='qty' className='mr-5'>
                                Qty: {item.quantity}
                              </label>
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
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <p>Total items in Order</p>
                  <p>{order.totalItems} items</p>
                </div>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <p>Order status</p>
                  <p>{order.status}</p>
                </div>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <p>Payment method</p>
                  <p>{order.paymentMethod}</p>
                </div>
              </div>

              <div className='flex justify-between gap-x-6 p-5 border-2'>
                <div className='flex min-w-0 gap-x-4 items-center'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      {order.address.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {order.address.street}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {order.address.pinCode}
                    </p>
                  </div>
                </div>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <p className='text-sm leading-6 text-gray-500'>
                    Phone: {order.address.phone}
                  </p>
                  <p className='text-sm leading-6 text-gray-500'>
                    {order.address.city}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      ))}
    </>
  );
}
