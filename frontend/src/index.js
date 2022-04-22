import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./store/configureStore";

store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
