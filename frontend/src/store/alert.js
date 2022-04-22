import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
	message: "",
	variant: "",
};
const slice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		alertAdded: (alert, action) => {
			alert.show = true;
			alert.message = action.payload.message;
			alert.variant = action.payload.variant;
		},
		alertRemoved: (alert, action) => {
			alert.show = false;
		},
	},
});
export const { alertAdded, alertRemoved } = slice.actions;
export default slice.reducer;
