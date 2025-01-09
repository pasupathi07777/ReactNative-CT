import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/axios';
import {getToken} from '../../utils/tokenFunction';
import {updateCurrentUser} from '../authSlices/loginSlice';
import {Alert} from 'react-native';
import {validateFields} from '../../utils/validationFunction';

export const updateProfilePhoto = createAsyncThunk(
  'update/profilePhoto',
  async (profilePic, {rejectWithValue, dispatch}) => {
    try {
      const response = await axiosInstance.put(`/profile/update-photo`, {
        profilePic,
        token: await getToken(),
      });
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const updateProfileDetails = createAsyncThunk(
  'update/profileDetails',
  async (data, {rejectWithValue, dispatch}) => {
    try {
      const error = validateFields(data);
      if (error) {
        return rejectWithValue({error});
      }
      const response = await axiosInstance.put(`/profile/update-details`, {
        data,
        token: await getToken(),
      });
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    updateProfileLoading: false,
    updateProfileDetailsLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(updateProfilePhoto.pending, state => {
        state.updateProfileLoading = true;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        console.log(action.payload);
      })
      .addCase(updateProfilePhoto.rejected, (state, action) => {
        state.updateProfileLoading = false;
        console.log(action.payload);
      })

      .addCase(updateProfileDetails.pending, state => {
        state.updateProfileDetailsLoading = true;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.updateProfileDetailsLoading = false;
        Alert.alert('', 'Profile Updated Successfully.');

      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.updateProfileDetailsLoading = false;
        console.log(action.payload);
        Alert.alert('', action.payload.error.message);
      });
  },
});

export const {} = profileSlice.actions;
export const profileState = state => state.profileReducer;
export default profileSlice.reducer;
