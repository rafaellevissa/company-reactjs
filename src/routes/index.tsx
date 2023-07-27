import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ListCompaniesPage } from '../pages/Company';
import { LoginPage } from '../pages/Auth'
import { store } from '../store';


const AppRoutes = () => {
  const storage = store.getState();
  const loggedIn = storage.auth.item;

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={
            loggedIn ? <ListCompaniesPage /> : <Navigate replace to="/login" />
          } />
          <Route path="/login" element={
            !loggedIn ? <LoginPage /> : <Navigate replace to="/" />
          } />
      </Routes>
    </BrowserRouter>
  )
};

export default AppRoutes;