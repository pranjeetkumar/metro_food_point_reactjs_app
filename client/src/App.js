import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Login, Dashboard } from './containers';
import { getAuth } from 'firebase/auth';
import { app } from "./config/firebase.config";
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './context/actions/userActions';
import { getAllCartItems, validateUserJwtToken } from './api';
import { motion } from "framer-motion";
import { fadeInOut} from "./animations";
import { MainLoader, Alert, CheckOutSuccess } from './components';
import { setCartItems } from './context/actions/cartAction';


const App = () => {

  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);


  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(cred => {
      if(cred){
          cred.getIdToken().then(token => {
              validateUserJwtToken(token).then(data => {
                if(data){
                  getAllCartItems(data.user_id).then((items) => {
                    console.log(items);
                    dispatch(setCartItems(items));
                  })
                }
                  dispatch(setUserDetails(data));
              })
          })
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    })
  }, [])


  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div {...fadeInOut} className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
          <MainLoader/>
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element = { <Main/> }/>
        <Route path="/login" element = { <Login/> }/>
        <Route path="/dashboard/*" element = { <Dashboard/> }/>
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message}/>}
    </div>
  );
};

export default App;