import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user) navigate('/login');
    },
    [user, navigate]
  );

  return user ? children : null;
}
