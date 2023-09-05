import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteCartItemAsync, selectCart, updateItemAsync } from './CartSlice';

export default function Cart() {
  const productsCart = useSelector(selectCart);
  const dispatch = useDispatch();

  const totalAmount = productsCart.reduce((amount, item) => {
    return item.quantity * item.price + amount;
  }, 0);
  const totalItems = productsCart.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  function handleQuantity(e, product) {
    const newItem = { ...product, quantity: +e.target.value };
    delete newItem['id'];
    dispatch(updateItemAsync(newItem));
  }

  return (
    <>
      {productsCart.length === 0 && <Navigate to={'/'} replace={true} />}
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
                            <a href={product.thumbnail}>{product.title}</a>
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
              <Link
                to='/checkout'
                className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                Checkout
              </Link>
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
    </>
  );
}
