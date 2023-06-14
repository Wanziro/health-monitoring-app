import React from 'react';
import {useSelector} from 'react-redux';
import NotLoggedIn from './not-logged-in';
import Toast from 'react-native-toast-message';
import NursesRoutes from './logged-in/nurses-routes';
import PatientUserRoutes from './logged-in/patient-user-routes';
import AdminRoutes from './logged-in/admin-routes';
import {RootState} from '../reducers';
function Navigation() {
  const {token, role} = useSelector((state: RootState) => state.user);
  return (
    <>
      {token === '' || token === undefined ? (
        <NotLoggedIn />
      ) : role == 'nurse' ? (
        <NursesRoutes />
      ) : role == 'user' ? (
        <PatientUserRoutes />
      ) : (
        <AdminRoutes />
      )}
      <Toast />
    </>
  );
}

export default Navigation;
