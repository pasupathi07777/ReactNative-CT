import { configureStore } from '@reduxjs/toolkit'
import  signupSlice  from '../slices/authSlices/signupSlice'
import loginSlice from '../slices/authSlices/loginSlice';
import verifyEmailSlice from '../slices/authSlices/verifyEmailSlice';
import  otpSlice  from '../slices/authSlices/otpSlice';
import  resetPasswordSlice  from '../slices/authSlices/resetPasswordSlice'; 
import profileSlice from '../slices/profileSlices/profileSlice'; 
import staffSlice from '../slices/profileSlices/staffSlice'; 



export const store = configureStore({
  reducer: {
    signupReducer: signupSlice,
    loginReducer: loginSlice,
    verifyEmailReducer: verifyEmailSlice,
    otpReducer: otpSlice,
    resetPasswordReducer: resetPasswordSlice,
    profileReducer:profileSlice,
    // student teacher crud 
    staffReducer:staffSlice


  },
});