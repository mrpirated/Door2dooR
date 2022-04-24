import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isloading: false,
	token: "",
	isauth: false,
	checkToken: false,
	user: {},
	type: "",
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			auth.type = action.payload.type;
			auth.token = action.payload.token;
			auth.isauth = true;
			localStorage.setItem("token", JSON.stringify(auth.token));
		},
		loggedWithToken: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.isauth = true;
			auth.type = action.payload.type;
			auth.checkToken = true;
		},
		tokenChecked: (auth, action) => {
			auth.checkToken = true;
		},
		setLoading: (auth, action) => {
			auth.isloading = action.payload.loading;
		},
	},
});

export const { loggedIn, setLoading, loggedWithToken, tokenChecked } =
	slice.actions;
export default slice.reducer;
