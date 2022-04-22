import React from "react";
import { RingLoader } from "react-spinners";
const LoadingProvider = (props) => {
	return (
		<div>
			{props.active && (
				<div className='loading'>
					<RingLoader color='white' speedMultiplier='1.5' />
				</div>
			)}
			{props.children}
		</div>
	);
};

export default LoadingProvider;
