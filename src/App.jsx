
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PageContent from './layout/PageContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyUser } from './store/actions/clientActions';
import { fetchCategories } from './store/actions/productActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <PageContent />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
}

export default App;