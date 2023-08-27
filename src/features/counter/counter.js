import { useSelector, useDispatch } from 'react-redux';
import {} from './counterSlice';

export default function Counter() {
  const count = useSelector();
  const dispatch = useDispatch();

  return <div></div>;
}
