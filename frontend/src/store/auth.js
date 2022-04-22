import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isloading: false,
  token: '',
  isauth: false,
  checkToken: false,
  user: {},
  type: ""
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (auth, action) => {
      auth.user = action.payload.user;
      auth.type = action.payload.type;
      auth.token = action.payload.token;
      auth.isauth = true;
      localStorage.setItem("token", JSON.stringify(auth.token));
    },
  },
});

export const { loggedIn } = slice.actions;
export default slice.reducer;
