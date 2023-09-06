import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';

export default function UserProfile() {
  const user = useSelector(selectLoggedInUser);

  function hnadleEdit() {}
  function hnadleRemove() {}

  console.log(user.address);
  return (
    <div>
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='border-b border-gray-200 pb-4 pt-24'>
          <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
            name: {user.name || 'new user'}
          </h3>
          <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
            email: {user.email}
          </h3>

          <div>
            <p>Addresses</p>
            {user.address.map((add, index) => (
              <div
                className='flex justify-between gap-x-6 p-5 border-2 my-2'
                key={index}
              >
                <div className='flex min-w-0 gap-x-4 items-center'>
                  <div className='min-w-0 flex-auto'>
                    <p className='text-sm font-semibold leading-6 text-gray-900'>
                      {add.name}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {add.street}
                    </p>
                    <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                      {add.pinCode}
                    </p>
                  </div>
                </div>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <p className='text-sm leading-6 text-gray-500'>
                    Phone: {add.phone}
                  </p>
                  <p className='text-sm leading-6 text-gray-500'>{add.city}</p>
                </div>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <button
                    type='button'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                    onClick={() => hnadleEdit()}
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                    onClick={() => hnadleRemove()}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
